import { Link } from "react-router-dom";
import yuzu from '../../assets/yuzu.png';
const RecommendationBanner = () => {
    return (
        <section className="new-update containers mt-6" id="update">
            <div className="update__container grids">
                <div className="section-bottom container-list w-100">
                    {/* Hình ảnh minh họa */}
                    <img
                        loading="lazy"
                        src={yuzu}
                        alt="cat Image"
                        className="recommendation-img"
                    />
                    {/* Thông điệp */}
                    <span>
                        Nếu bạn vẫn chưa biết đọc gì hôm nay! <br />
                        Hãy xem thử danh sách đề cử của chúng tôi!
                    </span>
                    {/* Nút liên kết */}
                    <Link
                        to="/boTruyen/ListTruyen"
                        className="btn btn-primary recommendation-btn"
                    >
                        DANH SÁCH
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecommendationBanner;
