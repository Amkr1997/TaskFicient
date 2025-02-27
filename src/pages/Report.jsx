import styles from "../css/workspace.module.css";
import { useGetTaskQuery } from "../features/apiSlice";
import { useEffect, useState } from "react";
import { defaults, Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Spinner from "../components/Spinner";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 18;
defaults.plugins.title.color = "#212529";

const Report = () => {
  const [allCompletedTasks, setAllCompletedTasks] = useState([]);
  const [taskOwners, setTasksOwners] = useState();
  const [allTasks, setAllTasks] = useState([]);
  const taskNames = ["Completed Tasks", "Pending Tasks"];
  const { data: tasks, isLoading } = useGetTaskQuery();

  const handleChartTask = () => {
    const completedTasks = tasks?.foundData?.filter(
      (task) => task.status === "Completed"
    );

    const pendingTasks = tasks?.foundData?.filter(
      (task) => task.status !== "Completed"
    );

    setAllTasks([completedTasks?.length, pendingTasks?.length]);
  };

  const handleClosedTask = () => {
    const newTasks = tasks?.foundData?.filter(
      (task) => task.status === "Completed"
    );
    const owners = newTasks?.flatMap((task) => task.owners);

    setAllCompletedTasks(newTasks);
    setTasksOwners(owners);
  };

  useEffect(() => {
    handleChartTask();
    handleClosedTask();
  }, [tasks]);

  return (
    <>
      <section className={`container w-100 m-0 ${styles.workspaceSec}`}>
        <h2
          className={`text-center py-4 display-6 fw-medium ${styles.topHeading}`}
        >
          Reports
        </h2>

        <div className="row my-3">
          <div className="col-12 col-lg-6 mb-4" style={{ height: "50vh" }}>
            <div className="card h-100">
              <div className="card-body">
                {!isLoading ? (
                  <Doughnut
                    data={{
                      labels: taskNames?.map((name) => name),
                      datasets: [
                        {
                          label: "Tasks",
                          data: allTasks?.map((data) => data),
                          borderWidth: 1,
                          backgroundColor: ["#3bc9db", "#1098ad"],
                          borderColor: ["#3bc9db", "#1098ad"],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          text: "Pending and Completed Tasks shown",
                        },
                      },
                    }}
                  />
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 mb-4" style={{ height: "50vh" }}>
            <div className="card h-100">
              {!isLoading ? (
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="text-center">
                    <h2 className="fs-2 m-0">Total Tasks Completed</h2>
                    <span className="fs-1 fw-bold" style={{ color: "#1098ad" }}>
                      {
                        tasks?.foundData?.filter(
                          (task) => task.status === "Completed"
                        ).length
                      }
                    </span>
                  </div>
                  <hr />

                  <div className="text-center">
                    <h2 className="fs-2 m-0">Total Tasks Pending</h2>
                    <span className="fs-1 fw-bold" style={{ color: "#1098ad" }}>
                      {
                        tasks?.foundData?.filter(
                          (task) => task.status !== "Completed"
                        ).length
                      }
                    </span>
                  </div>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </div>

          <div className="card mx-auto my-4">
            <div className="card-head py-3">
              <h2 className="m-0 text-center text-primary-emphasis fw-normal">
                Completed Task Details
              </h2>
            </div>

            <div className="card-body">
              <h3>Tasks Closed By Owner-:</h3>
              <table className="table table-warning">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tasks</th>
                    <th scope="col">Owner Names</th>
                  </tr>
                </thead>
                <tbody>
                  {allCompletedTasks?.map((task, index) => {
                    return (
                      <tr key={task._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{task?.name}</td>
                        <td>
                          {task?.owners
                            ?.filter((ownerOne) => {
                              return taskOwners?.some((owner) => {
                                return owner._id === ownerOne._id;
                              });
                            })
                            .map((owners) => owners?.name)
                            .join(", ")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="card-body">
              <h3>Tasks Closed By Project-:</h3>
              <table className="table table-warning">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tasks</th>
                    <th scope="col">Project Names</th>
                  </tr>
                </thead>
                <tbody>
                  {allCompletedTasks?.map((task, index) => {
                    return (
                      <tr key={task._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{task?.name}</td>
                        <td>{task?.project?.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="card-body">
              <h3>Tasks Closed By Team-:</h3>
              <table className="table table-warning">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tasks</th>
                    <th scope="col">Team Names</th>
                  </tr>
                </thead>
                <tbody>
                  {allCompletedTasks?.map((task, index) => {
                    return (
                      <tr key={task._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{task?.name}</td>
                        <td>{task?.team?.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Report;
