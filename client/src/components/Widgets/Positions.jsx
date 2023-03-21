import styled from "styled-components";
import { Col, Row } from "react-bootstrap";

const Positions = () => {
  const tradeHistory = [{}];

  return (
    <PositionDiv>
      <div className="game-section history-container">
        <GameHeader>
          <p className="game-mode m-0">Trade History</p>
        </GameHeader>

        <div className="game-body text-center">
          <Row className="gx-0">
            <Col xs="3">
              <p className="head m-0">Entry Price</p>
            </Col>
            <Col xs="3">
              <p className="head m-0">Average Close</p>
            </Col>
            <Col xs="3">
              <p className="head m-0">Candles</p>
            </Col>
            <Col xs="3">
              <p className="head m-0">Profit</p>
            </Col>
          </Row>

          <div className="history-list">
            {tradeHistory.length > 0 ? (
              tradeHistory.map((h) => (
                <Row
                  key={
                    parseInt(h.gain_loss) +
                    parseInt(h.entry) +
                    parseInt(h.profit)
                  }
                  className="history-item gx-0"
                >
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
                    {" "}
                    <p
                      className={`history-data m-0 ${
                        h.profit < 0 ? "minus" : h.profit > 0 ? "plus" : ""
                      }`}
                    >
                      ${h.profit || "-"}
                    </p>
                  </Col>
                </Row>
              ))
            ) : (
              <Row className="history-item gx-0">
                <Col xs="3">
                  {" "}
                  <p className="history-data">-</p>
                </Col>
                <Col xs="3">
                  <p className="history-data">-</p>
                </Col>
                <Col xs="3">
                  <p className="history-data">-</p>
                </Col>
                <Col xs="3">
                  {" "}
                  <p className={`history-data m-0`}>-</p>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </div>
    </PositionDiv>
  );
};

const PositionDiv = styled.div`
  background: radial-gradient(circle, #2a41c5 0%, #0d1b33 100%);
  transition: 0.4s ease;
  background-size: 300%;
  border-radius: 12px;
  padding: 2rem;
  color: #fff;
  height: 100%;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  height: 70px;
  background: $bg-color;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

export default Positions;
