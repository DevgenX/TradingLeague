import Home from "./pages/Home/Home";
import Register from "./pages/Register/register";
import Ranking from "./components/Ranking/Ranking";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
