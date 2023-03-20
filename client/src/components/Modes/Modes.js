import { Row, Col, Image } from "react-bootstrap";

import PvP from "../../assets/game_modes/casual.png";
import Practice from "../../assets/game_modes/practice.png";
import Ranked from "../../assets/game_modes/rank.png";
import "./modes.scss";
import Leaderboard from "../Leaderboards/Leaderboards";

const Modes = () => {
  return (
    <Row>
      <Col md={8}>
        <div className="modes-container">
          <Row className="d-flex text-center align-items-center justify-content-center">
            <Col md={4}>
              <div className="header">
                <h2>Game Modes</h2>
                <small>Select mode to play</small>
              </div>
            </Col>
          </Row>
          <Row className="d-flex text-center align-items-center justify-content-center">
            <Col md={3} sm={6}>
              <div className="box1">
                <Image src={Practice} alt="Practice mode" fluid />
                <h3>Practice</h3>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="box2">
                <Image src={PvP} alt="PvP mode" fluid />
                <h3>PvP</h3>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="box3">
                <Image src={Ranked} alt="Ranked mode" fluid />
                <h3>Ranked</h3>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col md={4}>
        <Leaderboard />
      </Col>
    </Row>
  );
};

export default Modes;
