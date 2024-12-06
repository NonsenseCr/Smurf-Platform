import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBoTruyenById } from "@/services/BoTruyenServices";
import Breadcrumb from "@/area-manager/components/Breadcrumb";
import { Link } from "react-router-dom";
import { Button, Select, message } from "antd";
import "@/area-manager/styles/comic-detail.css";

const { Option } = Select;

const Detail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const data = await fetchBoTruyenById(id);
        setComic(data);
      } catch {
        message.error("Không thể tải thông tin chi tiết bộ truyện!");
      }
    };
    fetchComic();
  }, [id]);

  if (!comic) {
    return <div>Đang tải...</div>;
  }

  const handleAddChapter = () => {
    message.info("Thêm chương mới");
  };

  const handleActivatePremium = () => {
    message.info("Kích hoạt Premium");
  };

  const handleToggleActive = () => {
    message.info(`Chuyển trạng thái ${comic.active ? "UnActive" : "Active"}`);
  };

  const handleAddNewComic = () => {
    message.info("Thêm truyện mới");
  };
  return (
    <div className="comic-detail-container">
      {/* Breadcrumb */}
      <Breadcrumb
paths={[
    <Link to="/manager/home" key="home">Home</Link>,
    <Link to="/manager/comic-index" key="comic-index">Comic Index</Link>,
    <Link to={`/manager/comic-index/comic-detail/${comic._id}`} key="comic-detail">{comic.tenbo}</Link>,
  ]}
  
      />
        <h2 className="section-title">
            {comic.tenbo} <span className="comic-id">ID: {comic._id}</span>
        </h2>
        <hr className="line" />
 
   

      {/* Ảnh Poster và Banner */}
      <div className="images-section">
  <div className="image-container">
    <img
      src={comic.poster ? `http://localhost:5000${comic.poster}` : "/path/to/default-poster.jpg"}
      alt="Poster"
      className="comic-poster"
    />
    <span className="image-tag">Poster</span>
  </div>
  <div className="image-container banner-container">
    <img
      src={comic.banner ? `http://localhost:5000${comic.banner}` : "/path/to/default-banner.jpg"}
      alt="Banner"
      className="comic-banner"
    />
    <span className="image-tag">Banner</span>
  </div>
</div>



      {/* Danh sách thể loại */}
        <div className="genres-list">
    {comic.listloai.map((genre) => {
        const colors = ["#1B5E20", "#B71C1C", "#263238", "#4A148C", "#00695C"]; // Các màu random
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Chọn màu ngẫu nhiên
        return (
        <span
            key={genre._id}
            className="genre-item"
            style={{ backgroundColor: randomColor }} // Áp dụng màu nền
        >
            {genre.name}
        </span>
        );
    })}
    </div>


      {/* Các thuộc tính khác */}
      <div className="attributes-section">
        <p>Độ tuổi: {comic.dotuoi}</p>
        <p>Mô tả: {comic.mota || "Chưa có mô tả"}</p>
        <p>Đánh giá: {comic.danhgia}</p>
        <p>Theo dõi: {comic.theodoi}</p>
        <p>Lượt xem: {comic.TongLuotXem}</p>
        <p>Trạng thái: {comic.trangthai}</p>
        <p>Premium: {comic.premium ? "Có" : "Không"}</p>
        <p>Hoạt động: {comic.active ? "Có" : "Không"}</p>
      </div>

      {/* Bộ nút */}
      <div className="actions-section">
        <Button type="primary" onClick={handleAddChapter}>
          Thêm Chương
        </Button>
        <Button type="default" onClick={handleActivatePremium}>
          Kích Hoạt Premium
        </Button>
        <Button type="danger" onClick={handleToggleActive}>
          {comic.active ? "UnActive" : "Active"}
        </Button>
        <Select
          defaultValue={comic.trangthai}
          onChange={(value) => message.info(`Trạng thái được chuyển thành: ${value}`)}
          style={{ width: 200 }}
        >
          <Option value="hoat_dong">Hoạt động</Option>
          <Option value="tam_ngung">Tạm ngừng</Option>
          <Option value="hoan_thanh">Hoàn thành</Option>
        </Select>
        <Button type="primary" onClick={handleAddNewComic}>
          Thêm Truyện Mới
        </Button>
      </div>
    </div>
  );
};

export default Detail;
