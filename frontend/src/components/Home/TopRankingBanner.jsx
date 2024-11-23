import { Link } from 'react-router-dom';

const TopRankingBanner = ({ topComics }) => {
    if (!topComics.length) return null;

    const topComic = topComics[0];
    return (
        <section className="top-ranking-banner container mt-3">
            <div className="banner">
                <img src={topComic.AnhBanner || '/default-banner.jpg'} alt={topComic.TenBo} />
                <div className="banner-content">
                    <h3>{topComic.TenBo}</h3>
                    <Link to={`/comics/${topComic._id}`} className="btn btn-primary">
                        Xem ngay
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TopRankingBanner;
