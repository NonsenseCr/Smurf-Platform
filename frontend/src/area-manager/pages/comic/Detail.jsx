import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBoTruyenById, fetchChaptersByComicId } from "@/services/BoTruyenServices";
import { Button, Select, message, Table, Tag, Row, Col } from "antd";
import { updateComicStats } from "@/area-manager/services/comicService";
import "@/area-manager/styles/comic-detail.css";
import AddChapter from "../../../area-manager/pages/comic/chapter/Add";
// Import HOC withPermission
import withPermission from "@/area-manager/withPermission";
const { Option } = Select;

const buildImageUrl = (poster) => {
  // Kiểm tra nếu đường dẫn đã là một URL đầy đủ
  if (/^https?:\/\//.test(poster)) {
    return poster; // Trả về URL đầy đủ
  }
  // Nếu không, thêm domain localhost
  return `http://localhost:5000${poster}`;
};

const Detail = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isAddChapterVisible, setIsAddChapterVisible] = useState(false);
  useEffect(() => {
    const fetchComic = async () => {
      try {
        const data = await fetchBoTruyenById(id);
        setComic(data);
        const chaptersData = await fetchChaptersByComicId(id);
        setChapters(chaptersData);
      } catch {
        message.error("Không thể tải thông tin chi tiết!");
      }
    };
    fetchComic();
  }, [id]);

  if (!comic) {
    return <div>Đang tải...</div>;
  }
  const handleAddChapter = () => {
    setIsAddChapterVisible(true); // Mở popup
    message.info("Thêm chương mới");
  };
  const handleAddChapterClose = () => {
    setIsAddChapterVisible(false); // Đóng popup
    // Làm mới danh sách chương sau khi thêm thành công
    fetchChaptersByComicId(id).then(setChapters).catch(() => {
      message.error("Không thể làm mới danh sách chương!");
    });
  };
  const handleDemoRead = (id) => {
    // Điều hướng đến trang demo đọc
    window.location.href = `/manager/comic/comic-index/comic-detail/chapter-detail/demo-reading-mode-view/${id}`;
  };
  

  const handleToggleActive = async () => {
    try {
      const newActiveState = !comic.active;
      await updateComicStats(comic._id, { active: newActiveState });
      setComic({ ...comic, active: newActiveState });
      message.success(`Trạng thái được chuyển thành: ${newActiveState ? "Active" : "UnActive"}`);
    } catch {
      message.error("Không thể cập nhật trạng thái!");
    }
  };

  const handleActivatePremium = async () => {
    try {
      const newPremiumState = !comic.premium;
      await updateComicStats(comic._id, { premium: newPremiumState });
      setComic({ ...comic, premium: newPremiumState });
      message.success(`Premium ${newPremiumState ? "đã được kích hoạt" : "đã bị hủy"}`);
    } catch {
      message.error("Không thể cập nhật trạng thái premium!");
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "stt_chap",
      key: "stt_chap",
    },
    {
      title: "Tên Chương",
      dataIndex: "ten_chap",
      key: "ten_chap",
    },
    {
      title: "Tổng Số Trang",
      dataIndex: "content",
      key: "content",
      render: (content) => `${content?.length || 0} trang`,
    },
    {
      title: "Ngày Đăng",
      dataIndex: "thoi_gian",
      key: "thoi_gian",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Demo Read",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleDemoRead(record._id)}
        >
          Demo Read
        </Button>
      ),
    },
  ];

  return (
    <div className="comic-detail-container">
      <div className="header-section">
        <h2 className="section-title">
          {comic.tenbo} <span className="comic-id">ID: {comic._id}</span>
        </h2>
        <div className="timestamps">
          <Tag color="blue">Created: {new Date(comic.createdAt).toLocaleDateString()}</Tag>
          <Tag color="green">Updated: {new Date(comic.updatedAt).toLocaleDateString()}</Tag>
        </div>
      </div>
      <hr className="line" />

      <Row gutter={[20, 16]} align="middle">
        <Col span={8} style={{ position: "relative" }}>
          <div className="image-container">
            <div
              className="comic-poster"
              style={{
                width: "250px",
                height: "330px",
                backgroundImage: `url(${buildImageUrl(comic.poster)})`,
                backgroundSize: "cover",
                borderRadius: "5px",
                position: "relative",
              }}
            />
            <div className="image-tag">Poster</div>
          </div>
        </Col>
        <Col span={8} style={{ position: "relative", marginLeft: "20px" }}>
          <div className="image-container">
            <div
              className="comic-banner"
              style={{
                width: "750px",
                height: "330px",
                backgroundImage: `url(${buildImageUrl(comic.banner)})`,
                backgroundSize: "cover",
                borderRadius: "5px",
                position: "relative",
              }}
            />
            <div className="image-tag">Banner</div>
          </div>
        </Col>
        <Col span={8} style={{ marginLeft: "40px" }}>
          <div className="stats-section">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <span>Trạng thái:</span>
              </Col>
              <Col span={12}>
                <Select
                  defaultValue={comic.trangthai}
                  onChange={async (value) => {
                    try {
                      await updateComicStats(comic._id, { trangthai: value });
                      setComic({ ...comic, trangthai: value });
                      message.success(`Trạng thái được chuyển thành: ${value}`);
                    } catch {
                      message.error("Không thể cập nhật trạng thái!");
                    }
                  }}
                  style={{ width: "150px" }}
                >
                  <Option value="hoat_dong">Hoạt động</Option>
                  <Option value="tam_ngung">Tạm ngừng</Option>
                  <Option value="hoan_thanh">Hoàn thành</Option>
                </Select>
              </Col>
              <Col span={12}>
                <span>Premium:</span>
              </Col>
              <Col span={12}>
                <Button onClick={handleActivatePremium} className="toggle-btn">
                  {comic.premium ? "Hủy Premium" : "Kích Hoạt Premium"}
                </Button>
              </Col>
              <Col span={12}>
                <span>Hoạt động:</span>
              </Col>
              <Col span={12}>
                <Button onClick={handleToggleActive} className="toggle-btn">
                  {comic.active ? "UnActive" : "Active"}
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <hr className="line purple-line" />
      <div className="metadata-section">
        <div className="metadata-item">
          <span className="metadata-icon">👁️</span> Tổng View: {comic.TongLuotXem}
        </div>
        <div className="metadata-item">
          <span className="metadata-icon">👤</span> Tổng Follow: {comic.theodoi}
        </div>
        <div className="metadata-item">
          <span className="metadata-icon">⭐</span> Điểm số: {comic.danhgia}/10
        </div>
        <div className="metadata-item">
          <span className="metadata-icon">🖊️</span> Tác giả: {comic.id_tg?.ten_tg || "Không rõ"}
        </div>
        <div className="genres-list">
  {comic.listloai && comic.listloai.length > 0 ? (
    comic.listloai.map((listloai) => {
      const colors = ["#1B5E20", "#B71C1C", "#263238", "#4A148C", "#00695C"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return (
        <Tag key={listloai._id} style={{ backgroundColor: randomColor, color: "#fff" }}>
          {listloai.ten_loai || "Không rõ"}
        </Tag>
      );
    })
  ) : (
    <span>Không có thể loại</span>
  )}
</div>

      </div>

      <div className="description-section">
        <p>{comic.mota || "Chưa có mô tả"}</p>
      </div>

      <div className="chapters-section">
        <h3>Danh Sách Chương</h3>
        <Table
          dataSource={chapters}
          columns={columns}
          pagination={false}
          rowKey={(record) => record._id}
        />
      </div>

      <Button
        type="primary"
        onClick={handleAddChapter}
        className="floating-add-button"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        Thêm Chương
      </Button>
      <AddChapter
        visible={isAddChapterVisible}
        onClose={handleAddChapterClose}
        comicId={comic._id}
      />
    
    </div>
  );
};

export default withPermission(Detail, 17);
