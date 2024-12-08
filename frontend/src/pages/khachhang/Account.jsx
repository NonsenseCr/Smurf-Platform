import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/styleAccount.css";

const Account = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [user, setUser] = useState(null);
  const [listPays, setListPays] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hàm để che dấu email
  const maskEmail = (email) => {
    const indexOfAt = email.indexOf("@");
    if (indexOfAt > 2) {
      return (
        email.substring(0, 2) +
        "*".repeat(indexOfAt - 2) +
        email.substring(indexOfAt)
      );
    }
    return email;
  };

  useEffect(() => {
    // Fetch user data and payments list
    const fetchData = async () => {
      try {
        const userFromStorage = JSON.parse(localStorage.getItem("user"));
        if (!userFromStorage || !userFromStorage.IdUser) {
          setErrorMessage("Không tìm thấy thông tin người dùng.");
          return;
        }

        const userResponse = await axios.get(`/api/user/${userFromStorage.IdUser}`);
        setUser(userResponse.data);

        const paymentResponse = await axios.get("/api/payments");
        setListPays(paymentResponse.data);
      } catch (error) {
        console.error("Error fetching user or payment data:", error);
        setErrorMessage("Lỗi khi tải thông tin.");
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/update", user);
      if (response.data.success) {
        setSuccessMessage("Cập nhật thông tin thành công!");
      } else {
        setErrorMessage(response.data.message || "Đã xảy ra lỗi khi cập nhật thông tin.");
      }
    } catch (error) {
      setErrorMessage("Không thể cập nhật thông tin.");
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="containers sections flex-grow-1 container-py my-3 vh-100">
      <div className="card overflow-hidden h-100">
        <div className="row g-0">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="list-group list-group-flush account-settings-links">
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "general" ? "active" : ""
                }`}
                onClick={() => handleTabChange("general")}
              >
                <i className="ri-information-line"></i> Thông Tin
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "password" ? "active" : ""
                }`}
                onClick={() => handleTabChange("password")}
              >
                <i className="fas fa-lock"></i> Mật khẩu & Bảo mật
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "connections" ? "active" : ""
                }`}
                onClick={() => handleTabChange("connections")}
              >
                <i className="fas fa-plug"></i> Kết nối
              </button>
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "invoice" ? "active" : ""
                }`}
                onClick={() => handleTabChange("invoice")}
              >
                <i className="fa-solid fa-receipt"></i> Thanh toán & Hóa đơn
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="col-md-9">
            <div className="p-4">
              <h4 className="fw-bold mb-4">Cài đặt tài khoản</h4>
              <div>
                {activeTab === "general" && (
                  user ? (
                    <form onSubmit={handleSaveChanges}>
                      <hr className="border-light m-0" />
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label">Username</label>
                          <input
                            name="username"
                            type="text"
                            className="form-control"
                            value={user.UserName || ""}
                            readOnly
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">FullName</label>
                          <input
                            name="FullName"
                            type="text"
                            className="form-control"
                            value={user.FullName || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input
                            name="Phone"
                            type="text"
                            className="form-control"
                            value={user.Phone || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Trạng thái tài khoản</label>
                          <input
                            type="text"
                            className="form-control"
                            value={
                              user.UserRole ? "Thành viên Premium" : "Thành viên thông thường"
                            }
                            readOnly
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Birthday</label>
                          <input
                            name="Birth"
                            type="date"
                            className="form-control"
                            value={user.Birth || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={maskEmail(user.Email || "")}
                            readOnly
                          />
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          <button type="submit" className="btn btn-primary">
                            Save changes
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary ms-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div>Đang tải thông tin...</div>
                  )
                )}
                {activeTab === "password" && (
                  <form>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input name="currentPassword" type="password" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input name="newPassword" type="password" className="form-control" />
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <button type="submit" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {activeTab === "connections" && (
                  <div className="card-body">
                    <h5>Kết nối tài khoản Google</h5>
                    <button className="btn btn-danger">Kết nối với Google</button>
                  </div>
                )}
                {activeTab === "invoice" && (
                  <div className="card-body">
                    {listPays.length > 0 ? (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>ID Invoice</th>
                            <th>Giá trị</th>
                            <th>Ngày thanh toán</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listPays.map((pay) => (
                            <tr key={pay.id}>
                              <td>{pay.id}</td>
                              <td>{pay.amount} VND</td>
                              <td>{pay.payDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Chưa có giao dịch nào.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
