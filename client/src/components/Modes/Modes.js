import { Container, Row, Col, Image } from "react-bootstrap";

import PvP from "../../assets/game_modes/casual.png";
import Practice from "../../assets/game_modes/practice.png";
import Ranked from "../../assets/game_modes/rank.png";
import "./modes.scss";
import Leaderboard from "../Leaderboards/Leaderboards";

const Modes = () => {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <Container className="modes-container">
            <Row className="d-flex text-center align-items-center justify-content-center">
              <Col md={4}>
                <div className="header">
                  <h3>Game Modes</h3>
                  <small>Select mode to play</small>
                </div>
              </Col>
            </Row>
            <Row className="d-flex text-center align-items-center justify-content-center">
              <Col md={3} sm={6}>
                <div className="box1">
                  <Image src={Practice} alt="Practice mode" fluid />
                  <h4>Practice</h4>
                </div>
              </Col>
              <Col md={3} sm={6}>
                <div className="box2">
                  <Image src={PvP} alt="PvP mode" fluid />
                  <h4>PvP</h4>
                </div>
              </Col>
              <Col md={3} sm={6}>
                <div className="box3">
                  <Image src={Ranked} alt="Ranked mode" fluid />
                  <h4>Ranked</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={6}>
          <Leaderboard />
        </Col>
      </Row>
    </Container>
  );
};

export default Modes;
