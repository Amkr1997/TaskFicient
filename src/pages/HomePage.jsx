import { Outlet } from "react-router-dom";
import Explore from "../components/Explore";

const HomePage = () => {
  return (
    <main className="container-fluid">
      <section className="row">
        <div className="col-sm-3 col-lg-2 px-0 border border-0">
          <Explore />
        </div>
        <div className={`col-sm-9 col-lg-10`}>
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
