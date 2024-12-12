import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Chapter = () => {
    const { id_bo, stt_chap } = useParams(); // Lấy tham số từ URL
  const navigate = useNavigate();

  const [chapterDetails, setChapterDetails] = useState([]);
  const [currentChapter, setCurrentChapter] = useState({});
  const [prevChapter, setPrevChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [allChapters, setAllChapters] = useState([]); // Đảm bảo giá trị mặc định là mảng rỗng

  // State người dùng
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [userAvatar, setUserAvatar] = useState("");

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    // Kiểm tra dữ liệu từ URL
    const params = new URLSearchParams(window.location.search);
    const userDataFromParams = params.get("user");
    if (userDataFromParams) {
      const parsedUser = JSON.parse(decodeURIComponent(userDataFromParams));
      localStorage.setItem("user", JSON.stringify(parsedUser));
      setUser(parsedUser);
      setIsAuthenticated(true);
      setUserName(parsedUser.username);
      setUserAvatar(parsedUser.avatar);

      // Xóa thông tin từ URL
      window.history.replaceState({}, document.title, "/");
      return;
    }

    // Kiểm tra dữ liệu từ localStorage
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUser = JSON.parse(userDataFromStorage);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setUserName(parsedUser.username);
      setUserAvatar(parsedUser.avatar);
    }
  }, []);

  // Lấy chi tiết chương
  const fetchChapterDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/ctchapter/by-chapter/${id_bo}/${stt_chap}`
      );
      const data = response.data;

      setChapterDetails(data.chi_tiet || []); // Danh sách chi tiết các trang
      setCurrentChapter((prev) => ({
        ...prev,
        ten_bo: data.ten_bo,
        ten_chap: data.ten_chap,
        thoi_gian: data.thoi_gian,
        luot_xem: data.luot_xem,
      }));
    } catch (error) {
      console.error("Error fetching chapter details:", error);
      Swal.fire("Lỗi", "Không thể tải thông tin chi tiết chương", "error");
    }
  };

  // Lấy thông tin chương hiện tại, chương trước, và chương tiếp theo
  const fetchChapterInfo = async () => {
    try {
      const response = await axios.get(`/chapter/${id_bo}`);
      const chapters = Array.isArray(response.data) ? response.data : []; // Đảm bảo là mảng

      const current = chapters.find((c) => c.stt_chap === parseInt(stt_chap));
      const prev = chapters.find((c) => c.stt_chap === parseInt(stt_chap) - 1);
      const next = chapters.find((c) => c.stt_chap === parseInt(stt_chap) + 1);

      setCurrentChapter((prev) => ({
        ...prev,
        ...current, // Kết hợp thông tin từ API
      }));
      setPrevChapter(prev || null);
      setNextChapter(next || null);
    } catch (error) {
      console.error("Error fetching chapter info:", error);
      Swal.fire("Lỗi", "Không thể tải thông tin chương", "error");
    }
  };

  const fetchAllChapters = async () => {
    try {
      const response = await axios.get(`/chapter/${id_bo}`);
      const chapters = Array.isArray(response.data) ? response.data : []; // Đảm bảo dữ liệu là mảng
      setAllChapters(chapters);
    } catch (error) {
      console.error("Error fetching all chapters:", error);
      setAllChapters([]); // Đặt về mảng rỗng nếu xảy ra lỗi
    }
  };

  const handlePremiumClick = (chap) => {
    if (!user) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn cần đăng nhập để đọc nội dung này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else if (!user.isPremium && user.tickets < chap.ticket_cost) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn cần mua vé hoặc nâng cấp tài khoản để đọc chương này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Mua vé",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/payment");
        }
      });
    } else {
      handleNavigation(chap.stt_chap);
    }
  };

  // Điều hướng đến chương mới
  const handleNavigation = (newSttChap) => {
    if (newSttChap) {
      navigate(`/chapter/${id_bo}/${newSttChap}`);
    } else {
      Swal.fire("Thông báo", "Chương không hợp lệ", "warning");
    }
  };

  const handleFollow = async () => {
    if (!user) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn cần đăng nhập để theo dõi bộ truyện!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/follow/${id_bo}`, {
        userId: user.id,
      });
      if (response.data.success) {
        Swal.fire("Thành công", "Bạn đã theo dõi bộ truyện!", "success");
        setUser((prev) => ({ ...prev, isFollowing: true })); // Cập nhật trạng thái user
      }
    } catch (error) {
      console.error("Error following:", error);
      Swal.fire("Lỗi", "Không thể theo dõi bộ truyện.", "error");
    }
  };
  const handleUnfollow = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/unfollow/${id_bo}`, {
        userId: user.id,
      });
      if (response.data.success) {
        Swal.fire("Thành công", "Bạn đã hủy theo dõi bộ truyện!", "success");
        setUser((prev) => ({ ...prev, isFollowing: false })); // Cập nhật trạng thái user
      }
    } catch (error) {
      console.error("Error unfollowing:", error);
      Swal.fire("Lỗi", "Không thể hủy theo dõi bộ truyện.", "error");
    }
  };

  useEffect(() => {
    fetchChapterDetails();
    fetchChapterInfo();
  }, [id_bo, stt_chap]);

  useEffect(() => {
    fetchAllChapters();
  }, [id_bo]);
    return (
        <div className="reading containers">
            <div className="reading__container ">
                <div className="links">
                    <a className="home" href="/">
                        <i className="ri-home-4-fill"></i> Trang chủ
                    </a>{" "}
                    /{" "}
                    <a href={`/comic/${id_bo}`} className="truyen">
                        {currentChapter.ten_bo || "Tên bộ truyện"}
                    </a>{" "}
                    /{" "}
                    <a href={`/chapter/${id_bo}/${stt_chap}`} className="chapter">
                        Chap {stt_chap}
                    </a>
                </div>

                <div className="infor">
                    <div className="detail">
                        <h3 className="name">
                            {currentChapter.ten_chap || "Chương"} - chap {stt_chap}
                        </h3>
                    </div>
                    <span className="time">
                        Cập nhật lúc:{" "}
                        {currentChapter.thoi_gian
                            ? new Date(currentChapter.thoi_gian).toLocaleString()
                            : "N/A"}
                    </span>
                    <h4 className="note">Nội dung: {currentChapter.ten_chap}</h4>
                    <div className="btn__error">
                        <a href="/contact" className="error">
                            Báo lỗi
                        </a>
                    </div>
                </div>
            </div>
            <div className="control" id="control">
                {/* Nút về trang chủ */}
                <a href="/" className="btn-home">
                    <i className="fa-solid fa-house"></i>
                </a>

                {/* Nút về danh sách truyện */}
                <a href={`/botruyen/${id_bo}`} className="btn-home">
                    <i className="fa-solid fa-bars"></i>
                </a>

                {/* Nút chương trước */}
                {prevChapter ? (
                    <a className="btn-prev" onClick={() => handleNavigation(prevChapter.stt_chap)}>
                        <i className="ri-arrow-left-s-line"></i>
                    </a>
                ) : (
                    <a className="btn-prev" disabled style={{ backgroundColor: "#8f8f8f" }}>
                        <i className="ri-arrow-left-s-line"></i>
                    </a>
                )}

                {/* Dropdown danh sách chương */}
                <div className="dropdown dropdown-chapter">
                    <a className="btn dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
                        Chap {stt_chap} <i className="ri-arrow-down-s-line"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-chap">
                        {allChapters.map((chap) => (
                            <li key={chap.stt_chap}>
                                {chap.premium ? (
                                    <a
                                        className="dropdown-item premium-chap"
                                      onClick={() => handlePremiumClick(chap)}
                                    >
                                        Chap {chap.stt_chap} - {chap.ten_chap}
                                        <img
                                            style={{ width: "40px", height: "15px", borderRadius: "0" }}
                                            src="/images/predark.png"
                                            alt="Premium"
                                        />
                                    </a>
                                ) : (
                                    <a
                                        className="dropdown-item"
                                        onClick={() => handleNavigation(chap.stt_chap)}
                                    >
                                        Chap {chap.stt_chap} - {chap.ten_chap}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Nút chương tiếp theo */}
                {nextChapter ? (
                    <button className="btn-next" onClick={() => handleNavigation(nextChapter.stt_chap)}>
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                ) : (
                    <button className="btn-next" disabled style={{ backgroundColor: "#8f8f8f" }}>
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                )}
                {/* Nút follow */}
  {user?.isFollowing ? (
    <a
      id="btn-unfollow"
      className="btn-follow"
      style={{ backgroundColor: "#FE0000", padding: ".3rem .5rem", borderRadius: "3px" }}
      onClick={() => handleUnfollow()}
    >
      <i className="ri-close-fill"></i>
      <span>Hủy Theo dõi</span>
    </a>
  ) : (
    <a
      id="btn-follow"
      className="btn-follow"
      onClick={() => handleFollow()}
    >
      <i className="fa-solid fa-heart"></i>
      <span>Theo dõi</span>
    </a>
  )}
            </div>


            <div className="reading-detail ">
                {chapterDetails.length > 0 ? (
                    chapterDetails.map((page, index) => (
                        <div key={index} className="page-chapter">
                            <img
                                loading="lazy"
                                src={`http://localhost:5000${page.anh_trang}`}
                                alt={`Trang ${page.so_trang}`}
                            />
                        </div>
                    ))
                ) : (
                    <div>Không có hình ảnh cho chương này.</div>
                )}
            </div>

            <div className="control p-3 mt-4" style={{ gap: "1.2rem" }}>
                {prevChapter ? (
                    <a
                        className="btn-prev"
                        onClick={() => handleNavigation(prevChapter.stt_chap)}
                    >
                        <i className="ri-arrow-left-s-line"></i> Previous
                    </a>
                ) : (
                    <a
                        className="btn-prev"
                        style={{ backgroundColor: "#8f8f8f", color: "#000", pointerEvents: "none" }}
                    >
                        <i className="ri-arrow-left-s-line"></i> Previous
                    </a>
                )}
                {nextChapter ? (
                    <a
                        className="btn-next"
                        onClick={() => handleNavigation(nextChapter.stt_chap)}
                    >
                        <i className="ri-arrow-right-s-line"></i> Next
                    </a>
                ) : (
                    <a
                        className="btn-next"
                        style={{ backgroundColor: "#8f8f8f", color: "#000", pointerEvents: "none" }}
                    >
                        <i className="ri-arrow-right-s-line"></i> Next
                    </a>
                )}
            </div>
        </div>
    );
};

export default Chapter;
