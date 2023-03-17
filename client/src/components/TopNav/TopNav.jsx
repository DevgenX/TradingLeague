import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo/logo.png";
import defaultUser from "../../assets/default-user.png";
import { useAppContext } from "../../context/appContext";
import { FaCaretDown } from "react-icons/fa";
import "./topnav.scss";

const TopNav = () => {
  const { user } = useAppContext();
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
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="btn-container ms-auto">
            <button type="button" className="btn" onClick={handleDropdown}>
              <img src={defaultUser} alt="default-user" className="user-tab" />
              {user?.name}
              <FaCaretDown />
            </button>
            <div
              className={showDropdown ? "dropdown show-dropdown" : "dropdown"}
            >
              <button
                type="button"
                className="edit-btn"
                onClick={() => console.log("Editing user")}
              >
                Profile
              </button>
              <button
                type="button"
                className="logout-btn"
                onClick={() => console.log("Logging out user")}
              >
                Logout
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default TopNav;
