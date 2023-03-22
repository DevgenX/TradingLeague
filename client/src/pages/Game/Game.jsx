import { Col, Row, Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import GameButtons from "../../components/Widgets/GameButtons";
import Positions from "../../components/Widgets/Positions";
import TopNav from "../../components/TopNav/TopNav";

import Datafeed from "../../datafeed/datafeed";
import { _lastbar, nextDay } from "../../datafeed/stream";
import { next_feed, c_name } from "../../datafeed/historyProvider";
import { widget } from "../../charting_library";

export const rand_om = Math.floor(Math.random() * 268);
export let crypto_name = null;

let tvWidget;
export let token_name = null;

const Game = ({ mode = "practice", Challenge }) => {
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

  const ref = useRef();

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
      custom_css_url: "../../assets/style.css",
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
    console.log("closed");
  };

  const handleEndGame = () => {
    console.log("game ended");
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
    } else if (mode === "casual") {
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
    } else if (mode === "tournament") {
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
  return (
    <GameDiv>
      <TopNav />
      <Container>
        <ContainerDiv>
          <Row>
            <Col>
              <ChartDiv id="tv" ref={ref}></ChartDiv>
            </Col>
          </Row>
          <Row>
            <Col>
              <GameButtons showNextDay={showNextDay} />
            </Col>
            <Col>
              <Positions />
            </Col>
          </Row>
        </ContainerDiv>
      </Container>
    </GameDiv>
  );
};

const GameDiv = styled.div`
  background-color: #101124;
`;

const ChartDiv = styled.div`
  margin: 10px;
  height: 60vh;
  min-height: 60vh;
`;

const ContainerDiv = styled.div`
  margin-bottom: 5rem;
`;

export default Game;
