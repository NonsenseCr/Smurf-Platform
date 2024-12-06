import ComicsGrid from "@/area-manager/components/ComicsGrid";
import Breadcrumb from "@/area-manager/components/Breadcrumb";
import { Link } from "react-router-dom";
import "@/area-manager/styles/home.css";
import logoFull from "@/assets/logo1.png";

const Home = () => {
  return (
    <div className="home-container">
    <Breadcrumb
            paths={[
              <Link to="/manager/home" key="home">Home</Link>,
              "Manager Site ",
            ]}
          />
    <div className="quick-access-container">
      <h2 className="quick-access-title">QUICK ACCESS</h2>
      <div className="quick-access-line quick-access-line-right"></div>
      <div className="quick-access">
        <div className="quick-access-item">
          <i className="ri-line-chart-line quick-access-icon"></i>
          Thống kê doanh thu
        </div>
        <div className="quick-access-item">
          <i className="ri-add-circle-line quick-access-icon"></i> {/* Dấu cộng */}
          Thêm Đầu Truyện
        </div>
        <div className="quick-access-item">
          <i className="ri-user-line quick-access-icon"></i>
          Quản lý người dùng
        </div>
        <div className="quick-access-item">
          <i className="ri-bar-chart-box-line quick-access-icon"></i>
          Thống kê truy cập
        </div>
        <div className="quick-access-item">
          <i className="ri-exchange-dollar-line quick-access-icon"></i>
          Kiểm Tra Giao Dịch
        </div>
        <div className="quick-access-item">
          <i className="ri-settings-3-line quick-access-icon"></i>
          Cài Đặt Platform
        </div>
        <div className="quick-access-item">
          <i className="ri-notification-3-line quick-access-icon"></i>
          Thông Báo
        </div>
        <div className="quick-access-item">
          <i className="ri-account-circle-line quick-access-icon"></i>
          Cài Đặt Tài Khoản
        </div>
        <div className="quick-access-item">
          <i className="ri-tools-line quick-access-icon"></i>
          Cấu hình chức năng
        </div>
        <div className="quick-access-item">
          <i className="ri-service-line quick-access-icon"></i>
          Cài đặt dịch vụ | Thanh toán
        </div>
        <div className="quick-access-item">
          <i className="ri-file-text-line quick-access-icon"></i>
          Quản lý hóa đơn
        </div>
        <div className="quick-access-item">
          <img src={logoFull} alt="SM Platform" className="quick-access-icon logo" />
          SM Platform
        </div>
        <div className="quick-access-item">
          <i className="ri-bug-line quick-access-icon"></i>
          Báo cáo
        </div>
        <div className="quick-access-item">
          <i className="ri-shield-line quick-access-icon"></i>
          Chính sách
        </div>
        <div className="quick-access-item">
          <i className="ri-money-dollar-box-line quick-access-icon"></i>
          Doanh thu
        </div>
        <div className="quick-access-item">
          <i className="ri-code-line quick-access-icon"></i>
          Web Devenlope Notice
        </div>
      </div>

      {/* Comics Grid */}
      <div className="comics-section">
        <div className="section-header">
          <h2 className="section-title">LATEST 30 COMIC LIST</h2>
          <div className="section-line"></div>
        </div>
        <ComicsGrid />
      </div>
    </div>  </div>
  );
};

export default Home;
