import Navbar from "../../components/Navbar/Navbar";
import TopNav from "../../components/TopNav/TopNav";
import Modes from "../../components/Modes/Modes";
import Pending from "../../components/Pending/Pending";
import { Container } from "react-bootstrap";
import { useAppContext } from "../../context/appContext";

const Home = () => {
  const { user } = useAppContext();

  return (
    <>
      <TopNav />

      <Container className="my-4">
        {user && <Navbar />}
        <Modes />
        <Pending />
      </Container>
    </>
  );
};

export default Home;
