import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Element/Header";
import Footer from "./components/Element/Footer";
import Home from "./pages/Home";
import About from "./pages/About";

import "./styles/main.css";
import "remixicon/fonts/remixicon.css";
// Customer
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rankings from "./pages/Rankings";
import ScrollToTopButton from "./components/Element/ScrollToTopButton";
import Payment from "./pages/Payment";
import ListTrendingComics from "./pages/ListTrendingComics";
import ListTypeComics from "./pages/ListTypeComics";
import ListLatestComics from "./pages/ListLatestComics";
import CtBoTruyen from "./pages/botruyen/CTBoTruyen";
import Chapter from "./pages/botruyen/Chapter";
import Infor from "./pages/Infor";
import AuthSuccess from "./components/Element/AuthSuccess";
import Loader from "./components/Element/Loader";
// import AdminLayout from "./area-manager/AdminLayout";

//nonsense branch
import Manager from "./area-manager/pages/Manager"
import ManagerHome from "./area-manager/pages/Home"
import ComicIndex from "./area-manager/pages/comic/Index"
import ComicDetail from "./area-manager/pages/comic/Detail"
import Account from "./pages/khachhang/Account";
import History from "./pages/khachhang/History";
import Following from "./pages/khachhang/Following";
// import AdminLayout from "./area-manager/AdminLayout";


//


// import CustomScrollbar from "./components/Element/CustomScrollbar";

function App() {
  const location = useLocation();

// Kiểm tra nếu URL có thông tin người dùng sau khi đăng nhập Google
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userData = queryParams.get("user");
    if (userData) {
      localStorage.setItem("user", userData);
      window.history.replaceState(null, "", "/"); // Xóa query string
    }
  }, [location]);

  const [isLoading, setIsLoading] = useState(true);

  const noHeaderFooterRoutes = ["/login", "/register", "/infor", "/auth/success"];
  const isNoHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  const areaManagerRoutes  = ["/manager"];
  
  const isAreaManager = areaManagerRoutes.some((route) =>
    location.pathname.startsWith(route));

  return (
    <>
      {!isNoHeaderFooter && !isAreaManager && <Header />}
      
      <main role="main" >
      <Loader isLoading={isLoading} setIsLoading={setIsLoading} />
        {/* <CustomScrollbar> */}
        
          <Routes>
            {/* UI CUSTOMER */}
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
            <Route path="/chapter/:id_bo/:stt_chap" element={<Chapter />} />
            <Route path="/infor" element={<Infor />} />
            <Route path="/account" element={<Account />} />
            <Route path="/history" element={<History />} />
            <Route path="/following" element={<Following />} />
            <Route path="/auth/success" element={<AuthSuccess />} /> 

            {/* UI MANAGEMENT */}
            {/* <Route path="/manager" element={<AdminLayout />}> */}
              {/* <Route path="home" element={<ManagerHome />} />
              <Route path="comic-index" element={<ComicIndex />} />
              <Route path="comic-index/comic-detail/:id" element={<ComicDetail />} /> */}
            {/* </Route> */}

            <Route path="manager" element={<Manager />}>
            <Route path="home" element={<ManagerHome />} />
            <Route path="comic-index" element={<ComicIndex />} />
            <Route path="comic-index/comic-detail/:id" element={<ComicDetail />} />
          </Route>

          </Routes>
        <ScrollToTopButton />
        {/* </CustomScrollbar> */}
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
