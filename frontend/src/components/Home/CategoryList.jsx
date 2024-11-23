import { Link } from 'react-router-dom';

const CategoryList = ({ categories }) => {
    return (
        <section className="new-update containers mt-3" id="update">
            <div className="update__container grids">
                <div className="top__content">
                    <div className="title-infor">
                        <span className="section__subtitle">Loại truyện phổ biến</span>
                        <p className="section__des"></p>
                    </div>
                </div>
                <div className="containers">
                    <div className="row w-100 position-relative">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                to={`/categories/${category.ten_loai}`} // Đường dẫn chi tiết loại truyện
                                className="col-auto item-loai"
                            >
                                {category.ten_loai} {/* Hiển thị tên loại truyện */}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryList;
