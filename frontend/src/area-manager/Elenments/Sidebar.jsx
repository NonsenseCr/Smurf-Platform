
import styles from "../styles/styleAdmin.module.css"; // Import CSS Module

const Sidebar = () => {
  return (
    <aside className={styles.sidebar} id="sidebar">
      <div className={`${styles.sidebarInner} slimscroll`}>
        <div id="sidebar-menu" className={styles.sidebarMenu}>
          <ul>
            {/* Dashboard */}
            <li className={styles.active}>
              <a href="/manager">
                <img src="/img/icons/dashboard.svg" alt="img" />
                <span>DashBoard</span>
              </a>
            </li>

            {/* Upload Data */}
            <li className={styles.submenu} style={{ textDecoration: "none" }}>
              <a href="#uploadData">
                <img src="/img/icons/product.svg" alt="img" />
                <span> Upload Data</span>
                <span className={styles.menuArrow}></span>
              </a>
              <ul>
                <li>
                  <a href="/manager/comics/add">
                    <i className="fa-solid fa-layer-group"></i> Upload Comic
                  </a>
                </li>
                <li>
                  <a href="/manager/authors/add">
                    <i className="fa-solid fa-layer-group"></i> Upload Author
                  </a>
                </li>
                <li>
                  <a href="/manager/types/add">
                    <i className="fa-solid fa-layer-group"></i> Upload Comic Type
                  </a>
                </li>
                <li>
                  <a href="/manager/services/add">
                    <i className="fa-brands fa-shopify"></i> Create Service Pack
                  </a>
                </li>
                <li>
                  <a href="/manager/staffs/register">
                    <i className="fa-solid fa-person-breastfeeding"></i> Create User-Staff
                  </a>
                </li>
              </ul>
            </li>

            {/* Manage Service Data */}
            <li className={styles.submenu} style={{ textDecoration: "none" }}>
              <a href="#manageServiceData">
                <img src="/img/icons/time.svg" alt="img" />
                <span> Manage Service Data</span>
                <span className={styles.menuArrow}></span>
              </a>
              <ul>
                <li>
                  <a href="/manager/comics/list">
                    <i className="fa-solid fa-list"></i> Comics List
                  </a>
                </li>
                <li>
                  <a href="/manager/authors/list">
                    <i className="fa-solid fa-list"></i> Author List
                  </a>
                </li>
                <li>
                  <a href="/manager/types/list">
                    <i className="fa-solid fa-list"></i> Comic-Types List
                  </a>
                </li>
                <li>
                  <a href="/manager/services/list">
                    <i className="fa-solid fa-list"></i> Service Pack
                  </a>
                </li>
                <li>
                  <a href="/manager/customers/list">
                    <i className="fa-solid fa-list"></i> Customers List
                  </a>
                </li>
                <li>
                  <a href="/manager/orders/list">
                    <i className="fa-solid fa-list"></i> Payment-Order List
                  </a>
                </li>
                <li>
                  <a href="/manager/staffs/list">
                    <i className="fa-solid fa-list"></i> Staffs List
                  </a>
                </li>
              </ul>
            </li>

            {/* Manage Config */}
            <li className={styles.submenu} style={{ textDecoration: "none" }}>
              <a href="#manageConfig">
                <img src="/img/icons/settings.svg" alt="img" />
                <span> Manage Config</span>
                <span className={styles.menuArrow}></span>
              </a>
              <ul>
                <li>
                  <a href="/manager/staffs/rbac">
                    <i className="fa-solid fa-id-card-clip"></i> Role-Base Config List
                  </a>
                </li>
                <li>
                  <a href="/manager/web/config">
                    <i className="fa-solid fa-laptop-code"></i> Website Config List
                  </a>
                </li>
                <li>
                  <a href="/manager/services/config">
                    <i className="fa-solid fa-coins"></i> Service Config
                  </a>
                </li>
                <li>
                  <a href="/manager/web/about">
                    <i className="fa-solid fa-code-branch"></i> About Manager Site
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img
                      src="/images/icon logo.png"
                      alt="Smurf Manga Site"
                      style={{ height: "1em", marginRight: "8px" }}
                    />
                    Smurf Manga Site
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
