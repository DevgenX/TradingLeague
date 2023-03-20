import Navbar from "../../components/Navbar/Navbar";
import TopNav from "../../components/TopNav/TopNav";
import Modes from "../../components/Modes/Modes";
import Pending from "../../components/Pending/Pending";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <TopNav />

      <Container>
        <Navbar />
        <Modes />
        <Pending />
      </Container>
    </>
  );
};

export default Home;
