import { Link } from "react-router-dom";
import styles from "../css/navbar.module.css";

const Navbar = () => {
  return (
    <>
      <header className={`${styles.navbar} p-3`}>
        <h1 className="text-center fw-bold m-0 pt-1 fs-2">
          DashBoard{" "}
          <span className="fs-5 fw-medium fst-italic">
            <span className="fs-6">by</span> Work
            <span className={`${styles.navHeading}`}>Asana</span>
          </span>
        </h1>
      </header>

      <nav
        className={`navbar navbar-expand-sm bg-body-tertiary my-2 ${styles.navbarResponsive}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h1 className="text-center fw-bold m-0 pt-1 fs-2">
              DashBoard{" "}
              <span className="fs-5 fw-medium fst-italic">
                <span className="fs-6">by</span> Work
                <span className={`${styles.navHeading}`}>Asana</span>
              </span>
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link fs-4 fw-semibold" to="/">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4 fw-semibold" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4 fw-semibold" to="/report">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4 fw-semibold" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
