import useAppContext from "../../../context/appContext";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserImage from "../../common/UserImage/UserImage";

const RankModal = ({ show, setShow }) => {
  const { user, setGameDuration } = useAppContext();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const redirect = () => {
    setShow(false);
    navigate("/");
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="practice-modal rank-modal"
    >
      <Modal.Header>
        <div className="modal-head-img">
          <img src="/assets/img/game_modes/rank.png" alt="" />
        </div>

        <Modal.Title>Trading Floor</Modal.Title>

        <div className="btn-close" aria-label="Close" onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="box practice">
          <UserImage name="modal-img" user={user} pic={user?.profilepic?.key} />

          <p className="m-0">Your game is about to begin. </p>
          <p>You have a minute to beat the clock. Good luck!</p>
        </div>

        <div className="btn-container">
          <Button className="sub-btn" onClick={handleClose}>
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
