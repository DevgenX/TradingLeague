import { useAppContext } from "../../../context/appContext";
import { Button, Form, Modal } from "react-bootstrap";

import PvpImage from "../../../assets/game_modes/casual.png";

import "./modals.scss";
import { useEffect } from "react";

const FindModal = () => {
  const {
    user,
    users,
    getUsers,
    showFindModal,
    handleFindModal,
    handlePvPModal,
    handleSetToChallenge,
    toChallenge,
  } = useAppContext();

  useEffect(() => {
    getUsers();
  }, []);

  const handleInputChange = (id) => {
    if (id !== 0) {
      // SET TO CHALLENGE
      const selected_user = users.find((u) => u._id === id);

      handleSetToChallenge(selected_user);
    }
  };

  const handleSetMatch = async () => {
    try {
      if (toChallenge) {
        // Close find modal
        handleFindModal();

        // Show PVP modal with selected to challenge user
        handlePvPModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const players = (users) => {
    return users
      .filter((u) => u?._id !== user?._id)
      .map((user) => <option value={user?._id}>{user?.name}</option>);
  };

  return (
    <Modal
      show={showFindModal}
      onHide={handleFindModal}
      centered
      className="practice-modal"
    >
      <Modal.Header>
        <div className="modal-head-img">
          <img src={PvpImage} alt="" />
        </div>

        <Modal.Title>Battle Arena</Modal.Title>

        <div className="btn-close" aria-label="Close" onClick={handleFindModal}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="box practice">
          {/* <UserImage name="modal-img" user={user} pic={user?.profilepic?.key} /> */}

          <p className="my-3">Select a player to challenge.</p>

          {/* DISPLAY ALL USERS EXCEPT CURRENT USER */}
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => handleInputChange(e.target.value)}
          >
            {users.filter((u) => u?._id !== user?._id).length === 0 ? (
              <option disabled>No data available</option>
            ) : (
              <>
                <option value={0}>Select player</option>
                {players(users)}
              </>
            )}
          </Form.Select>
        </div>

        <div className="btn-container">
          <Button className="sub-btn" onClick={handleFindModal}>
            Back to Lobby
          </Button>
          <Button
            className="main-btn"
            onClick={handleSetMatch}
            disabled={
              users.filter((u) => u?._id !== user?._id).length === 0 ||
              !toChallenge
            }
          >
            Confirm
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FindModal;
