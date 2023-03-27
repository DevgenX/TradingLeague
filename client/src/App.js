import Home from "./pages/Home/Home";
import Register from "./pages/Register/register";
import Ranking from "./components/Ranking/Ranking";
import GameHistoryTable from "./components/GameHistory/GameHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game/Game";
import NotFound from "./components/Error/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/history" element={<GameHistoryTable />} />
        <Route path="/game/practice" element={<Game mode="practice" />} />
        <Route
          path="/game/pvp"
          element={<Game mode="casual" challenge={false} />}
        />
        <Route
          path="/game/pvp/challenger"
          element={<Game mode="casual" challenge={true} />}
        />
        <Route path="/game/ranked" element={<Game mode="rank" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
