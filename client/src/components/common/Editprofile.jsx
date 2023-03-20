import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import Alert from "../Alert/Alert";
import FormRow from "../FormRow/FormRow";

const PopupForm = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, showModal } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

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
      <form className="form" onSubmit={handleSubmit}>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormRow type="number" name="MMR" value={user?.mmr} />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            Save Changes
          </button>
          <button className="btn btn-block" onClick={showModal}>
            Cancel
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default PopupForm;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupInner = styled.div`
  background: linear-gradient(326.9deg, #13132b 5.79%, #135e87 283.21%);
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
`;
