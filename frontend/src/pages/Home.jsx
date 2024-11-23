import { useState, useEffect } from 'react';
import { fetchActiveBoTruyen, fetchTopReadBoTruyen, fetchBoTruyenLatest} from '../services/BoTruyenServices';
import { fetchActiveLoaiTruyen } from '../services/LoaiTruyenService';
import CarouselComponent from '../components/Home/CarouselComics';
import ComicList from '../components/Home/ComicsList';
import CategoryList from '../components/Home/CategoryList';
import TopRankingBanner from '../components/Home/TopRankingBanner';
import RecommendType from '../components/Home/RecommendTypeList';
import ShowListComics from '../components/Home/ShowListComics';
const Home = () => {
    const [comics, setComics] = useState([]);
    const [comicsLatest, setlatestComics] = useState([]);
    const [topReadComics, setTopReadComics] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activeData, topReadData, categoryData, LatestData] = await Promise.all([
                    fetchActiveBoTruyen(),
                    fetchTopReadBoTruyen(),
                    fetchActiveLoaiTruyen(),
                    fetchBoTruyenLatest(),
                ]);
                setComics(activeData);
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
            <CarouselComponent comics={comics.slice(0, 10)} />
            <ComicList comics={comics} title="Mới Cập Nhật" />
            <RecommendType/>
            <CategoryList categories={categories} />
            <ShowListComics comics={comicsLatest}/>
            <TopRankingBanner topComics={topReadComics} />
            
        </div>
    );
};

export default Home;
