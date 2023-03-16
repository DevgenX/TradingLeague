import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo/logo.png";
import defaultUser from "../../assets/default-user.png";

const TopNav = () => {
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
          <Nav className="ms-auto">
            <img src={defaultUser} alt="default-user" className="user-tab" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default TopNav;
