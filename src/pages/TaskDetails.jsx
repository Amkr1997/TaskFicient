import styles from "../css/taskDetails.module.css";
import { useParams } from "react-router-dom";
import { useGetTaskQuery, useUpdateTaskMutation } from "../features/apiSLice";

const TaskDetails = () => {
  const { data: tasks } = useGetTaskQuery();
  const { taskId } = useParams();
  const [updateTask] = useUpdateTaskMutation();
  const taskDetails = tasks?.foundData?.find((task) => task._id === taskId);

  const handleTaskComplete = async (task) => {
    try {
      await updateTask({
        ...task,
        status: "Completed",
        tags: ["Completed"],
        timeToComplete: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`container m-0 ${styles.workspaceSec}`}>
        <div className="row">
          <h2 className="pt-4 pb-2 text-start fs-2 fw-bold">
            Task:{" "}
            <span className="fw-normal text-primary">{taskDetails?.name}</span>
          </h2>

          <div className="col-md-12 col-lg-8 py-2">
            <div className="d-flex align-items-center justify-content-between py-4">
              <h3 className="text-start flex-fill">Task Details</h3>
              {taskDetails?.status !== "Completed" ? (
                <button
                  className={`${styles.createTaskBtn} flex-fill fw-medium fs-6`}
                  onClick={() => handleTaskComplete(taskDetails)}
                >
                  Mark Complete
                </button>
              ) : (
                <button
                  className={`${styles.disabledBtn} flex-fill fw-medium fs-6`}
                  onClick={() => handleTaskComplete(taskDetails)}
                  disabled
                >
                  Already Completed
                </button>
              )}
            </div>

            <ul className="list-group text-start">
              <li className="list-group-item">
                <span className="fs-5 fw-semibold">Project Name:</span>
                <span className="fs-5 fw-semibold">
                  {" "}
                  {taskDetails?.project?.name}
                </span>
              </li>

              <li className="list-group-item">
                <span className="fs-5 fw-semibold">Team Name:</span>
                <span className="fs-5 fw-semibold">
                  {" "}
                  {taskDetails?.team?.name}
                </span>
              </li>

              <li className="list-group-item">
                <span className="fs-5 fw-semibold">Owners:</span>
                <span className="fs-5 fw-semibold">
                  {" "}
                  {taskDetails?.owners.length > 1
                    ? taskDetails?.owners.map((owner) => owner.name).join(", ")
                    : taskDetails?.owners[0].name}
                </span>
              </li>

              <li className="list-group-item">
                <span className="fs-5 fw-semibold">Tags:</span>
                <span className="fs-5 fw-semibold">
                  {" "}
                  {taskDetails?.tags?.map((tag) => `#${tag}`).join(", ")}
                </span>
              </li>

              <li className="list-group-item">
                <span className="fs-5 fw-semibold">Due Date:</span>
                <span className="fs-5 fw-semibold">
                  {" "}
                  {new Date().getDate() + taskDetails?.timeToComplete}/
                  {new Date().getMonth() + 1}/{new Date().getFullYear()}
                </span>
              </li>
            </ul>

            <div className={`py-5 ${styles.functionality}`}>
              <div
                className={`d-flex flex-column align-items-center w-100 mx-auto ${styles.utilityContainer}`}
              >
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <h5>
                    Status:{" "}
                    <span className="badge text-bg-warning">
                      {taskDetails?.status}
                    </span>
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <h5>
                    Time Remaining:{" "}
                    <span className="badge text-bg-warning">
                      {taskDetails?.timeToComplete} Days
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
