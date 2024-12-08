import React from "react";
import AdminHeader from "../area-manager/Elenments/AdminHeader";
import Sidebar from "../area-manager/Elenments/Sidebar";
import AdminFooter from "../area-manager/Elenments/AdminFooter";
import { Outlet } from "react-router-dom";

// Import CSS Modules
import styles from "../area-manager/styles/styleAdmin.module.css";

const AdminLayout = () => {
  return (
    
    <div className={styles.adminLayout}>
      <AdminHeader />
      <Sidebar />
      <div className={styles.pageWrapper}>
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;