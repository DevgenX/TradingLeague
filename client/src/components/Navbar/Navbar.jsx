import "./navbar.scss";
import Profile from "../../assets/default-user.png";

import { Link } from "react-router-dom";
import { FaHome, FaBook, FaBell } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserImage from "../common/UserImage";
import badge from "../../assets/badge/Ape.svg";

const Navbar = () => {
  const { user } = useAppContext();

  return (
    <Container>
      <Row className="navbar-container d-flex justify-content-between">
        <Col md="6" className="d-flex flex-row profile-container">
          <div className="profile-wrapper">
            <img className="profile" src={Profile} alt="profile" />
            <div className="name">
              <h1>{user?.name}</h1>
              <small>{`@${user?.name}`}</small>
            </div>
          </div>
          <div className="badge">
            <img src={badge} alt="" />
            {/* <UserImage user={user} /> */}
            <h4>{`MMR: ${user?.mmr}`}</h4>
          </div>
        </Col>
        <Col xs="6" md="4">
          <div className="ledgers">
            <ul>
              <li className="item">
                <Link to="/" style={{ color: "white" }}>
                  <FaHome />
                </Link>
              </li>
              <li className="item">
                <Link to="/ranking" style={{ color: "white" }}>
                  <FaBook />
                </Link>
              </li>
              <li className="item">
                <Link to="/" style={{ color: "white" }}>
                  <FaBell />
                </Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
