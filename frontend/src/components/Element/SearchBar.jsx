import  { useState } from 'react';
// import './SearchBar.css'; // Đảm bảo các định nghĩa CSS đã được nhập

const SearchBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    // Hàm xử lý khi click vào icon tìm kiếm
    const toggleSearch = () => {
        setIsActive(current => !current);
    };

    // Xóa nội dung tìm kiếm và đóng thanh tìm kiếm
    const clearSearch = () => {
        setSearchTerm('');
        setResults([]);
        setIsActive(false); // Tắt hiển thị khi không có nội dung tìm kiếm
    };

    // Hàm gọi API và lấy kết quả tìm kiếm, giả định rằng bạn có một API phù hợp
    const handleSearch = async () => {
        if (searchTerm.trim()) {
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setResults([]);
        }
    };

    // Xử lý thay đổi input và tìm kiếm tức thì
    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value);
        handleSearch();
    };

    return (
        <div className={`search ${isActive ? 'active' : ''}`}>
            <div className="icon" onClick={toggleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="input">
                <input
                    type="text"
                    placeholder="Tìm Kiếm ..."
                    value={searchTerm}
                    onChange={onChangeHandler}
                    className="searchInput"
                />
            </div>
            <span className="clear" onClick={clearSearch}>
                <i className="ri-close-large-line"></i>
            </span>
            {isActive && results.length > 0 && (
                <div className="results">
                    <ul>
                        {results.map(result => (
                            <li key={result.id}>
                                <a href={`/BoTruyen/CTBoTruyen/${result.id}`}>
                                    <img src={result.img} alt={result.tenBo} />
                                    <div>
                                        <h4>{result.tenBo}</h4>
                                        <span>{result.view} Views</span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
