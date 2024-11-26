import { Link } from "react-router-dom";
import "../../styles/styleLogin.css"; 

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="nav__logo">
        <img
          className="nav__logo-img"
          src="/images/logo2.png"
          alt="Logo website"
        />
      </Link>
    </header>
  );
};

export default Header;
