import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import AddPage from "./pages/addPage";

function App() {
  return (
    <div>
      {" "}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/AddPage" element={<AddPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
