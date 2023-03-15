import Navbar from "../../components/Navbar/Navbar";
import TopNav from "../../components/TopNav/TopNav";
import Modes from "../../components/Modes/Modes";

import Pending from "../../components/Pending.jsx/Pending";

const Home = () => {
  return (
    <div>
      <TopNav />
      <Navbar />
      <Modes />
      <Pending />
    </div>
  );
};

export default Home;
