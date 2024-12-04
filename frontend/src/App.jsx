import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Element/Header";
import Footer from "./components/Element/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ListTrendingComics from "./pages/ListTrendingComics";
import ListTypeComics from "./pages/ListTypeComics";
import Login from "./pages/Login";
import "remixicon/fonts/remixicon.css";
import "./styles/main.css";
import Register from "./pages/Register";
import Rankings from "./pages/Rankings";
import ScrollToTopButton from "./components/Element/ScrollToTopButton";
import Payment from "./pages/Payment";
import ListLatestComics from "./pages/ListLatestComics";
import CtBoTruyen from "./pages/CTBoTruyen";

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
          <Route path="/latest" element={<ListLatestComics />} />
          <Route path="/:id" element={<ListTypeComics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rankings/:type" element={<Rankings />} />
          <Route path="/premium" element={<Payment />} />
          <Route path="/comic/:id" element={<CtBoTruyen />} />
        </Routes>
        <ScrollToTopButton/>
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
