import Home from "./pages/Home/Home";
import Register from "./pages/Register/register";
import Ranking from "./components/Ranking/Ranking";
import GameHistoryTable from "./components/GameHistory/GameHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game/Game";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/history" element={<GameHistoryTable />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<h1>Error page here</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
