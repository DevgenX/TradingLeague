import React, { useState, useCallback, useEffect, useRef } from "react";

import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import { Button } from "react-bootstrap";
import Resizer from "react-image-file-resizer";

import Alert from "../Alert/Alert";
import FormRow from "../FormRow/FormRow";

import Profile from "../../assets/default-user.png";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

const PopupForm = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    showModal,
    uploadPic,
  } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [pic, setPic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPic(`http://localhost:4999/api/v1/auth/profilepic/${user._id}`);
  }, [pic]);

  const fileInput = useRef([]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!name || !email) {
        displayAlert();
        return;
      }

      updateUser({ name, email });
    },
    [name, email, displayAlert, updateUser]
  );

  const handleProfileChange = async (val) => {
    try {
      const url = URL.createObjectURL(val);
      setPreview(url);

      const image = await resizeFile(val);

      const formData = new FormData();
      formData.append(`avatar`, image);

      await uploadPic(formData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Popup>
      <form className="form" onSubmit={handleSubmit}>
        {showAlert && <Alert />}
        <div className="form-center">
          <div className="pic-container text-center mb-3">
            <input
              className="d-none"
              ref={(element) => (fileInput.current["profile_pic"] = element)}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleProfileChange(e.target.files[0])}
            />

            <div className="profile-pic mb-2">
              <img
                src={preview !== null ? preview : pic !== null ? pic : Profile}
                alt=""
                className="rounded-circle p-2"
                style={{ width: "120px", border: "2px solid #6a6ba0" }}
              />
            </div>

            <Button
              size="sm"
              onClick={() => fileInput.current["profile_pic"].click()}
            >
              Change photo
            </Button>
          </div>
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

          <FormRow type="number" name="MMR" value={user?.mmr} readOnly />
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
