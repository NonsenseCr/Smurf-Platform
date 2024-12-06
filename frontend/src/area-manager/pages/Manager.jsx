import { useState } from "react";
import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom"; // Import Link từ react-router-dom
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  BarChartOutlined,
  DollarOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Notification from "@/area-manager/components/Notification";
import logoFull from "@/assets/logo2.png";
import logoIcon from "@/assets/icon-Mangasmurf.png";
import defaultAvatar from "@/assets/default-avatar.jpg";
import "@/area-manager/styles/manager.css";

const { Sider, Content, Footer } = Layout;

const Manager = () => {
  const [collapsed, setCollapsed] = useState(false);

  const user = {
    name: "Nguyễn Văn A",
    role: "Admin",
    avatar: defaultAvatar,
  };

  const menuItems = [
    {
      key: "sub1",
      icon: <AppstoreOutlined />,
      label: "Quản lý dữ liệu",
      children: [
        {
          key: "sub1-1",
          label: "Quản lý đầu truyện",
          icon: <FileOutlined />,
          children: [
            { key: "1-1", label: <Link to="/manager/comic-index">Đầu Truyện</Link> }, // Gắn link cho Đầu Truyện
            { key: "1-2", label: "Chapter" },
            { key: "1-3", label: "Thể loại" },
            { key: "1-4", label: "Tác giả" },
          ],
        },
        {
          key: "sub1-2",
          label: "Quản lý người dùng",
          icon: <UserOutlined />,
          children: [
            { key: "2-1", label: "User" },
            { key: "2-2", label: "Khách hàng" },
          ],
        },
        {
          key: "sub1-3",
          label: "Quản lý dịch vụ",
          icon: <SettingOutlined />,
          children: [
            { key: "3-1", label: "Cấu hình dịch vụ" },
            {
              key: "3-2",
              label: "Quản lý hóa đơn",
              icon: <DollarOutlined />,
              children: [
                { key: "3-2-1", label: "Giao dịch tiền tệ" },
                { key: "3-2-2", label: "Giao dịch ticket" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "sub2",
      icon: <BarChartOutlined />,
      label: "Quản lý Thống kê",
    },
    {
      key: "sub3",
      icon: <SettingOutlined />,
      label: "Cài đặt trang web",
      children: [
        { key: "4-1", label: "Cấu hình trang web", icon: <BellOutlined /> },
        { key: "4-2", label: "Thông báo", icon: <BellOutlined /> },
        { key: "4-3", label: "Cấu hình chức năng web", icon: <SettingOutlined /> },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={300}
        collapsedWidth={80}
        style={{ backgroundColor: "#0E1111", display: "flex", flexDirection: "column" }}
      >
        <div className="logo-container">
          <Link to="/manager/home"> {/* Gắn link cho logo */}
            <img src={collapsed ? logoIcon : logoFull} alt="Logo" className="sidebar-logo" />
          </Link>
        </div>
        <div className={`user-info ${collapsed ? "collapsed" : ""}`}>
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
          {!collapsed && (
            <div className="user-details">
              <p className="user-name">{user.name}</p>
              <p className="user-role">{user.role}</p>
            </div>
          )}
        </div>
        <Menu theme="dark" mode="inline" items={menuItems} style={{ backgroundColor: "#0E1111", flex: 1 }} />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <Content style={{ margin: "16px", padding: "24px", backgroundColor: "#fff" }}>

          <Notification />
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer className="footer">
          <p>SmurfManga 2.0 API Web Beta Test - SMCopporation (c)</p>
          <p>Address: 11/7 Tan Lap 2 / Hiep Phu District / Thu Duc City / Ho Chi Minh City / VietNam</p>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Manager;
