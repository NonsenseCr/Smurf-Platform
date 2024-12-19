import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBoTruyenById, fetchChaptersByComicId } from "@/services/BoTruyenServices";
import { Button, Select, message, Table, Tag, Row, Col, Switch } from "antd";
import { updateComicStats } from "@/area-manager/services/comicService";
import "@/area-manager/styles/comic-detail.css";
import AddChapter from "../../../area-manager/pages/comic/chapter/Add";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const buildImageUrl = (poster) => {
  if (/^https?:\/\//.test(poster)) {
    return poster;
  }
  return `http://localhost:5000${poster}`;
};

const Detail = () => {

  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isAddChapterVisible, setIsAddChapterVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
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
  }, []);

  const handleAddChapter = () => {
    setIsAddChapterVisible(true);
    message.info("Thêm chương mới");
  };

  const handleAddChapterClose = () => {
    setIsAddChapterVisible(false);
    fetchChaptersByComicId(id).then(setChapters).catch(() => {
      message.error("Không thể làm mới danh sách chương!");
    });
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

  const handleDeleteChapter = async (chapterId) => {
    try {
      // API call to delete the chapter (placeholder, implement actual logic)
      message.success(`Xóa chương ID: ${chapterId} thành công!`);
      fetchChaptersByComicId(id).then(setChapters);
    } catch {
      message.error("Không thể xóa chương!");
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
      title: "Số Trang",
      dataIndex: "list_pages",
      key: "list_pages",
      render: (pages) => pages?.length || 0,
    },
    {
      title: "Trạng Thái",
      dataIndex: "active",
      key: "active",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={async (checked) => {
            try {
              // API call to update active state (placeholder, implement actual logic)
              record.active = checked;
              message.success("Cập nhật trạng thái thành công!");
            } catch {
              message.error("Không thể cập nhật trạng thái!");
            }
          }}
        />
      ),
    },
    {
      title: "Premium",
      dataIndex: "premium",
      key: "premium",
      render: (premium, record) => (
        <Switch
          checked={premium}
          onChange={async (checked) => {
            try {
              // API call to update premium state (placeholder, implement actual logic)
              record.premium = checked;
              message.success("Cập nhật premium thành công!");
            } catch {
              message.error("Không thể cập nhật premium!");
            }
          }}
        />
      ),
    },
    {
      title: "Ngày Cập Nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Thao Tác",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => message.info("Chức năng chỉnh sửa chưa được triển khai!")}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteChapter(record._id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div className="comic-detail-container">
      <div className="header-section">
        <h2 className="section-title">
          {comic ? comic.ten_bo : "Đang tải..."} <span className="comic-id">ID: {comic?._id}</span>
        </h2>
        <div className="timestamps">
          <Tag color="blue">Created: {comic ? new Date(comic.createdAt).toLocaleDateString() : "N/A"}</Tag>
          <Tag color="green">Updated: {comic ? new Date(comic.updatedAt).toLocaleDateString() : "N/A"}</Tag>
        </div>
      </div>
      <hr className="line" />

      <Row gutter={[20, 16]} align="middle">
        <Col span={8} style={{ position: "relative" }}>
          {comic && comic.poster ? (
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
          ) : (
            <div className="placeholder">Đang tải poster...</div>
          )}
        </Col>
        <Col span={8} style={{ position: "relative", marginLeft: "20px" }}>
          {comic && comic.banner ? (
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
          ) : (
            <div className="placeholder">Đang tải banner...</div>
          )}
        </Col>
        <Col span={8} style={{ marginLeft: "40px" }}>
          {comic ? (
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
          ) : (
            <div className="placeholder">Đang tải thông tin...</div>
          )}
        </Col>
      </Row>


      <hr className="line purple-line" />
      <div className="metadata-section">
        <div className="metadata-item">
          <span className="metadata-icon">👁️</span> Tổng View: {comic?.TongLuotXem || "N/A"}
        </div>
        <div className="metadata-item">
          <span className="metadata-icon">👤</span> Tổng Follow: {comic?.theodoi || "N/A"}
        </div>
        <div className="metadata-item">
          <span className="metadata-icon">⭐</span> Điểm số: {comic?.danhgia ? `${comic.danhgia}/10` : "N/A"}
        </div>
        <div className="metadata-item">
          <span className="metadata-icon">🖊️</span> Tác giả: {comic?.id_tg?.ten_tg || "Không rõ"}
        </div>
        <div className="genres-list">
          {comic?.listloai && comic.listloai.length > 0 ? (
            comic.listloai.map((genre) => {
              const colors = ["#1B5E20", "#B71C1C", "#263238", "#4A148C", "#00695C"];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              return (
                <Tag key={genre._id} style={{ backgroundColor: randomColor, color: "#fff" }}>
                  {genre.name || "Không rõ"}
                </Tag>
              );
            })
          ) : (
            <span>Không có thể loại</span>
          )}
        </div>
      </div>

      <div className="description-section">
        <p>{comic?.mota || "Chưa có mô tả"}</p>
      </div>

      <div className="chapters-section">
        <h3>Danh Sách Chương</h3>
        {chapters?.length > 0 ? (
          <Table
            dataSource={chapters}
            columns={columns}
            pagination={false}
            rowKey={(record) => record._id}
          />
        ) : (
          <p>Không có chương nào được tìm thấy.</p>
        )}
      </div>

      <Button
        type="primary"
        onClick={handleAddChapter}
        className="floating-add-button"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        Thêm Chương
      </Button>

      {comic && (
        <AddChapter
          visible={isAddChapterVisible}
          onClose={handleAddChapterClose}
          comicId={comic._id}
        />
      )}
    </div>
  );
};

export default Detail;
