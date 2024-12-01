
import Swal from "sweetalert2";
import "../styles/stylePayment.css"; // Đảm bảo bạn có file CSS
import yuru from "../assets/img/log-in-yuzu.png";
import imgInfo from '../assets/denied2.png';
const Payment = () => {
  // Hàm xử lý khi người dùng chọn gói
  const handleCheckout = (packageId) => {
    const customerId = localStorage.getItem("customerId"); // Kiểm tra trạng thái đăng nhập

    if (!customerId) {
      // Hiển thị thông báo yêu cầu đăng nhập
      Swal.fire({
        text: "Bạn cần đăng nhập để đăng ký gói Thành Viên",
        imageUrl: imgInfo,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập ngay",
        cancelButtonText: "Hủy",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login"; // Điều hướng đến trang đăng nhập
        }
      });
    } else {
      // Nếu đã đăng nhập, chuyển hướng đến trang thanh toán
      Swal.fire({
        title: "Xử lý thanh toán...",
        text: "Đang chuyển hướng đến cổng thanh toán...",
        timer: 2000,
        showConfirmButton: false,
        willClose: () => {
          window.location.href = `/payment/checkout/${packageId}`; // Điều hướng với packageId
        },
      });
    }
  };

  return (
    <main className="main position-relative">
      <div className="main__top containers section" style={{ zIndex: 1000 }}>
        <div className="payment__header w-100 position-relative">
          <h2>PICK YOUR PREMIUM</h2>
          <div className="divider"></div>
        </div>

        <div className="payment__content w-100 position-relative">
          {/* CLASSIC Plan */}
          <div className="content content-basic">
            <h3>CLASSIC</h3>
            <h4>Free</h4>
            <ul>
              <li>Là gói dịch vụ cơ bản của Mangasmurf</li>
              <li>Đọc miễn phí các đầu truyện</li>
              <li>Đầu truyện và các chương truyện miễn phí mỗi ngày</li>
            </ul>
            <button
              className="btn-pay btn-basic"
              onClick={() => (window.location.href = "/comics")}
            >
              Watch Now
            </button>
          </div>

          {/* MEGA FAN Plan */}
          <div className="content content-mega">
            <h3>MEGA FAN</h3>
            <h4>₫69,000/ 129 <i className="ri-coins-fill"></i></h4>
            <h5>Là gói đặc quyền của hội viên Mangasmurf</h5>
            <ul>
              <li>Truy cập toàn bộ kho truyện của Mangasmurf</li>
              <li>Đọc sớm nhất các bộ truyện</li>
              <li>Sử dụng giao diện ZEN-UI nâng cao trải nghiệm</li>
            </ul>
            <button
              className="btn-pay btn-mega"
              onClick={() => handleCheckout("P004")}
            >
              Buy Now
            </button>
          </div>

          {/* FAN Plan */}
          <div className="content content-fan">
            <h3>FAN</h3>
            <h4>₫49,000/ 69 <i className="ri-coins-fill"></i></h4>
            <ul>
              <li>Là gói Thành viên của Mangasmurf</li>
              <li>Đọc miễn phí các đầu truyện</li>
              <li>Đọc các đầu truyện trả phí với giá phải chăng</li>
            </ul>
            <button
              className="btn-pay btn-fan"
              onClick={() => handleCheckout("P005")}
            >
              Buy Now
            </button>
          </div>

          <div className="img-pre" style={{ right: "-3.5rem", top: "20rem", maxWidth: "250px" }}>
            <img src={yuru} alt="Premium illustration" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
