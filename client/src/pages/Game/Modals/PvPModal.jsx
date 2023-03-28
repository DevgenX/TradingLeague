import { useAppContext } from "../../../context/appContext";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserImage from "../../../components/common/UserImage";
import { useCallback } from "react";

import PvpImage from "../../../assets/game_modes/casual.png";

const PvPModal = () => {
  const {
    user,
    toChallenge,
    showPvPModal,
    handlePvPModal,
    handleSetMode,
    handleSetToChallenge,
  } = useAppContext();

  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    // Clear to challenge user
    handleSetToChallenge(null);

    // setToChallenge(null);
    handlePvPModal();
  }, [handlePvPModal, handleSetToChallenge]);

  const redirect = () => {
    handlePvPModal();
    handleSetMode("casual");
    navigate("/game/pvp");
  };

  return (
    <Modal
      dialogClassName="modal-40w"
      show={showPvPModal}
      onHide={handlePvPModal}
      centered
      className="casual-modal"
    >
      <Modal.Header>
        <div className="modal-head-img">
          <img src={PvpImage} alt="" />
        </div>

        <Modal.Title>Battle Arena</Modal.Title>

        <div className="btn-close" aria-label="Close" onClick={handlePvPModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </Modal.Header>

      <Modal.Body>
        <p>
          Battle Arena is about to begin. <br /> You have a minute to beat your
          opponent. Good luck!
        </p>

        <div className="box casual">
          <Row className="gx-0">
            <Col md="5">
              <div className="user d-flex align-items-center">
                <p
                  className={`user-name ${
                    user?.name?.includes(".") ? "ens" : ""
                  }`}
                >
                  {user?.name || "Unnamed"} <br />{" "}
                </p>
                <UserImage name="modal-img" user={user} />
              </div>
            </Col>

            <Col md="2" className="align-self-center">
              <p className="vs">vs</p>
            </Col>

            <Col md="5">
              <div className="user d-flex align-items-center">
                <UserImage user={toChallenge} name="modal-img" />
                <p
                  className={`user-name ${
                    toChallenge?.name?.includes(".") ? "ens" : ""
                  }`}
                >
                  {toChallenge?.name || "Unnamed"} <br />{" "}
                </p>
              </div>
            </Col>
          </Row>
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

export default PvPModal;
