import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import { FacebookShareButton, TwitterShareButton } from "react-share";
import { useAppContext } from "../../../context/appContext";
import UserImage from "./../../../components/common/UserImage";

const GameResultModal = ({
  c_name,
  game_mode,
  tradeHistory,
  gameDuration,
  counter,
  setCounter,
  setTradeHistory,
  winRate,
  setWinRate,
  currentPlay,
  positionSize,
  setPositionSize,
}) => {
  const { user, showGameResult, handleGameResultModal } = useAppContext();

  let total_gain;

  if (tradeHistory.length > 0) {
    total_gain = tradeHistory
      .reduce((prev, current) => prev + +current.gain_loss, 0)
      .toFixed(2);
  }

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    handleGameResultModal();
  };

  // const handleClose = () => {
  //   setGameDuration(60);
  //   setCounter(0);
  //   setTradeHistory([]);
  //   setWinRate(0);
  //   setPositionSize(1000);
  //   setShow(false);

  //   if (game_mode === "tournament")
  //     navigate(`/gamelobby/tournament/${currentPlay._id}`);
  //   else navigate("/gamelobby");
  // };

  return (
    <Modal
      show={showGameResult}
      onHide={handleGameResultModal}
      centered
      backdrop="static"
      dialogClassName="modal-40w"
      className={`game-result-modal ${game_mode}`}
    >
      <Modal.Header>
        <div className="modal-head-img">
          <img
            src={`/assets/img/game_modes/${
              game_mode === "practice"
                ? "practice"
                : game_mode === "casual"
                ? "casual"
                : game_mode === "rank"
                ? "rank"
                : "tournament"
            }.png`}
            alt=""
          />
        </div>

        <Modal.Title>
          {game_mode === "practice"
            ? "Battle Test"
            : game_mode === "casual"
            ? "Battle Arena"
            : game_mode === "rank"
            ? "Trading Floor"
            : "tournament"}
        </Modal.Title>
        {/* 
        <div className="btn-close" aria-label="Close" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </div> */}
      </Modal.Header>

      <Modal.Body>
        {game_mode === "rank" && (
          <div className="mmr-info mb-4">
            <h2 className="mmr m-0">
              {positionSize < 1000
                ? "-15"
                : positionSize > 1000 && positionSize < 1100
                ? "+10"
                : positionSize >= 1100 && positionSize < 1200
                ? "+15"
                : positionSize >= 1200
                ? "+25"
                : "0"}
            </h2>
            <h6 className="new-mmr">MMR: {user?.mmr}</h6>
          </div>
        )}

        <div className="box game-result">
          <div className="gains">
            <div className="user-info">
              <UserImage
                name="modal-img"
                user={user}
                pic={user?.profilepic?.key}
              />

              <div className="user-name-info">
                <p
                  className={`user-name m-0 ${
                    user?.name?.includes(".") ? "ens" : ""
                  }`}
                >
                  {user?.name || "Unnamed"}
                </p>
                <p className="username m-0 text-left">
                  {user && `@${user?.username}`}
                </p>
              </div>
            </div>

            <div className="gain-info">
              <p
                className={`percent-gain m-0 ${
                  positionSize > 1000
                    ? "plus"
                    : positionSize < 1000
                    ? "minus"
                    : ""
                }`}
              >
                ${(positionSize - 1000).toFixed(2)}
              </p>
              <p className="m-0">Total Profit</p>
            </div>
          </div>
        </div>

        <div className="box game-result">
          <div className="summary">
            <Row>
              <Col xs="6" md="3">
                <p className="title m-0">Crypto</p>
                <p className="value m-0">{c_name}</p>
              </Col>
              <Col xs="6" md="3">
                <p className="title m-0">Candles</p>
                <p className="value m-0">
                  {counter}
                  {/* {game_mode === "practice" || game_mode === "tournament"
                    ? counter
                    : `${counter}${
                        game_mode !== "rank" ? `/${gameDuration}` : ""
                      } `} */}
                </p>
              </Col>
              <Col xs="6" md="3">
                <p className="title m-0">Trades</p>
                <p className="value m-0">{tradeHistory?.length}</p>
              </Col>
              <Col xs="6" md="3">
                <p className="title m-0">Position Size</p>
                <p
                  className={`value m-0 ${
                    positionSize - 1000 > 0
                      ? "plus"
                      : positionSize - 1000 < 0
                      ? "minus"
                      : ""
                  }`}
                >
                  ${positionSize.toFixed(2)}
                </p>
              </Col>
            </Row>
          </div>
        </div>

        <div className="box game-result">
          <div className="trade-history">
            <Row className="gx-0">
              <Col xs="3">
                <p className="title m-0">Entry Price</p>
              </Col>
              <Col xs="3">
                <p className="title m-0">Exit</p>
              </Col>
              <Col xs="3">
                <p className="title m-0">Candles</p>
              </Col>
              <Col xs="3">
                <p className="title m-0">Profit</p>
              </Col>
            </Row>

            <div className="history-list">
              {tradeHistory?.length > 0 ? (
                tradeHistory?.map((h) => (
                  <Row key={h.entry + h.end} className="history-item gx-0">
                    <Col xs="3">
                      {" "}
                      <p className="history-data">{h.entry}</p>
                    </Col>
                    <Col xs="3">
                      <p className="history-data">{h.end}</p>
                    </Col>
                    <Col xs="3">
                      <p className="history-data">{h.days}</p>
                    </Col>
                    <Col xs="3">
                      <p
                        className={`history-data m-0 ${
                          h.profit < 0 ? "minus" : h.profit > 0 ? "plus" : ""
                        }`}
                      >
                        ${h.profit || 0}
                      </p>
                    </Col>
                  </Row>
                ))
              ) : (
                <Row className="history-item gx-0">
                  <Col xs="3">
                    <p className="history-data">-</p>
                  </Col>
                  <Col xs="3">
                    <p className="history-data">-</p>
                  </Col>
                  <Col xs="3">
                    <p className="history-data">-</p>
                  </Col>
                  <Col xs="3">
                    <p className={`history-data m-0`}>-</p>
                  </Col>
                </Row>
              )}
            </div>
          </div>
        </div>

        {/* {game_mode === "casual" ||
          (game_mode === "rank" && (
            <p className="my-4">
              What a close game. <strong>Share your results!</strong>{" "}
            </p>
          ))} */}

        <div className="btn-container">
          <Row className="gx-2">
            <Col>
              <Button className="sub-btn w-100" onClick={handleClose}>
                Back to Lobby
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GameResultModal;
