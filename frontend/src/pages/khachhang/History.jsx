import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import yuzu from '../../assets/yuzu.png';
const History = () => {
  const [history, setHistory] = useState([]); // Danh sách lịch sử đọc
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lỗi khi tải dữ liệu

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        // Gọi API để lấy dữ liệu lịch sử
        const response = await axios.get("http://localhost:5000/api/history");
        if (response.data && response.data.length > 0) {
          setHistory(response.data);
        } else {
          throw new Error("Không có lịch sử đọc nào để hiển thị.");
        }
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải lịch sử.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDeleteHistory = async (userId, comicId) => {
    try {
      // Xóa lịch sử đọc
      const response = await axios.post("http://localhost:5000/api/history/delete", {
        userId,
        comicId,
      });
      if (response.status === 200) {
        setHistory((prev) => prev.filter((item) => item.IbBo !== comicId));
      }
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  if (loading) {
    return <div className="loading-container">Đang tải dữ liệu...</div>;
  }

  if (error || !history || history.length === 0) {
    return (
      <div className="section-bottom container w-100" style={{ height: "50vh" }}>
        <img src={yuzu} alt="cat Image" />
        <span>
          Opps!!! <br />
          {error || "Có vẻ như bạn chưa có lịch sử đọc mới"} <br />
          Đi đến trang chủ ngay
        </span>
        <Link to="/">Trang Chủ</Link>
      </div>
    );
  }

  return (
    <div className="main__top section">
      <div className="list__container containers list">
        <div
          className="top__content"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem 0",
          }}
        >
          <h2 className="section__subtitle">
            <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: "30px", paddingRight: "1rem" }}></i>
            LỊCH SỬ ĐỌC TRUYỆN
          </h2>
        </div>
        <div className="container w-100">
          <div className="row justify-content-center">
            {history.map((item) => (
              <div key={item.IbBo} className="item col-2 update-item" style={{ width: "200px" }}>
                <Link to={`/comic/${item.IbBo}`}>
                  <figure className="position-relative">
                    {item.AnhBia && (
                      <img
                        src={`http://localhost:5000${item.AnhBia}`}
                        alt="Truyện Image"
                        className="d-block w-100"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/path/to/default-image.jpg";
                        }}
                      />
                    )}
                    <figcaption>
                      <h6 className="item-title">
                        <Link to={`/comic/${item.IbBo}`}>{item.TenBo}</Link>
                      </h6>
                      <Link
                        to={`/comic/${item.IbBo}/chapter/${item.LsMoi}`}
                        className="item-chapter"
                        style={{ fontSize: "13px" }}
                      >
                        <span className="chap" style={{ marginRight: "10px" }}>
                          Đọc tiếp chapter {item.LsMoi}
                        </span>
                      </Link>
                    </figcaption>
                    <button
                      onClick={() => handleDeleteHistory(item.userId, item.IbBo)}
                      className="unfollow"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "var(--containers-color-alt)",
                        color: "#fff",
                        padding: ".2rem .6rem",
                        borderBottomLeftRadius: "5px",
                        border: "none",
                      }}
                    >
                      <i style={{ color: "#fff" }} className="fa-solid fa-trash-can"></i>
                    </button>
                  </figure>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
