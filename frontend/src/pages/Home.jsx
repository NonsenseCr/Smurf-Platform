import { useState, useEffect } from 'react';
import { fetchActiveBoTruyen } from '../services/BoTruyenServices'; // Import service API
import CarouselComponent from '../components/Home/CarouselComics'; // Component carousel
import ComicList from '../components/Home/ComicsList'; // Component danh sách bộ truyện

const Home = () => {
    const [comics, setComics] = useState([]); // State lưu danh sách bộ truyện
    const [loading, setLoading] = useState(true); // State loading
    const [error, setError] = useState(''); // State lỗi

    // Hàm lấy danh sách bộ truyện hoạt động
    const fetchComics = async () => {
        try {
            const data = await fetchActiveBoTruyen(); // Gọi API qua service
            setComics(data); // Lưu dữ liệu vào state
            setLoading(false); // Kết thúc trạng thái loading
        } catch (err) {
            console.error('Error:', err);
            setError(err.message); // Lưu lỗi
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    // useEffect chạy khi component render lần đầu
    useEffect(() => {
        fetchComics(); // Gọi hàm fetchComics
    }, []);

    // Hiển thị trạng thái loading
    if (loading) {
        return (
            <div className="loading-container">
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* Carousel Component nhận 10 bộ truyện đầu tiên */}
            <CarouselComponent comics={comics.slice(0, 10)} />
            
            {/* Comic List Component nhận toàn bộ danh sách bộ truyện */}
            <ComicList comics={comics} title="Mới Cập Nhật" />
        </div>
    );
};

export default Home;
