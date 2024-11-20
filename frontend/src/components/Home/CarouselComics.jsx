import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = ({ comics = [] }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="main__bottom sections TruyenNew__Container containers grid">
            <section className="home" id="home">
                <div className="home__container w-100">
                    <div id="carouselExampleAutoplaying" className="carousel slide home__carousel bg__carousel w-100" data-bs-ride="carousel">
                        <div className="carousel-inner rounded-1 w-100">
                            <Slider {...settings}>
                                {Array.isArray(comics) && comics.map((comic, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={comic.banner} alt="Banner" className="d-block w-100 rounded-1" style={{ height: '500px', objectFit: 'cover' }} />
                                        <div className="item-info">
                                            <div className="item-content">
                                                <div className="content">
                                                    <a href="#">{comic.tenbo}</a>
                                                    <p>{comic.mota}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default CarouselComponent;
