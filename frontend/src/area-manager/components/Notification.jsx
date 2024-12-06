
import { Alert } from "antd";
import "@/area-manager/styles/home.css";
import imgReg from "@/assets/imgreg.png";

const Notification = () => {
    
  const message = "Tất cả nhân viên chú ý: Skibidi tập thể sau ngày 7/12/2024, lên văn phòng chính gặp trưởng phòng Chi Văn Dân nhận vợt Pickle Balls Free  !!!           Đồng sáng tạo NVIDA đi ăn bún đậu mắm tôm is real !!                          Bộ Nội vụ đã thống nhất lịch nghỉ Tết 2025 của công chức, viên chức, cán bộ là 09 ngày, từ thứ bảy ngày 25/01/2025  đến hết chủ nhật ngày 02/02/2025 "                               ;

  return (
    <div className="notification-container">
      <div className="notification-image">
        <img src={imgReg} alt="Thông báo" />
      </div>
      <Alert
        message={<div className="notification-content">{message}</div>}
        type="info"
        showIcon
        icon={<i className="ri-volume-up-line notification-icon"></i>}
        style={{ border: "2px dashed #6a1b9a", backgroundColor: "#f9f0ff" }}
      />
    </div>
  );
};

export default Notification;
