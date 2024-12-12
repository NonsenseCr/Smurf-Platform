import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchBoTruyenById,
  followComic,
  unfollowComic,
  checkPremiumAccess,
  fetchChaptersByComicId,
} from "../../services/BoTruyenServices";
import iconPremium from "../../assets/PreDark.png";
import Loader from "../../components/Element/Loader";
const CtBoTruyen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [boTruyen, setBoTruyen] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [userTickets, setUserTickets] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [rating, setRating] = useState(null);
  const [contentExpanded, setContentExpanded] = useState(false);

  

  const userId = "123"; // Giả lập userId (thay thế bằng logic thực tế)

  useEffect(() => {
    const loadBoTruyen = async () => {
      try {
        const data = await fetchBoTruyenById(id);
        setBoTruyen(data);
        setFollowed(data.followed);
        setUserTickets(data.userTickets || 0);
        setIsPremium(data.isPremium || false);
        setRating(data.danhgia || 0);

        const chaptersData = await fetchChaptersByComicId(id);
        setChapters(chaptersData);
      } catch (error) {
        console.error("Error loading BoTruyen:", error);
      }
    };

    loadBoTruyen();
  }, [id]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await unfollowComic(id, userId);
        setFollowed(false);
        Swal.fire("Thành công", "Bạn đã hủy theo dõi bộ truyện.", "success");
      } else {
        await followComic(id, userId);
        setFollowed(true);
        Swal.fire("Thành công", "Bạn đã theo dõi bộ truyện.", "success");
      }
    } catch (error) {
      Swal.fire("Lỗi", "Không thể cập nhật trạng thái theo dõi.", error);
    }
  };

  const handleReadChapter = async (chapter) => {
    try {
      const hasAccess = await checkPremiumAccess(
        chapter._id,
        userId,
        isPremium,
        userTickets,
        chapter.ticket_cost
      );
      if (hasAccess) {
        navigate(`/chapter/${chapter._id}`);
      } else {
        Swal.fire(
          "Thông báo",
          "Bạn cần mua vé hoặc nâng cấp tài khoản Premium để đọc chương này.",
          "warning"
        );
      }
    } catch (error) {
      Swal.fire("Lỗi", "Không thể mở chương truyện.", error);
    }
  };

  const toggleContent = () => setContentExpanded(!contentExpanded);

  //   const calculateTimeAgo = (time) => {
  //     const diff = Date.now() - new Date(time).getTime();
  //     const hours = Math.floor(diff / (1000 * 60 * 60));
  //     return hours > 0 ? `${hours} giờ trước` : "... giờ trước";
  //   };

  const handleChapterClick = (id_bo, stt_chap) => {
    navigate(`/chapter/${id_bo}/${stt_chap}`);
  };
  const [isLoading, setIsLoading] = useState(true);
  if (!boTruyen) {
    return <Loader isLoading={isLoading} setIsLoading={setIsLoading} />
    
  }

  return (
    <div className="main__top containers">
      <div className="detail__container ">
        {/* Phần thông tin chính */}
        <div className="detail__infor ">
          <div className="bg__detail">
            <div className="bg">
              {boTruyen.banner && (
                <img
                  src={`http://localhost:5000${boTruyen.banner}`}
                  alt="bg-item"
                  className="bg-main"
                />
              )}
              <div className=" bg__detail-infor">
                <div className="infor">
                  <div className="pre">
                    <img src={iconPremium} alt="Gói Premium" />
                  </div>
                  <h3 className="item-title">{boTruyen.tenbo}</h3>
                  <div className="rating">
                    {[...Array(5)].map((_, idx) => (
                      <i
                        key={idx}
                        className={`ri-star-fill ${idx < rating ? "active" : ""}`}
                        style={idx < rating ? { color: "#FAB818" } : {}}
                      />
                    ))}
                    <hr />
                    <span className="rating-review">
                      Average Rating: {rating} ({boTruyen.TongLuotXem || 0} Views)
                    </span>
                    <hr />
                  </div>
                  <div className="author-title">
                    Author: <span>{boTruyen.tacgia}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="background-item"></div>
            <div className="poster-detail">
              {chapters.length > 0 ? (
                <div className="background-detail">
                  <div className="bg-item"></div>
                  <a className="btn-read" onClick={() => navigate(`/chapter/${chapters[0]._id}`)}>
                    <i className="ri-book-open-fill" title="Click to Read"></i>
                  </a>
                </div>
              ) : (
                <div className="background-detail">
                  <div className="bg-item"></div>
                </div>
              )}
              {boTruyen.poster && (
                <img
                  src={`http://localhost:5000${boTruyen.poster}`}
                  alt="Poster"
                  style={{ maxWidth: "224px", maxHeight: "336px", objectFit: "scale-down" }}
                />
              )}
            </div>
          </div>


          {/* Poster và nút đọc */}

        </div>

        {/* Nội dung chính */}
        <div className="content-detail">
          <div className="time-detail">
            <i className="ri-time-line"></i>
            {boTruyen.latestChapter ? (
              <span className="time">{boTruyen.latestChapter.ThoiGian}</span>
            ) : (
              <span className="time">NaN</span>
            )}
          </div>
          <div className="type-detail">
            {boTruyen.listloai?.map((genre, index) => (
              <a
                key={index}
                href={`/genre/${genre.id}`}
                className="item-type"
              >
                {genre.ten_loai}
              </a>
            ))}
          </div>
          {/* Nút thao tác */}
          <div className="btn-detail">
            <div className="btn__follow">
              {followed ? (
                <a
                  className="btn-follow"
                  // style={{ backgroundColor: "#FE0000", borderRadius: "5px" }}
                  onClick={handleFollow}
                >
                  <i className="ri-close-fill"></i>
                  <span>HỦY THEO DÕI</span>
                </a>
              ) : (
                <a
                  className="btn-follow"
                  // style={{ backgroundColor: "#8f8f8f", color: "#fff" }}
                  onClick={handleFollow}
                >
                  <i className="fa-solid fa-heart"></i>
                  <span> THEO DÕI</span>
                </a>
              )}
            </div>

            <div className="btn-follow">
              {chapters.length > 0 && (
                <a
                  className="btn__action"
                  style={{
                    // pointerEvents: isPremium || userTickets >= 1 ? "auto" : "none",
                    // backgroundColor:
                    //   isPremium || userTickets > 0 ? "#007BFF" : "#8f8f8f",
                  }}
                  onClick={handleReadChapter}
                >
                  Đọc tiếp chap{" "}
                  <span className="chapter">{chapters[0]?.stt || "N/A"}</span>
                </a>
              )}
            </div>
            <div className="btn-follow">
              {chapters.length > 0 && (
                <a
                  className="btn__action"
                  style={{
                    // pointerEvents: isPremium || userTickets > 1 ? "auto" : "none",
                    // backgroundColor:
                    //   isPremium || userTickets > 0 ? "#007BFF" : "#8f8f8f",
                  }}
                  onClick={handleReadChapter}
                >
                  Đọc mới nhất{" "}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={`content-main ${contentExpanded ? "active-content" : ""}`}>
          <div className="content-title">
            <i className="ri-file-text-line"></i> Nội dung
          </div>
          <div className="content">
            <p>{boTruyen.mota || "Không có nội dung mô tả"}</p>
          </div>
          <div className="content-More">
            <div className="content-title">
              <i className="fa-solid fa-circle-info"></i> Thông tin thêm
            </div>
            <div className="content">
              <div className="chapter">
                <i className="fa-solid fa-user-pen"></i> Tác giả:{" "}
                <span className="count">{boTruyen.tacgia || "Không rõ"}</span>
              </div>
              <div className="chapter">
                <i className="ri-send-plane-fill"></i>
                <span className="count">{chapters.length || 0}</span> Chương đã đăng
              </div>
              <div className="view">
                <i className="ri-eye-line"></i>
                <span className="count">{boTruyen.tongLuotXem || 0}</span> Lượt xem
              </div>
              <div className="review">
                <i className="ri-message-2-fill"></i>
                <span className="count">{boTruyen.theodoi || 0}</span> Theo Dõi
              </div>
            </div>
            <div className="content-close" onClick={toggleContent}>
              {contentExpanded ? "Thu gọn" : "Xem thêm"}
            </div>
          </div>
        </div>

        {/* Danh sách chương */}
        {/* <div className="detail__list">
          <div className="content-title">
            <i className="fa-solid fa-list"></i> DANH SÁCH CHƯƠNG TRUYỆN
          </div>
          <div className="chapter-list">
            {chapters.map((chapter) => (
              <div key={chapter._id} className="chapter-item">
                <div className="row">
                  <div className="col chapter chap-col">Chương {chapter.sttChap}</div>
                  <div className="col-6 content chap-col">{chapter.tenChap}</div>
                  <div className="col time chap-col">{chapter.thoiGian}</div>
                  <div className="col view chap-col">{chapter.tkLuotXem} lượt xem</div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="detail__list">
          <div className="content-title">
            <i className="fa-solid fa-list"></i> DANH SÁCH CHƯƠNG TRUYỆN
          </div>
          <div className="chapter-list">
            {chapters.length > 0 ? (
              chapters.map((chapter) => (
                <div
                  key={chapter._id}
                  className="chapter-item"
                  onClick={() => handleChapterClick(boTruyen._id, chapter.stt_chap)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="row">
                    <div className="col chapter chap-col">Chương {chapter.stt_chap}</div>
                    <div className="col-6 content chap-col">{chapter.ten_chap}</div>
                    <div className="col time chap-col">
                      {new Date(chapter.thoi_gian).toLocaleDateString()}
                    </div>
                    <div className="col view chap-col">
                      {chapter.tk_luotxem || 0} lượt xem
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Không có chương nào.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtBoTruyen;
