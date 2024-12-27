import { NavLink, useLocation } from "react-router-dom";
import styles from "../css/explore.module.css";
import { FaChartPie } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

const Explore = () => {
  const location = useLocation();

  return (
    <section className={`ps-3 pt-2 pb-4 ${styles.exploreSec}`}>
      <h2 className={`py-2 pe-5 display-5 fw-medium ${styles.topHeading}`}>
        Explore
      </h2>

      {!location.pathname.includes("projectDetails") &&
        !location.pathname.includes("add") &&
        !location.pathname.includes("taskDetails") && (
          <ul className={`ps-2 ${styles.exploreList}`}>
            <li className={`ps-1 py-2 ${styles.exploreItem}`}>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `fs-3 ps-1 py-2 pe-0 fw-medium w-100 d-flex align-items-center justify-content-around ${
                    isActive ? styles.itemSelected : styles.exploreHeading
                  }`
                }
              >
                <span>Projects</span>
                <GoProjectSymlink className="fs-2" />
              </NavLink>
            </li>
            <li className={`ps-1 py-2 ${styles.exploreItem}`}>
              <NavLink
                to={"/teams"}
                className={({ isActive }) =>
                  `fs-3 ps-1 py-2 pe-0 fw-medium w-100 d-flex align-items-center justify-content-around ${
                    isActive ? styles.itemSelected : styles.exploreHeading
                  }`
                }
              >
                <span>Teams</span>
                <BsPeopleFill className="fs-2" />
              </NavLink>
            </li>
            <li className={`ps-1 py-2 ${styles.exploreItem}`}>
              <NavLink
                to={"/report"}
                className={({ isActive }) =>
                  `fs-3 ps-1 py-2 pe-0 fw-medium w-100 d-flex align-items-center justify-content-around ${
                    isActive ? styles.itemSelected : styles.exploreHeading
                  }`
                }
              >
                <span>Reports</span>
                <FaChartPie className="fs-2" />
              </NavLink>
            </li>
            <li className={`ps-1 py-2 ${styles.exploreItem}`}>
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  `fs-3 ps-1 py-2 pe-0 fw-medium w-100 d-flex align-items-center justify-content-around ${
                    isActive ? styles.itemSelected : styles.exploreHeading
                  }`
                }
              >
                <span>Profile</span>
                <BsPersonCircle className="fs-2" />
              </NavLink>
            </li>
          </ul>
        )}

      {(location.pathname.includes("projectDetails") ||
        location.pathname.includes("add") ||
        location.pathname.includes("taskDetails")) && (
        <ul className={`ps-2 ${styles.exploreList}`}>
          <li className={`ps-1 py-2 ${styles.exploreItem}`}>
            <NavLink
              to={"/"}
              className={`fs-5 ps-1 py-2 pe-5 fw-medium w-100 ${styles.itemSelected}`}
            >
              Back to Projects
            </NavLink>
          </li>
        </ul>
      )}
    </section>
  );
};

export default Explore;
