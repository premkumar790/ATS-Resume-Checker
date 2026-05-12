import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/components1/Navbar/Navbar";
import MainHome from "./pages/MainHome";
import Login from "./components/components1/authentication/Login";
import ResultPage from "./components/components1/result/ResultPage";
import BuilderPage from "./pages/BuilderPage";
import Footer from "./components/components1/footer/Footer";
function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MainHome />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/builder" element={<BuilderPage />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;