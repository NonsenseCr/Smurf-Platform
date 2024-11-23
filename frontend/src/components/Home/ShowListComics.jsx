import { Link } from 'react-router-dom';
import iconPremium from '../../assets/PreDark.png';
const ShowListComics = ({ comics }) => {
    return (
        <section className="new-update containers mt-3" id="update">
            <div className="update__container TruyenNew__Containter grids">
                <div className="top__content">
                    <div className="title-infor">
                        <span className="section__subtitle">Mới Cập Nhật</span>
                        <p className="section__des">Cập nhật nhanh và chất lượng nhất các chương truyện</p>
                    </div>
                    <div className="btn-More">
                        <Link to="/boTruyen/ListTruyenEarliest">XEM THÊM</Link>
                    </div>
                </div>
                <div className="container">
                    <div className="row row-cols-6 justify-content-center">
                        {comics.map((comic) => (
                            <div key={comic._id} className="col-2 update-item">
                                <Link to={`/boTruyen/${comic._id}`}>
                                    <figure className="position-relative">
                                        {comic.AnhBia && (
                                            <img
                                                loading="lazy"
                                                src={`http://localhost:5000${comic.AnhBia}`}
                                                alt="Poster"
                                                className="d-block w-100 poster"
                                            />
                                        )}
                                        <figcaption>
                                            <h6 className="item-title">
                                                <Link to={`/boTruyen/${comic._id}`}>
                                                    {comic.TenBo}
                                                </Link>
                                            </h6>
                                            <a className="item-chapter" style={{ fontSize: '13px' }}>
                                                <span className="chap" style={{ marginRight: '10px' }}>
                                                    {comic.latestChapter?.SttChap
                                                        ? `chap ${comic.latestChapter.SttChap}`
                                                        : 'chap ...'}
                                                </span>
                                                <span className="time">
                                                    {comic.latestChapter?.ThoiGian || '... giờ trước'}
                                                </span>
                                            </a>
                                        </figcaption>
                                        {comic.TtPemium && (
                                            <div className="item-vip">
                                                <img
                                                    loading="lazy"
                                                    style={{
                                                        width: '50px!important',
                                                        height: '20px!important',
                                                        borderRadius: '0',
                                                    }}
                                                    src={iconPremium}
                                                    alt="Premium"
                                                />
                                            </div>
                                        )}
                                    </figure>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowListComics;
