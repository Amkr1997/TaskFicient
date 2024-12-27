import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../css/projectDetails.module.css";
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
  useLazyGetTaskFilteredQuery,
} from "../features/apiSlice";
import { toast } from "react-toastify";
import Filters from "../components/Filters";
import { useState } from "react";
import Loader from "../components/Loader";

const ProjectDetails = () => {
  const [newProject, setNewProject] = useState("");
  const {
    data: tasks,
    isLoading: taskIsLoading,
    isError: taskHasError,
    error: taskError,
  } = useGetTaskQuery();
  const { state } = useLocation();
  const { projectdId } = useParams();
  const [deleteTask] = useDeleteTaskMutation();
  const [fetchTasks] = useLazyGetTaskFilteredQuery();
  const navigate = useNavigate();

  const projectTasks = tasks?.foundData?.filter(
    (task) => task.project._id === projectdId
  );

  const handleDelete = async (taskId) => {
    try {
      const response = await deleteTask(taskId);

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error("Cannot delete task");
      console.log(error);
    }
  };

  return (
    <>
      <section className="row">
        <div className={`container w-100 m-0 ${styles.workspaceSec}`}>
          <div className="row">
            <div
              className={`pb-4 d-flex align-items-center justify-content-center gap-2 ${styles.functionality}`}
            >
              <Link
                to={"/add/?mode=task"}
                className={`${styles.createTaskBtn} fw-medium fs-6`}
              >
                Add New Task
              </Link>
            </div>
            <Filters
              fetchTasks={fetchTasks}
              setNewProject={setNewProject}
              projectTasks={projectTasks}
            />
            <h3 className="py-1 ps-4">Project: {state}</h3>
            <h4 className="mb-0">Task list:</h4>

            {taskIsLoading ? (
              <Loader />
            ) : (
              <div className="table-responsive-md tasks">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Status</th>
                      <th scope="col">Due</th>
                      <th scope="col">Owner</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!newProject
                      ? projectTasks?.map((task, index) => {
                          return (
                            <tr key={task._id}>
                              <th scope="row">{index + 1}</th>
                              <td className="fw-medium">
                                {" "}
                                <Link
                                  to={`/taskDetails/${task._id}`}
                                  className={`${styles.taskDetails}`}
                                >
                                  {task.name}
                                </Link>
                              </td>
                              <td
                                className={`fw-medium ${
                                  (task.status === "Todo" && "text-warning") ||
                                  (task.status === "In Progress" &&
                                    "text-danger") ||
                                  (task.status === "Completed" &&
                                    "text-success") ||
                                  (task.status === "Blocked" && "text-dark")
                                }`}
                              >
                                {task.status}
                              </td>
                              <td>
                                {task.status === "Completed" ? (
                                  "-/no dues/-"
                                ) : (
                                  <>
                                    {new Date().getDate() + task.timeToComplete}
                                    /{new Date().getMonth() + 1}/
                                    {new Date().getFullYear()}
                                  </>
                                )}
                              </td>
                              <td>
                                {task.owners.length > 1
                                  ? task.owners
                                      .map((owner) => owner.name)
                                      .join(", ")
                                  : task.owners[0].name}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm me-2"
                                  onClick={() => handleDelete(task._id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    navigate("/add?mode=task", { state: task })
                                  }
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : newProject?.map((task, index) => {
                          return (
                            <tr key={task._id}>
                              <th scope="row">{index + 1}</th>
                              <td className="fw-medium">
                                {" "}
                                <Link
                                  to={`/taskDetails/${task._id}`}
                                  className={`${styles.taskDetails}`}
                                >
                                  {task.name}
                                </Link>
                              </td>
                              <td
                                className={`fw-medium ${
                                  (task.status === "Todo" && "text-warning") ||
                                  (task.status === "In Progress" &&
                                    "text-danger") ||
                                  (task.status === "Completed" &&
                                    "text-success") ||
                                  (task.status === "Blocked" && "text-dark")
                                }`}
                              >
                                {task.status}
                              </td>
                              <td>
                                {new Date().getDate() + task.timeToComplete}/
                                {new Date().getMonth() + 1}/
                                {new Date().getFullYear()}
                              </td>
                              <td>
                                {task.owners.length > 1
                                  ? task.owners
                                      .map((owner) => owner.name)
                                      .join(", ")
                                  : task.owners[0].name}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm me-2"
                                  onClick={() => handleDelete(task._id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    navigate("/add?mode=task", { state: task })
                                  }
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetails;
