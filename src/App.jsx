import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectDetails from "./pages/ProjectDetails";
import Teams from "./pages/Teams";
import Report from "./pages/Report";
import Project from "./pages/Project";
import TaskDetails from "./pages/TaskDetails";
import TeamDetails from "./pages/TeamDetails";
import AddForm from "./pages/AddForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Refresherhandler from "./components/RefresherHandler";
import PrivateRoute from "./pages/PrivateRoute";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Refresherhandler />
          <Routes>
            <Route path="/" element={<PrivateRoute element={<HomePage />} />}>
              <Route path="" element={<Project />}>
                <Route
                  path="projectDetails/:projectdId"
                  element={<ProjectDetails />}
                />
              </Route>
              <Route path="taskDetails/:taskId" element={<TaskDetails />} />
              <Route path="add" element={<AddForm />} />
              <Route path="teams" element={<Teams />}>
                <Route path="teamDetails/:teamId" element={<TeamDetails />} />
              </Route>
              <Route path="report" element={<Report />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
