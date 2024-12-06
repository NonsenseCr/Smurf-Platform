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


//nonsense branch
import Manager from "./area-manager/pages/Manager"
import ManagerHome from "./area-manager/pages/Home"

import ComicIndex from "./area-manager/pages/comic/Index"
import ComicDetail from "./area-manager/pages/comic/Detail"

function App() {
  const location = useLocation();

  const noHeaderFooterRoutes = ["/login", "/register"];
  const isNoHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  const areaManagerRoutes  = ["/manager"];
  
  const isAreaManager = areaManagerRoutes.some((route) =>
    location.pathname.startsWith(route));

  return (
    <>
      {!isNoHeaderFooter && !isAreaManager && <Header />}
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



          <Route path="manager" element={<Manager />}>
            <Route path="home" element={<ManagerHome />} />
            <Route path="comic-index" element={<ComicIndex />} />
            <Route path="comic-index/comic-detail/:id" element={<ComicDetail />} />
          </Route>


        </Routes>
        <ScrollToTopButton/>
      </main>
      {!isNoHeaderFooter  && !isAreaManager && <Footer />}
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
