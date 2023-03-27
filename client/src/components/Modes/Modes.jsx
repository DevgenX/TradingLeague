import { Row, Col, Image } from "react-bootstrap";
import { useAppContext } from "../../context/appContext";

import PvP from "../../assets/game_modes/casual.png";
import Practice from "../../assets/game_modes/practice.png";
import Ranked from "../../assets/game_modes/rank.png";
import "./modes.scss";
import Leaderboard from "../Leaderboards/Leaderboards";

import PvPModal from "../../pages/Game/Modals/PvPModal";
import RankModal from "../../pages/Game/Modals/RankModal";
import PracticeModal from "../../pages/Game/Modals/PracticeModal";
import FindModal from "../../pages/Game/Modals/FindModal";

const Modes = () => {
  const { handlePracticeModal, handleRankModal, handleFindModal } =
    useAppContext();

  return (
    <Row>
      <PracticeModal />
      <PvPModal />
      <RankModal />

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
              <div className="box1" onClick={handlePracticeModal}>
                <Image src={Practice} alt="Practice mode" fluid />
                <h3>Practice</h3>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="box2" onClick={handleFindModal}>
                <Image src={PvP} alt="PvP mode" fluid />
                <h3>PvP</h3>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="box3" onClick={handleRankModal}>
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
