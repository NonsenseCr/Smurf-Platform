import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBoTruyenByCategory } from "../services/LoaiTruyenService";
import { Link } from "react-router-dom";
import Loader from "../components/Element/Loader";
const ListTypeComics = () => {
  const { id } = useParams(); // Lấy id thể loại từ URL
  const [comics, setComics] = useState([]); // Danh sách truyện
  const [subtitle, setSubtitle] = useState(""); // Tên thể loại
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [isLoading, setIsLoading] = useState(true);
  // Map giữa id và tên thể loại (cố định trong frontend)
  const categoryMap = {
    "67406e4ec03445f4711481f2": "Hành động",
    "67406e8ec03445f4711481f5": "Xuyên không",
    "67406e97c03445f4711481f8": "Adventure",
    "67406ea7c03445f4711481fb": "One short",
    "67406eaec03445f4711481fe": "Sports",
    "67406eb4c03445f471148201": "Truyện màu",
    "67406ebec03445f471148204": "Nhẹ nhàng",
    "67406ec8c03445f471148207": "Kinh dị",
    "67406ed2c03445f47114820a": "Lãng mạng",
    "67406ed8c03445f47114820d": "Action",
    "67406ee0c03445f471148210": "Comedy",
    "67406ee5c03445f471148213": "Manwa",
    "67406eedc03445f471148216": "Manga",
    "67406ef1c03445f471148219": "Comic",
    "67406ef6c03445f47114821c": "Webtoon",
    
  };

  // Hàm load danh sách truyện
  const loadComics = async (page) => {
    setLoading(true);
    try {
      const fetchedComics = await fetchBoTruyenByCategory(id, page);
      setComics(fetchedComics);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching BoTruyen by category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật tên thể loại từ categoryMap
  useEffect(() => {
    setSubtitle(categoryMap[id] || "Không xác định");
  }, [id]);

  // Gọi API để load dữ liệu khi trang hoặc id thay đổi
  useEffect(() => {
    loadComics(currentPage);
  }, [currentPage, id]);

  if (loading) {
    return <Loader isLoading={isLoading} setIsLoading={setIsLoading} />

  }

  if (!comics || comics.length === 0) {
    return <Loader isLoading={isLoading} setIsLoading={setIsLoading} />

  }

  return (
    <div className="main__top ">
      <div className="list__container containers list">
        {/* Tiêu đề và các nút điều khiển */}
        <div className="top__content " style={{padding:'2rem'}}>
          <h2 className="section__subtitle">DANH SÁCH TRUYỆN <span style={{color: "#9858F1"}}>{subtitle}</span></h2>
          <div className="controls">
            <div className="dropdown">
              <button className="btn" type="button">
                <i className="ri-menu-2-fill"></i> STATUS
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link to="/listTruyen" className="dropdown-item">
                    Tất cả
                  </Link>
                </li>
                <li>
                  <Link to="/listTruyenTT/1" className="dropdown-item">
                    Hoàn thành
                  </Link>
                </li>
                <li>
                  <Link to="/listTruyenTT/0" className="dropdown-item">
                    Đang tiến hành
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn" type="button">
                <i className="ri-equalizer-2-line"></i> FILTER
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{ maxHeight: "150px" }}>
                <li>
                  <Link to="#" className="dropdown-item">
                    Theo thời gian
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    View
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item">
                    Đánh giá
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hiển thị danh sách truyện */}
        <div className="container w-100">
          <div className="row justify-content-center">
            {comics.map((comic) => (
              <div key={comic._id} className="item col-2 update-item">
                <Link to={`/comic/${comic._id}`}>
                  <figure className="position-relative">
                    {comic.poster  && (
                      <>
                        <span className="hot-icon">HOT</span>
                        <img
                          loading="lazy"
                          src={`http://localhost:5000${comic.poster}`}
                          alt={comic.tenbo}
                          className="d-block w-100 poster"
                          onError={(e) => {
                            e.target.onerror = null; // Ngăn lỗi lặp lại
                            e.target.src = "/path/to/default-image.jpg"; // Ảnh mặc định
                          }}
                        />
                      </>
                    )}
                    <figcaption>
                      <h6 className="item-title">{comic.tenbo}</h6>
                      <div className="item-chapter" style={{ fontSize: "13px" }}>
                        <span className="chap" style={{ marginRight: "10px" }}>
                          {comic.latestChapter?.SttChap
                            ? `chap ${comic.latestChapter.SttChap}`
                            : "chap ..."}
                        </span>
                        <span className="time">
                          {comic.latestChapter?.ThoiGian
                            ? `${comic.latestChapter.ThoiGian} giờ trước`
                            : "... giờ trước"}
                        </span>
                      </div>
                    </figcaption>
                    {comic.TtPemium && (
                      <div className="item-vip">
                        <i className="fa-solid fa-crown"></i>
                      </div>
                    )}
                  </figure>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Điều khiển phân trang */}
        <ul className="listPage">
          <li>
            <a
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </a>
          </li>
          <li>
            <span>
              {currentPage} 
              {/* Trang {currentPage} / {totalPages} */}
            </span>
          </li>
          <li>
            <a
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListTypeComics;
