import { useState, useEffect } from 'react';
import { fetchTopReadBoTruyen, fetchBoTruyenLatest} from '../services/BoTruyenServices';
import { fetchActiveLoaiTruyen } from '../services/LoaiTruyenService';
import CarouselComponent from '../components/Home/CarouselComics';
import ComicList from '../components/Home/ComicsList';
import CategoryList from '../components/Home/CategoryList';
import TopRankingBanner from '../components/Home/TopRankingBanner';
import RecommendType from '../components/Home/RecommendTypeList';
import ShowListComics from '../components/Home/ShowListComics';
import RecommendBanner from '../components/Home/RecommendBanner';


const Home = () => {
    // const [comic, setComics] = useState([]);
    const [comicsLatest, setlatestComics] = useState([]);
    const [topReadComics, setTopReadComics] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ topReadData, categoryData, LatestData] = await Promise.all([
                    // fetchActiveBoTruyen(),
                    fetchTopReadBoTruyen(),
                    fetchActiveLoaiTruyen(),
                    fetchBoTruyenLatest(),
                ]);
                // setComics(activeData);
                setTopReadComics(topReadData);
                setCategories(categoryData);
                setlatestComics(LatestData);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="loading-container">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="error-container">Lỗi: {error}</div>;
    }

    return (
        <div className="home-container">
            <CarouselComponent comics={topReadComics.slice(0, 10)} />
            <ComicList comics={topReadComics.slice(0, 10)} title="Đề Cử Hôm Nay" />
            <ShowListComics 
                comics={comicsLatest}
                subtitle="Mới Cập Nhật"
                description="Danh sách các truyện mới nhất với chất lượng cao."
                link="http://localhost:5173/latest"/>
                
            <RecommendType/>
            
            <ShowListComics 
                comics={comicsLatest}
                subtitle="Danh Sách truyện"
                description="Danh sách các truyện mới nhất cập nhật liên tục"
                link="http://localhost:5173/trending"/>
            <TopRankingBanner topComics={topReadComics} />
            <CategoryList categories={categories} title={"Loại truyện phổ biến"} />
            <RecommendBanner/>
        </div>
    );
};

export default Home;
