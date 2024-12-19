import  { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import {  message } from "antd";

import { fetchComics } from "@/area-manager/services/comicService";
import GridView from "../../../area-manager/components/GridView";
import CardView from "../../../area-manager/components/CardView";
import AddComic from "../../../area-manager/pages/comic/Add";
import styles from "../../../area-manager/styles/ComicIndex.module.css";

const ComicIndex = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddComicVisible, setIsAddComicVisible] = useState(false);

  useEffect(() => {
    const fetchComicss = async () => {
      try {
        const data = await fetchComics();
        setComics(data);
      } catch {
        message.error("Không thể tải danh sách bộ truyện!");
      } finally {
        setLoading(false);
      }
    };
    fetchComicss();
  }, []);

  const handleToggleActive = (id) => {
    message.success(`Trạng thái Active cho ID ${id} đã được đổi.`);
  };

  const handleTogglePremium = (id) => {
    message.success(`Trạng thái Premium cho ID ${id} đã được đổi.`);
  };

  const handleEdit = (comic) => {
    message.info(`Sửa bộ truyện ${comic.tenbo}`);
  };

  const handleDelete = (comic) => {
    message.warning(`Xóa bộ truyện ${comic.tenbo}`);
  };

  const handleAddComic = () => {
    setIsAddComicVisible(true); // Hiển thị popup
  };

  const handleAddComicSuccess = () => {
    message.success("Thêm bộ truyện mới thành công!");
    setIsAddComicVisible(false); // Đóng popup
    // Reload danh sách sau khi thêm
    fetchComics().then((data) => setComics(data));
  };

  const handleAddComicCancel = () => {
    setIsAddComicVisible(false); // Đóng popup
  };

  return (
    <div className={styles.comicIndexContainer}>
      <h2 className={styles.sectionTitle}>Danh sách bộ truyện</h2>
      <Tabs defaultActiveKey="grid" id="comic-index-tabs" className="mb-3">
        <Tab eventKey="grid" title="Grid View">
          <GridView
            comics={comics}
            loading={loading}
            onToggleActive={handleToggleActive}
            onTogglePremium={handleTogglePremium}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Tab>
        <Tab eventKey="card" title="Card View">
          <CardView comics={comics} />
        </Tab>
      </Tabs>

{/* Nút Add */}
<div className={styles.addButton} onClick={handleAddComic}>
        <i className="fa-solid fa-arrow-up-from-bracket"></i>
        <span className={styles.addButtonText}>ADD</span>
      </div>

      {/* Popup Add Comic */}
      <AddComic
        visible={isAddComicVisible}
        onClose={handleAddComicCancel}
        onSuccess={handleAddComicSuccess}
      />
    </div>
  );
};

export default ComicIndex;
