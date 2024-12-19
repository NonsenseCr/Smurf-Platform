import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { fetchChapterDetails } from "@/area-manager/services/comicService";
import "@/area-manager/styles/AddComic.module.css";

const DemoRead = () => {
  const { chapterId } = useParams(); // Lấy chapterId từ URL
  console.log("Chapter ID (URL):", chapterId);

  const [chapterDetails, setChapterDetails] = useState(null);

  useEffect(() => {
    if (!chapterId || !chapterId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error("ID chương không hợp lệ:", chapterId);
      return;
    }

    const loadChapterDetails = async () => {
      try {
        const data = await fetchChapterDetails(chapterId); // Gọi hàm từ service
        setChapterDetails(data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin chương:", error);
      }
    };
    loadChapterDetails();
  }, [chapterId]);

  if (!chapterDetails) return <div>Đang tải...</div>;

  return (
    <div className="demo-read-container">
      <div className="reading-area">
        {chapterDetails.list_pages.map((page, index) => (
          <div className="page-container" key={index}>
            <div className="page-header">
              <span>Trang {page.so_trang}</span>
              <a href={page.anh_trang} target="_blank" rel="noopener noreferrer">
                Xem ảnh gốc
              </a>
            </div>
            <img src={page.anh_trang} alt={`Trang ${page.so_trang}`} />
          </div>
        ))}
      </div>
      <div className="chapter-info">
        <h3>Thông tin chương</h3>
        <p><strong>Tên chương:</strong> {chapterDetails.ten_chap}</p>
        <p><strong>Số chương:</strong> {chapterDetails.stt_chap}</p>
        <p><strong>Trạng thái:</strong> {chapterDetails.trangthai}</p>
        <p><strong>Lượt xem:</strong> {chapterDetails.luotxem}</p>
        <h4>Danh sách ảnh</h4>
        <ul>
          {chapterDetails.list_pages.map((page, index) => (
            <li key={index}>
              <a href={page.anh_trang} target="_blank" rel="noopener noreferrer">
                {page.anh_trang}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DemoRead;
