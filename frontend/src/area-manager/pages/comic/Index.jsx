import { useState, useEffect } from "react";
import { message } from "antd";
import { fetchAllBoTruyen } from "@/services/BoTruyenServices";
import { Row, Col, Pagination, Select, Button, Modal, Input, Checkbox, Spin } from "antd";
import Breadcrumb from "@/area-manager/components/Breadcrumb";
import { Link } from "react-router-dom";
import "@/area-manager/styles/comic-index.css";

const { Option } = Select;

const ComicIndex = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(32);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    genres: [],
    author: "",
  });

  const genreOptions = ["Action", "Romance", "Fantasy", "Horror", "Comedy"]; // Các thể loại mẫu

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await fetchAllBoTruyen();
        setComics(data);
      } catch {
        message.error("Không thể tải danh sách bộ truyện!");
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset về trang đầu
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleApplyFilter = () => {
    setIsFilterModalVisible(false);
    message.success("Đã áp dụng bộ lọc!");
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedComics = comics.slice(startIndex, endIndex);

  return (
    <div className="comic-index-container">
      <Breadcrumb
        paths={[
          <Link to="/manager/home" key="home">Home</Link>,
          <Link to="/manager/comic-index" key="comic-index">Comic Index</Link>,
        ]}
      />

      {/* Danh sách bộ truyện - Label */}
      <h2 className="section-title">Danh sách bộ truyện</h2>

      {/* Comics List Section */}
      <div className="comics-list-section">
        {/* Bộ tìm kiếm và nút */}
        <div className="list-controls">
          {/* Thanh tìm kiếm */}
          <div className="search-bar">
            <Input placeholder="TÌM KIẾM THEO TÊN - ID - TÁC GIẢ ..." />
          </div>

          {/* Nút bên phải */}
          <div className="right-controls">
            <Button type="primary" onClick={handleOpenFilterModal}>
              <i className="ri-filter-line"></i> Bộ lọc
            </Button>
            <Select
              defaultValue={16}
              onChange={handleItemsPerPageChange}
              style={{ width: 120 }}
            >
              <Option value={8}>8 items</Option>
              <Option value={16}>16 items</Option>
              <Option value={32}>32 items</Option>
              <Option value={50}>50 items</Option>
              <Option value={100}>100 items</Option>
            </Select>
          </div>
        </div>

        {/* Danh sách truyện */}
        {loading ? (
          <Spin tip="Đang tải danh sách bộ truyện..." />
        ) : (
          <Row gutter={[16, 16]}>
  {paginatedComics.map((comic) => (
    <Col key={comic._id} xs={24} sm={12} md={8} lg={6}>
      <a
        href={`/manager/comic-index/comic-detail/${comic._id}`}
        className={`comic-card-link ${comic.active ? "active" : "inactive"}`}
      >
       <div
                className="comic-card"
                style={{
                  backgroundImage: `url(http://localhost:5000${comic.poster})`,
                }}
              >
          {/* ID của bộ truyện */}
          <div className="comic-card-id">ID: {comic._id}</div>

          <div className="comic-card-info">
            {/* Tên bộ truyện */}
            <h3 className="comic-title">{comic.tenbo}</h3>

            {/* Lượt xem và Theo dõi */}
            <div className="comic-meta-row">
              <span>Lượt xem: {comic.TongLuotXem}</span>
              <span>Theo dõi: {comic.theodoi}</span>
            </div>

            {/* Trạng thái */}
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

          {/* Ngày tạo */}

        </div>
      </a>
    </Col>
  ))}
</Row>

        )}

        {/* Pagination */}
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={comics.length}
          onChange={handlePageChange}
          style={{ marginTop: "20px" }}
        />
      </div>

      {/* Filter Modal */}
      <Modal
  title="Bộ lọc"
  visible={isFilterModalVisible}
  onCancel={() => setIsFilterModalVisible(false)}
  onOk={handleApplyFilter}
  okText="Áp dụng"
  cancelText="Hủy"
  className="modal-filter"
>
  <div>
    {/* Lựa chọn thể loại */}
    <label>Thể loại:</label>
    <Checkbox.Group
      options={genreOptions}
      onChange={(checkedValues) => setFilters({ ...filters, genres: checkedValues })}
    />

    {/* Nhập tên tác giả */}
    <div style={{ marginTop: 15 }}>
      <label>Tác giả:</label>
      <Input
        placeholder="Nhập tên tác giả"
        onChange={(e) => setFilters({ ...filters, author: e.target.value })}
      />
    </div>
  </div>
</Modal>
    </div>
  );
};

export default ComicIndex;
