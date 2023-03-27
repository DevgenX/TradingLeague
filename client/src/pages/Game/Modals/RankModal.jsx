import { useAppContext } from "../../../context/appContext";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserImage from "../../../components/common/UserImage";
import RankedImage from "../../../assets/game_modes/rank.png";
import "./modals.scss";

const RankModal = ({ show, setShow }) => {
  const { user, showRankModal, handleRankModal, handleSetMode } =
    useAppContext();

  const navigate = useNavigate();

  const redirect = () => {
    handleRankModal();
    handleSetMode("rank");
    navigate("/game/ranked");
  };

  return (
    <Modal
      show={showRankModal}
      onHide={handleRankModal}
      centered
      className="practice-modal rank-modal"
    >
      <Modal.Header>
        <div className="modal-head-img">
          <img src={RankedImage} alt="" />
        </div>

        <Modal.Title>Trading Floor</Modal.Title>

        <div className="btn-close" aria-label="Close" onClick={handleRankModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="box practice">
          <UserImage name="modal-img" user={user} pic={user?.profilepic?.key} />

          <p className="my-3">Your game is about to begin. </p>
          <p>You have a minute to beat the clock. Good luck!</p>
        </div>

        <div className="btn-container">
          <Button className="sub-btn" onClick={handleRankModal}>
            Back to Lobby
          </Button>
          <Button className="main-btn" onClick={redirect}>
            Start Game
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RankModal;
