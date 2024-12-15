import  { Suspense, lazy } from "react";
import { useLocation, matchPath, Routes, Route } from "react-router-dom";

// Lazy-load các component chính
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Rankings = lazy(() => import("./pages/Rankings"));
const Payment = lazy(() => import("./pages/Payment"));
const ListTrendingComics = lazy(() => import("./pages/ListTrendingComics"));
const ListTypeComics = lazy(() => import("./pages/ListTypeComics"));
const ListLatestComics = lazy(() => import("./pages/ListLatestComics"));
const CtBoTruyen = lazy(() => import("./pages/botruyen/CTBoTruyen"));
const Chapter = lazy(() => import("./pages/botruyen/Chapter"));
const Infor = lazy(() => import("./pages/Infor"));
const AuthSuccess = lazy(() => import("./components/Element/AuthSuccess"));
const Account = lazy(() => import("./pages/khachhang/Account"));
const History = lazy(() => import("./pages/khachhang/History"));
const Following = lazy(() => import("./pages/khachhang/Following"));

// Import Header, Footer và các thành phần khác
import Header from "./components/Element/Header";
import Footer from "./components/Element/Footer";
import ScrollToTopButton from "./components/Element/ScrollToTopButton";
import Loader from "./components/Element/Loader";

// CSS transition
import "./styles/components/Transitions.css";

const PublicRoutes = () => {
    const location = useLocation();
    const isAdminPath = matchPath({ path: "/admin/*", end: false }, location.pathname) != null;

    // Danh sách các route không cần Header/Footer
    const noHeaderFooterRoutes = ["/login", "/register", "/infor", "/auth/success", "/admin/*"];
    const isNoHeaderFooter = noHeaderFooterRoutes.some((path) =>
        matchPath({ path, end: false }, location.pathname)
    );

    return (
        <div className="public-root">
            {/* Header luôn hiển thị nếu không thuộc các route bị loại trừ */}
            {!isNoHeaderFooter && !isAdminPath && <Header />}

            {/* Main chỉ render nội dung route */}
            <main role="main" className="fade-in">
                <Suspense fallback={<Loader isLoading={true} />}>
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
                </Suspense>
                <ScrollToTopButton />
            </main>

            {/* Footer luôn hiển thị nếu không thuộc các route bị loại trừ */}
            {!isNoHeaderFooter && !isAdminPath && <Footer />}
        </div>
    );
};

export default PublicRoutes;
