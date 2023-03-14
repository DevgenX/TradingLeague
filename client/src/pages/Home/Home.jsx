import "./Home.scss";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mode-container">
        <div className="header">
          <h3>Select Game</h3>
          <small>Select mode to play</small>
        </div>
      </div>
    </div>
  );
};
export default Home;
