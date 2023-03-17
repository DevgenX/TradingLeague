import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import Alert from "../Alert/Alert";

const PopupForm = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, showPopup } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleUsernameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email) {
      displayAlert();
      return;
    }

    updateUser({ name, email });
  };

  return (
    <Popup>
      <PopupInner>
        <PopupTitle>Edit Profile</PopupTitle>
        {showAlert && <Alert />}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormGroupLabel htmlFor="username">Username:</FormGroupLabel>
            <FormGroupInput
              type="text"
              id="username"
              value={name}
              onChange={handleUsernameChange}
            />
          </FormGroup>
          <FormGroup>
            <FormGroupLabel htmlFor="email">Email:</FormGroupLabel>
            <FormGroupInput
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroup>
          <FormGroup>
            <FormGroupLabel htmlFor="mmr">MMR:</FormGroupLabel>
            <FormGroupInput type="number" value={user?.mmr} />
          </FormGroup>
          <div className="form-actions">
            <button type="submit" disabled={isLoading} onClick={updateUser}>
              {isLoading ? "Please Wait..." : "Save Changes"}
            </button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </PopupInner>
    </Popup>
  );
};

export default PopupForm;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupInner = styled.div`
  background: radial-gradient(
    circle,
    rgba(0, 89, 255, 1) 0%,
    rgba(0, 38, 255, 1) 100%
  );
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
`;

const PopupTitle = styled.h2`
  margin-top: 0;
  font-size: 2rem;
  text-align: center;
  color: white;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const FormGroupLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
`;

const FormGroupInput = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 4px;
  border: none;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  background-color: white;
  color: black;
`;
