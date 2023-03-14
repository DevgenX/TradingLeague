import "./navbar.scss";
import Profile from "../../assets/default-user.png";
import badge from "../../assets/badge/Ape.svg";
import { FaHome, FaBook, FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <section className="game-nav">
      <div className="container">
        <div className="profile-wrapper">
          <img className="profile" src={Profile} alt="profile" />
          <div className="name">
            <h1>John Doe</h1>
            <small>@JohnDoe</small>
          </div>
          <button className="btn">Edit profile</button>
          <div className="badge">
            <img src={badge} alt="badge" />
            <h4>Ape</h4>
          </div>
        </div>
        <div className="left-bar">
          <ul>
            <li className="item">
              <FaHome />
            </li>
            <li className="item">
              <FaBook />
            </li>
            <li className="item">
              <FaBell />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default Navbar;
