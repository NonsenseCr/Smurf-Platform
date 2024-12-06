import { useEffect, useState, useCallback, useMemo } from "react";
import { Row, Col, message } from "antd";
import { fetchActiveBoTruyen } from "@/services/BoTruyenServices";
import "@/area-manager/styles/comics-grid.css";

const ComicsGrid = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComics = useCallback(async () => {
    try {
      const data = await fetchActiveBoTruyen();
      setComics(data);
    } catch {
      message.error("Lỗi khi tải danh sách bộ truyện!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComics();
  }, [fetchComics]);

  const latestComics = useMemo(() => {
    return comics.slice(-30).reverse(); // Lấy 30 bộ truyện từ dưới lên
  }, [comics]);

  if (loading) {
    return <div className="loading-container">Đang tải danh sách bộ truyện...</div>;
  }

  return (
    <div className="comics-grid-container">
      <Row gutter={[16, 16]}>
        {latestComics.map((comic) => (
          <Col key={comic._id} xs={24} sm={12} md={8} lg={4}>
            <a
              href={
                comic.premium
                  ? `/manager/comic-index/comic/premium/${comic._id}`
                  : `/manager/comic-index/comic/${comic._id}`
              }
              className={`comic-card-link ${comic.active ? "active" : "inactive"}`}
            >
              <div
                className="comic-card"
                style={{
                  backgroundImage: `url(http://localhost:5000${comic.poster})`,
                }}
              >
                <div className="comic-card-info">
                  <h3 className="comic-title">{comic.tenbo}</h3>
                  <p className="comic-meta">
                    Lượt xem: {comic.TongLuotXem}{" "}
                    {comic.premium && <span className="premium-tag">Premium</span>}
                  </p>
                  <p className="comic-status">
                    Trạng thái:{" "}
                    <span
                      className={`comic-status-tag ${
                        comic.trangthai === "hoat_dong"
                          ? "active-status"
                          : comic.trangthai === "tam_ngung"
                          ? "paused-status"
                          : "completed-status"
                      }`}
                    >
                      {comic.trangthai}
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ComicsGrid;
