

import { useLocation, matchPath, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rankings from "./pages/Rankings";
import Payment from "./pages/Payment";
import ListTrendingComics from "./pages/ListTrendingComics";
import ListTypeComics from "./pages/ListTypeComics";
import ListLatestComics from "./pages/ListLatestComics";
import CtBoTruyen from "./pages/botruyen/CTBoTruyen";
import Chapter from "./pages/botruyen/Chapter";
import Infor from "./pages/Infor";
import AuthSuccess from "./components/Element/AuthSuccess";
import Account from "./pages/khachhang/Account";
import History from "./pages/khachhang/History";
import Following from "./pages/khachhang/Following";

import Header from "./components/Element/Header";
import Footer from "./components/Element/Footer";
import ScrollToTopButton from "./components/Element/ScrollToTopButton";
import Loader from "./components/Element/Loader";



function PublicRoutes() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const isAdminPath = matchPath({ path: '/manager/*', end: false }, location.pathname) != null;

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const userData = queryParams.get("user");
        if (userData) {
            localStorage.setItem("user", userData);
            window.history.replaceState(null, "", "/");
        }
    }, [location]);

    const noHeaderFooterRoutes = ["/login", "/register", "/infor", "/auth/success", "/manager/*"];
    const isNoHeaderFooter = noHeaderFooterRoutes.some(path =>
        matchPath({ path, end: false }, location.pathname)
    );
    return (
        <div className="public-root">
            {!isNoHeaderFooter && !isAdminPath && <Header />}
            <main role="main" >
                
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
                    <Route path="/chapter/:id_bo/:stt_chap" element={<Chapter />} />
                    <Route path="/infor" element={<Infor />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/following" element={<Following />} />
                    <Route path="/auth/success" element={<AuthSuccess />} />
                    
                </Routes>
                <Loader isLoading={isLoading} setIsLoading={setIsLoading} />
                <ScrollToTopButton />
            </main>
            {!isNoHeaderFooter && !isAdminPath && <Footer />}
            
        </div>
    );
}

export default PublicRoutes;
