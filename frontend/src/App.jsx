import { BrowserRouter as Router, useLocation, matchPath, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AdminRoutes from "area-manager/AdminRoutes";
import PublicRoutes from "./PublicRoutes"; 

import "remixicon/fonts/remixicon.css";



function App() {
  const location = useLocation();
  const isAdminPath = matchPath({ path: "/manager/*", end: false }, location.pathname) != null;

  useEffect(() => {
    // Dynamic import CSS theo route
    if (isAdminPath) {
      import("./area-manager/index.scss").then(() => {
        console.log("Admin styles loaded.");
      });
    } else {
      import("./styles/main.css").then(() => {
        console.log("Public styles loaded.");
      });
    }
  }, [isAdminPath]);

  return (
    <>
      <Routes>
          {!isAdminPath ? (
            <Route path="/*" element={<PublicRoutes />} />
          ) : (
            // <AdminRoutes />
            <Route path="/manager/*" element={<AdminRoutes />} />
          )}
        </Routes>
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
