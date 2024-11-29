import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import iconPremium from "../../assets/PreDark.png";
import { useRef } from "react";

const CarouselComponent = ({ comics = [] }) => {
    const sliderRef = useRef(null); // Tạo tham chiếu đến Slider

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.split(" ").slice(0, maxLength).join(" ") + "...";
        }
        return text;
    };

    return (
        <div className="main__bottom sections">
            <section className="home" id="home">
                <div className="home__container w-100">
                    <div className="carousel-container">
                    
                        {/* Slider Component */}
                        <Slider ref={sliderRef} {...settings}>
                            {comics.map((comic, index) => (
                                <div key={index} className="carousel-item w-100 main-Banner">
                                    {comic.banner && (
                                        <img
                                            loading="lazy"
                                            src={`http://localhost:5000${comic.banner}`}
                                            className="d-block w-100 rounded-1 banner-img"
                                            alt="Banner"
                                        />
                                    )}
                                    {comic.premium && (
                                        <div className="item-vip-banner">
                                            <img
                                                loading="lazy"
                                                src={iconPremium}
                                                alt="Premium"
                                                style={{ width: "100px", height: "40px", borderRadius: 0 }}
                                            />
                                        </div>
                                    )}
                                    <div className="background-item rounded-1"></div>
                                    <div className="item-infor">
                                        <div className="item-content">
                                            <div className="content">
                                                <a href={`/comic/${comic._id}`} style={{ display: "block" }}>
                                                    {comic.tenbo}
                                                </a>
                                                <div>
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <i
                                                            key={i}
                                                            className="ri-star-fill"
                                                            style={{
                                                                color: i < comic.danhgia ? "#FAB818" : "#ccc",
                                                            }}
                                                        ></i>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="item-des">
                                                <p>{truncateText(comic.mota, 35)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn__regis btn-watch w-50">
                                        <a href={`/comic/${comic._id}`}>
                                            XEM NGAY <i className="fa-solid fa-square-caret-right"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        
                        <button
                            className="carousel-control-prev"
                            onClick={() => sliderRef.current.slickPrev()}
                            style={{ width: "5%", zIndex: 1000 }}
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button
                            className="carousel-control-next"
                            onClick={() => sliderRef.current.slickNext()}
                            style={{ width: "5%", zIndex: 1000 }}
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </section>
            <div className="main__right">
                <div className="main__random bg">
                    <div className="item-random">
                        <div className="content">
                            <a href="#">Hôm nay đọc gì?</a>
                        </div>
                        <div className="horizontal"></div>
                        <div className="item-des">
                            <p>Nếu bạn không biết đọc gì hôm nay. Hãy để tôi chọn cho bạn</p>
                        </div>
                        <div className="btn__regis">
                            <a href="/comic/random">ĐỌC NGẪU NHIÊN</a>
                        </div>
                    </div>
                </div>
                <div className="main__random bg-random">
                    <a id="btnPay" style={{ fontWeight: 600, letterSpacing: '1px' }} className="btn-pre nav__buttons-Pre">
                        <i className="fa-solid fa-crown"></i>
                        <span style={{ paddingRight: '.3rem', fontWeight: 500, color: '#FAB818' }}>Thử </span> Ngay
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CarouselComponent;
