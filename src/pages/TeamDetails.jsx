import { Link, useLocation, useParams } from "react-router-dom";
import styles from "../css/projectDetails.module.css";
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
  useLazyGetTaskFilteredQuery,
} from "../features/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Filters from "../components/Filters";
import { useState } from "react";

const TeamDetails = () => {
  const [newTeam, setNewTeam] = useState("");
  const {
    data: tasks,
    isLoading: taskIsLoading,
    isError: taskHasError,
    error: taskError,
  } = useGetTaskQuery();
  const { teamId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [deleteTask] = useDeleteTaskMutation();
  const [fetchTasks] = useLazyGetTaskFilteredQuery();

  const teamTasks = tasks?.foundData?.filter(
    (task) => task.team._id === teamId
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
            <div className={`${styles.functionality}`}>
              <div
                className={`w-50 mx-auto pt-1 pb-3 ${styles.addTaskContainer}`}
              >
                <Link
                  to={"/add/?mode=task"}
                  className={`${styles.createTaskBtn} fw-medium fs-6 w-50`}
                >
                  Add New Task
                </Link>
              </div>
            </div>
            <Filters
              setNewTeam={setNewTeam}
              fetchTasks={fetchTasks}
              teamTasks={teamTasks}
            />
            <h2 className="py-2 ps-4">{state} Tasks:</h2>

            {teamTasks?.length >= 1 ? (
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
                    {taskHasError && <h1>{taskError}</h1>}
                    {!taskIsLoading && !newTeam
                      ? teamTasks?.map((task, index) => {
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
                      : newTeam?.map((task, index) => {
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
            ) : (
              <>
                <h3 className="mt-4 text-center">No Tasks Available</h3>
                <br />
                <h5 className="text-center text-secondary">
                  Add one from below
                </h5>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamDetails;
