import "./navbar.scss";
import Profile from "../../assets/default-user.png";
import { Link } from "react-router-dom";

import { useAppContext } from "../../context/appContext";
import { Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import UserImage from "../common/UserImage";
import Challenger from "../../assets/ledgers/challengers.png";
import Ranking from "../../assets/ledgers/ranking.png";
import History from "../../assets/ledgers/history.png";

import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useAppContext();

  const [pic, setPic] = useState(null);

  useEffect(() => {
    setPic(`http://localhost:4999/api/v1/auth/profilepic/${user._id}`);
  }, [pic, user._id]);

  return (
    <Row className="navbar-container d-flex justify-content-between">
      <Col md="8" className="d-flex flex-row profile-container">
        <div className="profile-wrapper">
          <img
            className="profile"
            src={pic !== null ? pic : Profile}
            alt="profile"
          />
          <div className="name">
            <h1>{user?.name}</h1>
            {/* <small>{`@${user?.name}`}</small> */}
          </div>
        </div>
        <div className="badge">
          {/* <img src={badge} alt="" /> */}
          <UserImage user={user} />
          <h4>{`MMR: ${user?.mmr}`}</h4>
        </div>
      </Col>
      <Col md="4" className="ledgers-container">
        <div className="ledgers">
          <ul>
            <li className="item">
              <Link to="/" style={{ color: "white" }}>
                <img src={Challenger} alt="" />
              </Link>
            </li>
            <li className="item">
              <Link to="/ranking" style={{ color: "white" }}>
                <img src={Ranking} alt="" />
              </Link>
            </li>
            <li className="item">
              <Link to="/history" style={{ color: "white" }}>
                <img src={History} alt="" />
              </Link>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default Navbar;
