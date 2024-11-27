import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ListTrendingComics from "./pages/ListTrendingComics";
import ListTypeComics from "./pages/ListTypeComics";
import Login from "./pages/Login";
import "remixicon/fonts/remixicon.css";
import "./styles/main.css";
import Register from "./pages/Register";

function App() {
  const location = useLocation();

  const noHeaderFooterRoutes = ["/login", "/register"];
  const isNoHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!isNoHeaderFooter && <Header />}
      <main role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trending" element={<ListTrendingComics />} />
          <Route path="/:id" element={<ListTypeComics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {!isNoHeaderFooter && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
