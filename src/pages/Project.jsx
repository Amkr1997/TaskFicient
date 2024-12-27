import styles from "../css/workspace.module.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../features/apiSlice";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";

const Project = () => {
  const {
    data: projects,
    isLoading: projectIsLoading,
    isError: projectHasError,
    error: projectError,
  } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = async (projectId) => {
    try {
      const response = await deleteProject(projectId);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <>
      <section className={`container w-100 m-0 ${styles.workspaceSec}`}>
        <h4
          className={`text-center pt-1 pb-1 fs-2 fw-medium ${styles.topHeading}`}
        >
          WorkSpace
        </h4>

        {!location.pathname.includes("projectDetails") && (
          <div className={`${styles.quickAccess} pt-3 pb-4`}>
            <div className="d-flex align-items-center justify-content-center gap-3 w-100">
              <Link
                to={"/add/?mode=project"}
                className={`${styles.createTaskBtn} fw-medium w-25`}
              >
                Add New Project:
              </Link>
            </div>
          </div>
        )}

        {!location.pathname.includes("projectDetails") ? (
          <div className="row">
            {projectHasError && <h1>{projectError.error}</h1>}
            {!projectIsLoading &&
              projects?.allProjects?.map((project, index) => {
                return (
                  <div
                    key={project._id}
                    className="col-12 col-sm-6 col-lg-4 mb-4"
                  >
                    <div
                      className={`card border border-0 ${styles.cardComponent}`}
                    >
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="flex-fill">
                          <Link
                            to={`/projectDetails/${project._id}`}
                            state={project.name}
                            className={`${styles.workspaceProject}`}
                          >
                            <h4
                              className={`card-heading text-uppercase text-center m-0 ${styles.projectHeading}`}
                            >
                              Project {index + 1}
                            </h4>
                          </Link>
                          <p className="card-text text-center fs-5 m-0">
                            {project.name}
                          </p>
                        </div>
                        <div className="d-flex flex-column gap-4">
                          <span
                            className={`${styles.deleteBtn}`}
                            onClick={() => handleDelete(project._id)}
                          >
                            <BsFillTrashFill />
                          </span>
                          <span
                            className={`${styles.editBtn}`}
                            onClick={() =>
                              navigate("/add?mode=project", { state: project })
                            }
                          >
                            <BsPencilSquare />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <Outlet />
        )}
      </section>
    </>
  );
};

export default Project;
