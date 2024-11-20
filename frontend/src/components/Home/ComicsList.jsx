import { Link } from 'react-router-dom';
import imgComic from '../../assets/truyen/poster9.jpg';

const ComicList = ({ comics, title }) => {
    return (
        <section className="new-update containers mt-3" id="update">
            <div className="update__container TruyenNew__Container grids">
                <div className="top__content">
                    <div className="title-infor">
                        <span className="section__subtitle">{title}</span>
                    </div>
                </div>
                <div className="container">
                    <div className="row row-cols-6 justify-content-center">
                        {comics.map(comic => (
                            <div key={comic._id} className="col-2 update-item">
                                <Link to={`/comics/${comic._id}`}>
                                    {/* <img src={comic.poster} alt="Poster" className="d-block w-100"/> */}
                                    <img src={imgComic} alt="Poster" className="d-block w-100"/>
                                    <div>
                                        <h6>{comic.tenbo}</h6>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComicList;
