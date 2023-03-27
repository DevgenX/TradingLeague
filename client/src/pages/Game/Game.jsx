import { Col, Row, Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

import { GameDiv, ChartDiv, ContainerDiv } from "./game.styles";

import GameButtons from "../../components/Widgets/GameButtons";
import Positions from "../../components/Widgets/Positions";
import TopNav from "../../components/TopNav/TopNav";

import Datafeed from "../../datafeed/datafeed";
import { _lastbar, nextDay } from "../../datafeed/stream";
import { next_feed, c_name } from "../../datafeed/historyProvider";
import { widget } from "../../charting_library";
import { useAppContext } from "../../context/appContext";
import GameResultModal from "./Modals/GameResultModal";
import { getCrypto } from "../../services/crypto";

export let rand_om = Math.floor(Math.random() * 268);
export let crypto_name = null;

let tvWidget;
export let token_name = null;

const Game = ({ mode, challenge }) => {
  const {
    user,
    showGameResult,
    toChallenge,
    newHistory,
    newChallenge,
    handleGameResultModal,
  } = useAppContext();
  const [currentBar, setCurrentBar] = useState(null);
  const [counter, setCounter] = useState(0);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [withPosition, setWithPosition] = useState({
    status: false,
    desc: null,
  });
  const [position, setPosition] = useState(null);
  const [leverage, setLeverage] = useState(1);
  const [positionSize, setPositionSize] = useState(1000);
  const [totalProfit, setTotalProfit] = useState(0);
  const [positionDays, setPositionDays] = useState(0);
  const [winRate, setWinRate] = useState(0);

  const ref = useRef();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  useEffect(() => {
    rand_om = Math.floor(Math.random() * 268);
    crypto_name = getCrypto(rand_om);
  }, []);

  useEffect(() => {
    const getLanguageFromURL = () => {
      const regex = new RegExp("[\\?&]lang=([^&#]*)");
      const results = regex.exec(window.location.search);
      return results === null
        ? null
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    const widgetOptions = {
      symbol: mode === "practice" ? "BTC" : "TradingLeague",
      datafeed: Datafeed,
      interval: "240",
      container: "tv",
      timeframe: "15D",
      library_path: "/charting_library/",
      locale: getLanguageFromURL() || "en",
      clientId: "test",
      userId: "public_user_id",
      fullscreen: false,
      autosize: true,
      theme: "Dark",
      timezone: "Asia/Singapore",
      custom_css_url: "chart.css",
      enabled_features: ["fix_left_edge"],
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "symbol_search_hot_key",
        "header_compare",
        "header_undo_redo",
        "header_screenshot",
        "header_resolutions",
        "go_to_date",
        "timezone_menu",
        "symbol_info",
        "adaptive_logo",
        "context_menus",
        "main_series_scale_menu",
        "display_market_status",
        "border_around_the_chart",
        "timeframes_toolbar",
        "source_selection_markers",
        "scales_date_format",
      ],
      // custom_css_url: "../../assets/style.css",
      overrides: {},
    };

    tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      setCurrentBar({ ..._lastbar });

      const iframe = document.querySelector(`[id^="tradingview_"]`);

      const elmnt = iframe.contentWindow.document.getElementsByClassName(
        "chart-markup-table time-axis"
      )[0];
      elmnt.style.display = "none";
    });
  }, [mode]);

  const handleClosePosition = () => {
    if (position.profit && position.gain_loss) {
      tvWidget.activeChart().createShape(
        { time: _lastbar.time / 1000, price: _lastbar.close },
        {
          shape: "icon",
          icon: "0xf00d",
          lock: true,
          disableSelection: true,
          disableSave: true,
          disableUndo: true,
          zOrder: "bottom",
          text: "Close",
          overrides: {
            text: "Close",
            color: "#787878",
            size: 32,
            scale: 1,
          },
        }
      );

      // push data to trading history
      const history = {
        entry: position.close,
        end: currentBar.close,
        days: positionDays,
        gain_loss: position.gain_loss,
        profit: position.profit,
      };

      let temp_hist = [history, ...tradeHistory];

      const up_profit = temp_hist.reduce(
        (prev, current) => prev + +current.profit,
        0
      );

      if (1000 + up_profit < 0) handleEndGame();

      setTotalProfit(up_profit.toFixed(2));
      setPositionSize(1000 + up_profit);
      setTradeHistory([history, ...tradeHistory]);
      setWithPosition({ status: false, desc: null });
      setPosition(null);
      setPositionDays(0);

      setLeverage(1);

      temp_hist = [];
    }
  };

  const handleEndGame = async () => {
    let total_gain;
    let final_profit;

    if (withPosition.status) {
      // push data to trading history if with current position

      const history = {
        entry: position.close,
        end: currentBar.close,
        days: positionDays,
        gain_loss: position.gain_loss,
        profit: position.profit,
      };

      let temp_hist = [history, ...tradeHistory];

      const up_profit = temp_hist.reduce(
        (prev, current) => prev + +current.profit,
        0
      );

      final_profit = up_profit;

      setPositionSize(1000 + up_profit);
      setTradeHistory((prev) => [history, ...prev]);
      setWithPosition({ status: false, desc: null });
      setPosition(null);
      setPositionDays(0);

      // WIN RATE
      let win = [];

      temp_hist?.map((h) => (h.gain_loss > 0 ? win.push(h.gain_loss) : null));

      const win_rate = (win.length / temp_hist.length) * 100;

      if (temp_hist.length > 0) setWinRate(win_rate);

      total_gain = temp_hist
        .reduce((prev, current) => prev + +current.gain_loss, 0)
        .toFixed(2);

      temp_hist = [];
    } else {
      total_gain = tradeHistory
        .reduce((prev, current) => prev + +current.gain_loss, 0)
        .toFixed(2);

      const up_profit = tradeHistory.reduce(
        (prev, current) => prev + +current.profit,
        0
      );

      final_profit = up_profit;

      setPositionSize(1000 + up_profit);
      setPosition(null);
      setPositionDays(0);
    }
    handleGameResultModal();
    try {
      if (mode === "rank") {
        // rank
        const rank_history = {
          profit: final_profit.toFixed(2),
          gain_loss: total_gain,
          game_mode: mode,
          owner: user?._id,
          status: "done",
        };

        let new_mmr;

        const up_profit = tradeHistory.reduce(
          (prev, current) => prev + +current.profit,
          0
        );

        if (up_profit < 0) new_mmr = -15;
        else if (up_profit > 0 && up_profit < 100) new_mmr = 10;
        else if (up_profit >= 100 && up_profit < 200) new_mmr = 15;
        else if (up_profit >= 200) new_mmr = 25;
        else if (up_profit === 0) new_mmr = 0;

        // const leaderboard_up = leaderboard.map((l) =>
        //   l?._id == user?._id
        //     ? {
        //         ...l,
        //         mmr: l.mmr + new_mmr,
        //       }
        //     : l
        // );

        // setUser({ ...user, mmr: user.mmr + new_mmr });
        // setLeaderboard(leaderboard_up);

        // Save history to db
        // newHistory(rank_history);

        // Update user's MMR
      } else if (mode === "casual" && !challenge) {
        // casual - new challenge
        const new_casual_history = {
          user_2: toChallenge,
          gain_loss: total_gain,
          profit: final_profit.toFixed(2),
          game_mode: mode,
          owner: user._id,
          status: "pending",
        };

        // SAVE GAME HISTORY
        newHistory(new_casual_history);

        // SAVE CHALLENGE
        newChallenge({
          challenger: user._id,
          // duration: gameDuration,
          to_challenge: toChallenge._id,
          game_mode: mode,
          // game_id: data._id,
          gain_loss: total_gain,
          profit: final_profit.toFixed(2),
        });

        // await saveChallenge(
        //   {
        //     challenger: user._id,
        //     duration: gameDuration,
        //     to_challenge: toChallenge._id,
        //     game_mode: mode,
        //     game_id: data._id,
        //     gain_loss: total_gain,
        //     profit: final_profit.toFixed(2),
        //   },
        //   cookies.sessID
        // );
      } else if (mode === "casual" && challenge) {
        // casual - accept challenge
        // const accept_casual_history = {
        //   user_2: toChallenge,
        //   gain_loss: total_gain,
        //   profit: final_profit.toFixed(2),
        //   game_mode: mode,
        //   owner: user._id,
        //   status: "done",
        // };
        // await updateAcceptedHistory(
        //   {
        //     _id: currentGame.game_id,
        //     status: "done",
        //     user_2: {
        //       _id: user._id,
        //       username: user.username,
        //       name: user?.name,
        //       mmr: user.mmr,
        //       profit: final_profit.toFixed(2),
        //       profilepic: user?.profilepic?.key,
        //       gain_loss: total_gain,
        //     },
        //   },
        //   cookies.sessID
        // );
        // await saveHistory(accept_casual_history, cookies.sessID);
        // await removeChallenge(currentGame._id, cookies.sessID);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const showNextDay = () => {
    if (mode === "practice") {
      if (counter < 100) {
        nextDay(next_feed[counter]);
        setCounter((prev) => prev + 1);
        setCurrentBar(next_feed[counter]);
        if (withPosition.status) {
          if (withPosition.desc === "long") {
            const long_gain_loss =
              (_lastbar.close - position.close) / position.close;
            const profit = positionSize * long_gain_loss * leverage;
            setPosition({
              ...position,
              gain_loss: parseFloat(long_gain_loss).toFixed(2),
              profit: profit.toFixed(2),
            });
          } else if (withPosition.desc === "short") {
            const short_gain_loss =
              ((_lastbar.close - position.close) / position.close) * -1;
            const profit = positionSize * short_gain_loss * leverage;
            setPosition({
              ...position,
              gain_loss: parseFloat(short_gain_loss).toFixed(2),
              profit: profit.toFixed(2),
            });
          }
          setPositionDays((prev) => prev + 1);
        }
      } else {
        handleEndGame();
      }
    } else if (mode === "pvp") {
      nextDay(next_feed[counter]);
      setCounter((prev) => prev + 1);
      setCurrentBar(next_feed[counter]);
      if (withPosition.status) {
        if (withPosition.desc === "long") {
          const long_gain_loss =
            (_lastbar.close - position.close) / position.close;
          const profit = positionSize * long_gain_loss * leverage;
          setPosition({
            ...position,
            gain_loss: parseFloat(long_gain_loss).toFixed(2),
            profit: profit.toFixed(2),
          });
        } else if (withPosition.desc === "short") {
          const short_gain_loss =
            ((_lastbar.close - position.close) / position.close) * -1;
          const profit = positionSize * short_gain_loss * leverage;
          setPosition({
            ...position,
            gain_loss: parseFloat(short_gain_loss).toFixed(2),
            profit: profit.toFixed(2),
          });
        }
        setPositionDays((prev) => prev + 1);
      }
    } else if (mode === "rank") {
      nextDay(next_feed[counter]);
      setCounter((prev) => prev + 1);
      setCurrentBar(next_feed[counter]);
      if (withPosition.status) {
        if (withPosition.desc === "long") {
          const long_gain_loss =
            (_lastbar.close - position.close) / position.close;
          const profit = positionSize * long_gain_loss * leverage;
          setPosition({
            ...position,
            gain_loss: parseFloat(long_gain_loss).toFixed(2),
            profit: profit.toFixed(2),
          });
        } else if (withPosition.desc === "short") {
          const short_gain_loss =
            ((_lastbar.close - position.close) / position.close) * -1;
          const profit = positionSize * short_gain_loss * leverage;
          setPosition({
            ...position,
            gain_loss: parseFloat(short_gain_loss).toFixed(2),
            profit: profit.toFixed(2),
          });
        }
        setPositionDays((prev) => prev + 1);
      }
    }
  };

  const handleLongPosition = () => {
    tvWidget.activeChart().createShape(
      { time: _lastbar.time / 1000, price: _lastbar.low },
      {
        shape: "arrow_up",
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        zOrder: "top",
        overrides: {
          text: "Long",
          fontsize: 14,
          font: "Arial",
        },
      }
    );
    setPosition({ ...currentBar });
    setWithPosition({ status: true, desc: "long" });
  };

  const handleShortPosition = () => {
    tvWidget.activeChart().createShape(
      { time: _lastbar.time / 1000, price: _lastbar.high },
      {
        shape: "arrow_down",
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        zOrder: "top",
        overrides: {
          text: "Short",
          fontsize: 14,
          font: "Arial",
        },
      }
    );

    setPosition({ ...currentBar });
    setWithPosition({ status: true, desc: "short" });
  };

  return (
    <GameDiv>
      <TopNav />
      <GameResultModal
        c_name={crypto_name}
        game_mode={mode}
        tradeHistory={tradeHistory}
        // gameDuration={gameDuration}
        counter={counter}
        setCounter={setCounter}
        setTradeHistory={setTradeHistory}
        // winRate={winRate}
        // setWinRate={setWinRate}
        // currentPlay={currentPlay}
        positionSize={positionSize}
        setPositionSize={setPositionSize}
      />
      <Container>
        <ContainerDiv>
          <Row>
            <Col>
              <ChartDiv id="tv" ref={ref}></ChartDiv>
            </Col>
          </Row>
          <Row>
            <Col>
              <GameButtons
                mode={mode}
                position={position}
                withPosition={withPosition}
                totalProfit={totalProfit}
                currentBar={currentBar}
                positionSize={positionSize}
                positionDays={positionDays}
                showNextDay={showNextDay}
                handleLongPosition={handleLongPosition}
                handleShortPosition={handleShortPosition}
                handleClosePosition={handleClosePosition}
                handleEndGame={handleEndGame}
              />
            </Col>
            <Col>
              <Positions tradeHistory={tradeHistory} />
            </Col>
          </Row>
        </ContainerDiv>
      </Container>
    </GameDiv>
  );
};

export default Game;
