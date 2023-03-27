import { Col, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import Timer from "../Timer/Timer";
import Leverage from "../Leverage/Leverage";

const GameButtons = ({
  mode,
  position,
  withPosition,
  currentBar,
  positionDays,
  positionSize,
  totalProfit,
  showNextDay,
  time,
  handleLongPosition,
  handleShortPosition,
  handleClosePosition,
  handleEndGame,
  leverage,
  setLeverage,
}) => {
  return (
    <GameDiv>
      <Row>
        <Col>
          <HeaderDiv>
            <div className="header-title">
              <div
                className={`img-container ${
                  mode === "practice"
                    ? "practice"
                    : mode === "casual"
                    ? "casual"
                    : mode === "rank"
                    ? "rank"
                    : "tournament"
                }`}
              >
                <img
                  src={require(`../../assets/game_modes/${
                    mode === "practice"
                      ? "practice"
                      : mode === "casual"
                      ? "casual"
                      : mode === "rank"
                      ? "rank"
                      : "tournament"
                  }.png`)}
                  alt=""
                  className="icon"
                />
              </div>

              <p className="game-mode m-0 ms-2">
                {mode === "practice"
                  ? "Battle Test"
                  : mode === "casual"
                  ? "Battle Arena"
                  : mode === "rank"
                  ? "Trading Floor"
                  : "Tournament"}
              </p>
            </div>

            {/* <span className="end-game-btn" onClick={handleEndGame}>
              Quit Game
            </span> */}

            {mode === "practice" && (
              <span className="end-game-btn" onClick={handleEndGame}>
                Quit Game
              </span>
            )}

            {mode !== "practice" && (
              <Timer
                expiryTimestamp={time.setSeconds(time.getSeconds() + 20)}
                handleEndGame={handleEndGame}
              />
            )}
          </HeaderDiv>
        </Col>
      </Row>

      <BodyDiv>
        <Row>
          <Col>
            <div className="position-container">
              <p className="m-0">
                Position Size:
                <span className="amount">${positionSize.toFixed(2)}</span>
              </p>
            </div>
          </Col>
          <Col>
            <div className="options-container">
              <Leverage
                leverage={leverage}
                setLeverage={setLeverage}
                withPosition={withPosition}
              />
            </div>
          </Col>
          <Col>
            <p>
              Total PnL: <span>{`$${totalProfit}`}</span>
            </p>
          </Col>
        </Row>
      </BodyDiv>
      <GameBody>
        <Row className="align-items-center">
          <Col xs="6" lg="3">
            <div className="categ">
              <p className="body-title  mb-1">Entry Price</p>
              <p className="value m-0">{position?.close || "-"}</p>
            </div>
          </Col>
          <Col xs="6" lg="3">
            <div className="categ">
              <p className="body-title  mb-1">Mark Price</p>
              <p className="value m-0 plus">{currentBar?.close || "-"}</p>
            </div>
          </Col>
          <Col xs="6" lg="3">
            <div className="categ">
              <p className="body-title  mb-1">Candles</p>
              <p className="value m-0">{positionDays || "-"}</p>
            </div>
          </Col>
          <Col xs="6" lg="3">
            <div className="categ">
              <p className="body-title  mb-1">Profit</p>
              <p
                className={`value m-0 ${
                  position?.profit < 0
                    ? "minus"
                    : position?.profit > 0
                    ? "plus"
                    : ""
                }`}
              >
                ${position?.profit || 0}
              </p>
            </div>
          </Col>
        </Row>
      </GameBody>

      <ButtonContainer>
        <Row className="gx-2">
          <Col xs="6">
            <Button
              className="game-btn long w-100 mb-2"
              onClick={handleLongPosition}
              disabled={withPosition.status}
            >
              Long
            </Button>
          </Col>
          <Col xs="6">
            <Button
              className="game-btn short w-100 mb-2"
              onClick={handleShortPosition}
              disabled={withPosition.status}
            >
              Short
            </Button>
          </Col>
        </Row>
        <Row className="gx-2">
          <Col xs="6">
            <Button
              className="game-btn close-btn w-100 mb-2"
              onClick={handleClosePosition}
              disabled={
                !withPosition.status || position?.close === currentBar?.close
                  ? true
                  : false
              }
            >
              Close Position
            </Button>
          </Col>
          <Col xs="6">
            <Button
              className="game-btn next-day w-100 mb-2"
              onClick={showNextDay}
            >
              Next Candle
            </Button>
          </Col>
        </Row>
      </ButtonContainer>
    </GameDiv>
  );
};

const GameDiv = styled.div`
  background: radial-gradient(circle, #2a41c5 0%, #0d1b33 100%);
  transition: 0.4s ease;
  background-size: 300%;
  border-radius: 12px;
  padding: 2rem;
  color: #fff;
`;

const GameBody = styled.div`
  margin: 2rem 0;
  padding: 16px 8px;
  background: linear-gradient(
    180deg,
    rgba(2, 163, 254, 0.1) 0%,
    rgba(125, 64, 255, 0.1) 100%
  );
  border-radius: 14px;
  .categ {
    text-align: center;
    .body-title {
      color: #6a6ba0;
      font-size: 14px;
    }
    .value {
      .gain-loss-icon {
        margin-right: 4px;
        width: 32px;
      }
      &.plus {
        color: #5eff5b;
      }
      &.minus {
        color: #ff2d2e;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  .game-btn {
    padding: 8px;
    font-weight: 700;
    border: none;
    &.long {
      color: #1d385a;
      background: linear-gradient(180deg, #5eff5b 0%, #30cf2d 100%);
    }
    &.short {
      background: linear-gradient(180deg, #ff2d2e 0%, #8f0001 100%);
    }
    &.close-btn {
      background: linear-gradient(180deg, #991bf9 0%, #6400b0 100%);
    }
    &.next-day {
      background: linear-gradient(180deg, #02a3fe 0%, #7d40ff 100%);
    }
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: 70px;
  background: $bg-color;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  .header-title {
    display: flex;
    align-items: center;
    .img-container {
      padding: 4px;
      border-radius: 12px;
      &.practice {
        background: linear-gradient(180deg, #991bf9 0%, #6400b0 100%);
      }
      &.rank {
        background: linear-gradient(180deg, #ff2d2e 0%, #8f0001 100%);
      }
      &.casual {
        background: linear-gradient(180deg, #56ccf2 0%, #0081ab 100%);
      }
      &.tournament {
        background: linear-gradient(180deg, #ffa640 0%, #ea7d00 100%);
      }
      .icon {
        width: 30px;
      }
    }
    .game-mode {
      font-weight: 700;
      text-transform: capitalize;
    }
  }
  .end-game-btn {
    color: #6a6ba0;
    cursor: pointer;
    text-decoration: underline;
    transition: 0.35s;
    /* @include on-event() {
      color: #fff;
    } */
  }
`;

const BodyDiv = styled.div`
  .position-container {
    font-size: 0.875em;
    color: #6a6ba0;
    .amount {
      color: #fff;
      font-weight: 600;
    }
  }
  .options-container {
    display: flex;
    align-items: center;
    @include respond-to("screen-xs") {
      flex-direction: column;
    }
    @include respond-to("screen-sm") {
      flex-direction: column;
    }
    @include respond-to("screen-md") {
      flex-direction: column;
    }
  }
  .leverage-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.stoploss {
      margin-left: 8px;
      /* @include respond-to("screen-xs") {
        margin-left: 0;
        margin-top: 8px;
      }
      @include respond-to("screen-sm") {
        margin-left: 0;
        margin-top: 8px;
      }
      @include respond-to("screen-md") {
        margin-left: 0;
        margin-top: 8px;
      } */
    }
    small {
      color: #6a6ba0;
    }
    select {
      padding: 8px;
      // margin-left: auto;
      width: 100px;
      background: #161c29;
      border-color: #161c29;
      color: #fff;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
      &:disabled {
        cursor: not-allowed;
      }
      &::after {
        display: none;
      }
      &:focus {
        box-shadow: none;
      }
      /* option {
        @include on-event() {
          background-color: #161c29 !important;
        }
      } */
    }
  }
`;

export default GameButtons;
