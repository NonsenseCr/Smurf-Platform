import { Link } from 'react-router-dom';
import manga from '../../assets/img/bg-4.jpg';
import manwa from '../../assets/img/bg-3.jpg';
import adventure from '../../assets/img/bg-1.jpg';
import Comedy from '../../assets/img/bg-2.jpg';
const RecommendTypeList = () => {
    return (
        <section className="new-update containers mt-3 mb-5" id="update">
            <div className="update__container TruyenNew__Containter grids">
                <div className="top__content">
                    <div className="title-infor">
                        <span className="section__subtitle">Loại Truyện Đề Cử</span>
                        <p className="section__des"></p>
                    </div>
                </div>
                <div className=" recommend__type">
                    <div className="row row-cols-3">
                        {/* Manga */}
                        <Link
                            className="col"
                            to="/boTruyen/ListTopic/Manga"
                        >
                            <div className="col-item">
                                <img
                                    loading="lazy"
                                    src={manga}
                                    alt="Manga"
                                />
                                <h5 className="recommend-content">
                                    Manga
                                </h5>

                            </div>
                        </Link>
                        {/* Manwa */}
                        <Link
                            className="col"
                            to="/boTruyen/ListTopic/Manwa"
                        >
                            <div className="col-item">
                                <img
                                    loading="lazy"
                                    src={manwa}
                                    alt="Manwa"
                                />
                                <h5 className="recommend-content">
                                    Manwa
                                </h5>
                            </div>
                        </Link>
                        {/* Adventure */}
                        <Link
                            className="col"
                            to="/boTruyen/ListTopic/Adventure"
                        >
                            <div className="col-item">
                                <img
                                    loading="lazy"
                                    src={adventure}
                                    alt="Adventure"
                                />
                                <h5 className="recommend-content">
                                    Adventure
                                </h5>
                            </div>
                        </Link>
                        {/* Comedy */}
                        <Link
                            className="col"
                            to="/boTruyen/ListTopic/Comedy"
                        >
                            <div className="col-item">
                                <img
                                    loading="lazy"
                                    src={Comedy}
                                    alt="Comedy"
                                />
                                <h5 className="recommend-content">
                                    Comedy
                                </h5>
                            </div>
                        </Link>
                        {/* Comedy */}
                        <Link
                            className="col"
                            to="/boTruyen/ListTopic/Comedy"
                        >
                            <div className="col-item">
                                <img
                                    loading="lazy"
                                    src={Comedy}
                                    alt="Comedy"
                                />
                                <h5 className="recommend-content">
                                    Comedy
                                </h5>
                            </div>
                        </Link>
                        {/* Comedy */}
                        <Link
                            className="col"
                            to="/boTruyen/ListTopic/Comedy"
                        >
                            <div className="col-item">
                                <img
                                    loading="lazy"
                                    src={Comedy}
                                    alt="Comedy"
                                />
                                <h5 className="recommend-content">
                                    Comedy
                                </h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecommendTypeList;
