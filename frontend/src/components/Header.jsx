import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo2.png';


function Header() {
  const isAuthenticated = false; 
  const userName = "Guest"; 
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <header className="header" id="header">
      <div className="nav__side">

        <nav className=" nav">
          <Link to="/" className="nav__logo">
            <img className="nav__logo-img" src={logo} alt="logo website" />
          </Link>
          <div className="nav__menu nav__menu-list" id="nav-menu">
            <div className="search">
              <div className="icon"><i className="fa-solid fa-magnifying-glass"></i></div>
              <div className="input">
                <input type="text" placeholder="Tìm Kiếm ..." id="search-truyen" className="searchInput" />
              </div>
              <span className="clear"><i className="ri-close-large-line"></i></span>
            </div>
            <div className="results" id="search-results">
              <ul id="results"></ul>
            </div>

            <div className="nav__login">
              {isAuthenticated ? (
                <DropdownButton
                  id="dropdown-basic-button"
                  title={<span><img src="/path-to-user-image" alt="User" /> {userName}</span>}
                  className="btn__login dropdown position-relative"
                >
                  <Dropdown.Item as={Link} to="/account"><i className="fa-solid fa-user"></i> Account</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings"><i className="fa-solid fa-sliders"></i> Settings</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/history"><i className="fa-solid fa-clock-rotate-left"></i> Histories</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}><i style={{ color: '#FE0000' }} className="fa-solid fa-right-from-bracket"></i> Logout</Dropdown.Item>
                </DropdownButton>
              ) : (
                <>
                  <div className="btn__regis mr-2" onClick={handleRegister}>Đăng ký</div>
                  <div className="btn__login" onClick={handleLogin}>Đăng nhập</div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
      <div className="nav__content">
        <nav className="containers nav__content">
          <input type="checkbox" id="sidebar-active" />
          <label htmlFor="sidebar-active" className="open-sidebar-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
          </label>
          <label id="overlay" htmlFor="sidebar-active"></label>
          <div className="links-container grids">
            <label htmlFor="sidebar-active" className="close-sidebar-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
            </label>
            <Link to="/" className="nav__link">Trang Chủ</Link>
            <Dropdown>
              <Dropdown.Toggle as="a" className="nav__link" style={{ cursor: 'pointer' }}>
                Thể Loại Truyện
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="row">
                  <div className="col-3">
                    <Dropdown.Item className='item-main' as={Link} to="/category/all">Tất cả</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/67406e97c03445f4711481f8">Xuyên không</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/67406e97c03445f4711481f8">Adventure</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">One short</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Sports</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Truyện màu</Dropdown.Item>
                  </div>
                  <div className="col-3">
                    <Dropdown.Item className='item-main' as={Link} to="/category/all">Theo Cảm xúc</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Nhẹ nhàng</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Kinh dị</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Lãng mạng</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/67406e4ec03445f4711481f2">Action</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Comedy</Dropdown.Item>
                  </div>
                  <div className="col-3">
                    <Dropdown.Item className='item-main' as={Link} to="/category/all">Theo Khu Vực</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Manwa</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Manhua</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Manga</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Comic</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Webtoon</Dropdown.Item>
                  </div>
                  <div className="col-3">
                    <Dropdown.Item className='item-main' as={Link} to="/all">Theo đội tuổi</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Mọi độ tuổi</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Trẻ em</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Thiếu Niên</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Bạo lực</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/adventure">Trưởng thành</Dropdown.Item>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/trending" className="nav__link active-link">Trending</Link>
            <Link to="/new-updates" className="nav__item nav__link active-link">Mới cập nhật</Link>
            {isAuthenticated ? (
              <Link to="/following" className="nav__item nav__link active-link">Theo dõi</Link>
            ) : (
              <a id="follow" className="nav__item nav__link active-link" onClick={() => alert("Login to follow!")}>Theo dõi</a>
            )}
            {isAuthenticated ? (
              <Link to="/history" className="nav__item nav__link active-link">Lịch sử</Link>
            ) : (
              <a id="history" className="nav__item nav__link active-link" onClick={() => alert("Login to see history!")}>Lịch sử</a>
            )}
            <a href="https://www.facebook.com/share/fFgCruNduDrskWBa/" className="nav__item nav__link active-link">Fanpage</a>
            <div className="nav__buttons nav__buttons-Pre" style={{ marginLeft: '2.5rem' }}>
              <Link to="/premium"><i className="fa-solid fa-crown"></i><span>Try</span> Premium</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;