import styles from "../styles/styleAdmin.module.css"; // Import CSS module

const AdminFooter = () => {
  return (
    <footer className={styles.footer}>
      <div>
        &copy; {new Date().getFullYear()} - Smurf Manga Manager Project. All rights reserved.{" "}
        <a href="/BoTruyen/Index" className={styles.footerLink}>
          Smurf Manga Site <i className="fa-solid fa-location-arrow"></i>
        </a>
      </div>
      <div className={styles.footerIcons}>
        <a href="https://github.com" title="GitHub">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://facebook.com" title="Facebook">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="https://discord.com" title="Discord">
          <i className="fa-brands fa-discord"></i>
        </a>
      </div>
    </footer>
  );
};

export default AdminFooter;
