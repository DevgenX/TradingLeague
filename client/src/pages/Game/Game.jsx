import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import { widget } from "../../charting_library";
import GameButtons from "../../components/Widgets/GameButtons";
import ChartWidget from "../../components/Widgets/ChartWidget";
import Positions from "../../components/Widgets/Positions";
import TopNav from "../../components/TopNav/TopNav";

const Game = ({ mode, Challenge }) => {
  let tvWidget;

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
      // debug: true,
      symbol: mode === "practice" ? "BTC" : "TradingLeague",
      datafeed: "AAPL",
      interval: "240",
      container: "tv",
      timeframe: "1M",
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
      // custom_css_url: "/src/assets/style.css",
      overrides: {},
    };

    tvWidget = new widget(widgetOptions);

    // tvWidget.onChartReady(() => {
    //   // setCurrentBar({ ..._lastbar });
    //   console.log("ready");
    //   const iframe = document.querySelector(`[id^="tradingview_"]`);

    //   const elmnt = iframe.contentWindow.document.getElementsByClassName(
    //     "chart-markup-table time-axis"
    //   )[0];
    //   elmnt.style.display = "none";
    // });
  }, []);
  return (
    <GameDiv>
      <TopNav />
      <Container>
        <ContainerDiv>
          <Row>
            <Col>
              {/* <ChartWidget /> */}
              <div className="game-body" id="tv" ref={ref}></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <GameButtons />
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

const ContainerDiv = styled.div`
  margin-bottom: 5rem;
`;

export default Game;
