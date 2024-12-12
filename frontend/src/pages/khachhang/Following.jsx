import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import imgInfo from '../../assets/img/empty-cr-list.png';
const Following = () => {
  const [following, setFollowing] = useState([]); // Danh sách truyện theo dõi
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lỗi khi tải dữ liệu

  useEffect(() => {
    const fetchFollowing = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/api/following");
        if (response.data && response.data.length > 0) {
          setFollowing(response.data);
        } else {
          throw new Error("Không có truyện nào trong danh sách theo dõi.");
        }
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải danh sách theo dõi.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  const handleUnfollow = async (userId, comicId) => {
    try {
      // Gửi yêu cầu xóa theo dõi
      const response = await axios.post("http://localhost:5000/api/following/unfollow", {
        userId,
        comicId,
      });
      if (response.status === 200) {
        setFollowing((prev) => prev.filter((item) => item.IbBo !== comicId));
      }
    } catch (error) {
      console.error("Error unfollowing comic:", error);
    }
  };

  if (loading) {
    return <div className="loading-container">Đang tải dữ liệu...</div>;
  }

  if (error || !following || following.length === 0) {
    return (
            <div className="list__container containers list" style={{padding: '3rem', marginBottom:'1rem'}}>
                <div className="section-bottom container w-100" style={{ height: "`100vh`" }}>
                    <img src={imgInfo} alt="cat Image" />
                    <span>
                    Opps!!! <br />
                    {error || "Có vẻ như bạn chưa theo dõi bộ truyện nào."} <br />
                    Đi đến danh sách truyện ngay!!
                    </span>
                    <Link to="/latest">List Truyện</Link>
                </div>
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
            <i className="fa-solid fa-bookmark" style={{ fontSize: "30px", paddingRight: "1rem" }}></i>
            TRUYỆN THEO DÕI
          </h2>
        </div>
        <div className="container w-100">
          <div className="row justify-content-center">
            {following.map((item) => (
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
                      <h6 className="item-title">{item.TenBo}</h6>
                      <div className="item-chapter" style={{ fontSize: "13px" }}>
                        <span className="chap" style={{ marginRight: "10px" }}>
                          {item.EarliestChap?.SttChap
                            ? `chap ${item.EarliestChap.SttChap}`
                            : "chap ..."}
                        </span>
                        <span className="time">
                          {item.EarliestChap?.ThoiGian
                            ? `${item.EarliestChap.ThoiGian} giờ trước`
                            : "... giờ trước"}
                        </span>
                      </div>
                    </figcaption>
                    <button
                      onClick={() => handleUnfollow(item.userId, item.IbBo)}
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

export default Following;
