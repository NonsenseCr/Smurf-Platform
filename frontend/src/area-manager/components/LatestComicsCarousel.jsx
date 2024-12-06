import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LatestComicsCarousel = ({ comics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh
  useEffect(() => {
    if (Array.isArray(comics) && comics.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % comics.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [comics]);

  // Kiểm tra dữ liệu trước khi render
  const hasNoData = !Array.isArray(comics) || comics.length === 0;

  return (
    <div className="latest-comics-carousel">
      <h2>BỘ TRUYỆN MỚI NHẤT</h2>
      {hasNoData ? (
        <div className="carousel-error">Không có dữ liệu để hiển thị</div>
      ) : (
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? comics.length - 1 : prevIndex - 1))}>
            &lt;
          </button>
          <div className="carousel-item">
            <img
              src={comics[currentIndex]?.poster}
              alt={comics[currentIndex]?.tenbo}
              className="carousel-image"
            />
            <div className="comic-info">
              <h3>{comics[currentIndex]?.tenbo?.toUpperCase()}</h3>
              <p>CHAPTER {comics[currentIndex]?.chapter || "Mới"}</p>
              <p>
                Ngày đăng:{" "}
                {new Date(comics[currentIndex]?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button className="carousel-button next" onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % comics.length)}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

LatestComicsCarousel.propTypes = {
  comics: PropTypes.arrayOf(
    PropTypes.shape({
      poster: PropTypes.string,
      tenbo: PropTypes.string,
      chapter: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ).isRequired,
};

export default LatestComicsCarousel;
