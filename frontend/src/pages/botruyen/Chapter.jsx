import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import iconPremium from "../../assets/PreDark.png";
import {
  followComic,
  unfollowComic,
  findCTBoTruyen,
  fetchChaptersByComicId,
} from "../../services/BoTruyenServices";


const Chapter = () => {
  const { id_bo, stt_chap } = useParams(); // Lấy tham số từ URL
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true); // Kiểm tra hiển thị thanh điều khiển
  const [scrollPosition, setScrollPosition] = useState(0);

  const [chapterDetails, setChapterDetails] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState({});
  const [prevChapter, setPrevChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  // const [allChapters, setAllChapters] = useState([]); 

  // State người dùng
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userName, setUserName] = useState("Guest");
  // const [userAvatar, setUserAvatar] = useState("");
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > scrollPosition) {
        setIsVisible(false); // Ẩn nếu cuộn xuống
      } else {
        setIsVisible(true); // Hiển thị nếu cuộn lên
      }
      setScrollPosition(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);


  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUser = JSON.parse(userDataFromStorage);
      setUser(parsedUser); // Lưu thông tin user vào state
      setIsAuthenticated(true); // Đánh dấu trạng thái đăng nhập
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
      const chaptersData = await fetchChaptersByComicId(id_bo);
      setChapters(chaptersData);

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
  useEffect(() => {
    const fetchCTBoTruyen = async () => {
      try {
        if (!id_bo || !user?.id) return;

        const result = await findCTBoTruyen(id_bo, user.id);
        if (result && result.data) {
          setFollowed(result.data.theodoi || false);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin CTBoTruyen:", error.message);
      }
    };

    fetchCTBoTruyen();
  }, [id_bo, user]);

  const handlePremiumClick = (chap) => {
    if (!user || isAuthenticated) {
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
        text: `Chương này yêu cầu ${chap.ticket_cost} vé. Bạn cần mua vé hoặc nâng cấp tài khoản để đọc chương này!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: chap.ticket_cost > 0 ? "Mua vé" : "Nâng cấp",
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

  // Hàm handleFollow tích hợp với API follow/unfollow
  const handleFollow = async () => {
    try {
      if (followed) {
        const response = await unfollowComic(id_bo, user.id);
        console.log("unfollowComic", response);
        if (response.success) {
          setFollowed(false);
        }

      } else {
        const response = await followComic(id_bo, user.id);
        console.log("response", response);
        if (response.success) {
          setFollowed(true);
        }
      }
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái theo dõi:", error.message);
      Swal.fire("Lỗi", "Không thể cập nhật trạng thái theo dõi.", "error");
    }
  };
  const handleNavigationWithPremiumCheck = (chap) => {
    if (chap.premium) {
      handlePremiumClick(chap);
    } else {
      handleNavigation(chap.stt_chap);
    }
  };
  useEffect(() => {
    fetchChapterDetails();
    fetchChapterInfo();
  }, [id_bo, stt_chap]);

  // useEffect(() => {
  //   fetchAllChapters();
  // }, [id_bo]);

  return (
    <div className="reading">
      <div className="reading__container">
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
      <div className={`control ${isVisible ? "visible" : "hidden"}`} id="control">
        {/* Nút về trang chủ */}
        <a href="/" className="btn-home">
          <i className="fa-solid fa-house"></i>
        </a>

        {/* Nút về danh sách truyện */}
        <a href={`/comic/${id_bo}`} className="btn-home">
          <i className="fa-solid fa-bars"></i>
        </a>

        {/* Nút chương trước */}
        {prevChapter ? (
          <a
            className="btn-prev"
            onClick={() => handleNavigationWithPremiumCheck(prevChapter)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </a>
        ) : (
          <a className="btn-prev" disabled style={{ backgroundColor: "#8f8f8f" }}>
            <i className="fa-solid fa-angle-left"></i>
          </a>
        )}

        {/* Dropdown danh sách chương */}
        <div className="dropdown dropdown-chapter">
          <a className="btn dropdown-btn" data-bs-toggle="dropdown" aria-expanded="false">
            Chap {stt_chap} <i className="ri-arrow-down-s-line"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-chap">
            {chapters.map((chap) => (
              <li key={chap._id}>
                <a
                  className={`dropdown-item ${chap.premium ? "premium-chap" : ""}`}
                  onClick={() => handlePremiumClick(chap)}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    Chap {chap.stt_chap} - {chap.ten_chap}
                  </span>
                  {chap.premium && (
                    <img
                      style={{ width: "40px", height: "15px", marginLeft: "10px" }}
                      src={iconPremium}
                      alt="Premium"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nút chương tiếp theo */}
        {nextChapter ? (
          <a
            className="btn-next"
            onClick={() => handleNavigationWithPremiumCheck(nextChapter)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </a>
        ) : (
          <a className="btn-next" style={{ backgroundColor: "#8f8f8f" }}>
            <i className="fa-solid fa-angle-right"></i>
          </a>
        )}

        {/* Nút theo dõi hoặc hủy theo dõi */}
        {followed ? (
          <a className="btn-unfollow" onClick={handleFollow}>
            <i className="ri-close-fill"></i>
            <span>Hủy Theo Dõi</span>
          </a>
        ) : (
          <a className="btn-follow" onClick={handleFollow}>
            <i className="fa-solid fa-heart"></i>
            <span>Theo Dõi</span>
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