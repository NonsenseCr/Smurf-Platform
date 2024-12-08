import styles from "../styles/styleAdmin.module.css"; 

const AdminHeader = () => {
  const user = "Admin User"; 
  const userId = "12345";

  return (
    <header className={styles.header}>
      <div className={`${styles.headerLeft} ${styles.active}`}>
        <a href="/manager" className={styles.logo}>
          <img src="/images/logo4.png" alt="Logo" />
        </a>
        <a href="/manager" className={styles.logoSmall}>
          <img src="/img/iconManga.png" alt="Small Logo" />
        </a>
        <a id="toggle_btn" href="#" onClick={(e) => e.preventDefault()}></a>
      </div>

      <a id="mobile_btn" className={styles.mobileBtn} href="#sidebar">
        <span className={styles.barIcon}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>

      <ul className={`${styles.nav} ${styles.userMenu}`}>
        <li>
          <span>
            <i className="fa-solid fa-face-smile"></i> User: {user}
          </span>
          <div className={styles}>
            <a href={`/manager/users/${userId}`}>
              <i className="fa-solid fa-user"></i> My Account
            </a>
            <a href="/">
              <i className="fa-solid fa-house"></i> Main Site
            </a>
            <a href="/logout">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </a>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
