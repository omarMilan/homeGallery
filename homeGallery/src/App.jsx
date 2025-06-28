import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import AddPage from "./pages/addPage";
import ViewPage from "./pages/ViewPage";
import DeletePage from "./pages/deletePage";

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
            <Route path="/ViewPage" element={<ViewPage />} />
            <Route path="/DeletePage" element={<DeletePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
