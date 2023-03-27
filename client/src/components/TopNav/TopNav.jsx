import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo/logo.png";
import defaultUser from "../../assets/default-user.png";
import { useAppContext } from "../../context/appContext";
import { FaCaretDown } from "react-icons/fa";
import "./topnav.scss";
import styled from "styled-components";
import PopupForm from "../common/Editprofile";

const TopNav = () => {
  const { user, logoutUser, showModal, showPopup } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar className="topnav" expand="lg">
      <Container>
        <Navbar.Brand className="brand p-6">
          <Link to="/" className="link">
            <img src={logo} alt="img" className="nav-img" />
            TradingLeague
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {!user && (
          <Link
            to="/register"
            className="login ms-auto"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Login
          </Link>
        )}

        {user && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="btn-container ms-auto">
              <button type="button" className="btn" onClick={handleDropdown}>
                <img
                  src={defaultUser}
                  alt="default-user"
                  className="user-tab"
                />
                {user?.name}
                <FaCaretDown />
              </button>
              <div className="dropdown show-dropdown">
                {showDropdown && (
                  <>
                    <PopUps>
                      <button type="button" onClick={showModal}>
                        Profile
                      </button>
                    </PopUps>
                    <PopUps>
                      <button type="button" onClick={logoutUser}>
                        Logout
                      </button>
                    </PopUps>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        )}

        {showPopup && <PopupForm />}
      </Container>
    </Navbar>
  );
};
export default TopNav;

const PopUps = styled.div`
  button {
    width: 100%;
    height: 100%;
    color: #fff;
    cursor: pointer;
    margin: 5px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 10px;
    transition: all 0.4s ease-in-out;
    &:first-child {
      background: linear-gradient(326.9deg, #393984 5.79%, #135e87 283.21%);
      &:hover {
        background: linear-gradient(326.9deg, #393984 5.79%, #135e87 283.21%);
        background-image: linear-gradient(
          to right,
          #25aae1,
          #40e495,
          #30dd8a,
          #2bb673
        );
        box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
      }
    }
    &:last-child {
      background: linear-gradient(326.9deg, #393984 5.79%, #135e87 283.21%);
      &:hover {
        background: linear-gradient(326.9deg, #393984 5.79%, #135e87 283.21%);
        background-image: linear-gradient(
          to right,
          #25aae1,
          #40e495,
          #30dd8a,
          #2bb673
        );
        box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
      }
    }
  }
`;
