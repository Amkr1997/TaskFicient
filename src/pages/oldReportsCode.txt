import moment from "moment";
import styles from "../css/workspace.module.css";
import { useGetTaskQuery } from "../features/apiSlice";
import { useEffect, useState } from "react";
import { defaults, Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 18;
defaults.plugins.title.color = "#212529";

const Report = () => {
  const [lastWeekTasks, setLastWeekTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskOwners, setTasksOwners] = useState();
  const [taskProjects, setTaskProjects] = useState();
  const [taskTeam, setTaskTeam] = useState();

  const { data: tasks, isLoading } = useGetTaskQuery();

  const handleCompleteTask = () => {
    const weekCounts = Array(7).fill(0);

    const newFoundTasks = tasks?.foundData?.filter(
      (task) => task.status === "Completed"
    );

    newFoundTasks?.forEach((task) => {
      const createdAt = moment(task.createdAt);
      const todayDate = moment();

      if (
        createdAt.isSameOrAfter(todayDate.clone().subtract(6, "days"), "day")
      ) {
        const dayOfWeek = createdAt.isoWeekday() - 1;
        weekCounts[dayOfWeek]++;
      }
    });

    setLastWeekTasks(weekCounts);
  };

  const handlePendingTasks = () => {
    if (!tasks?.foundData) return;

    const weeklyCount = Array(7).fill(0);

    const pendingTasks = tasks?.foundData?.filter(
      (task) => task.status !== "Completed"
    );

    const totalPendingDays = pendingTasks?.reduce((acc, curr) => {
      const todayDate = moment();
      const createdAt = moment(curr.createdAt);
      const pendingDays = curr.timeToComplete;

      if (
        todayDate.isSameOrBefore(
          createdAt.clone().add(pendingDays, "days"),
          "day"
        )
      ) {
        const dayOfWeek = createdAt.isoWeekday() - 1;
        weeklyCount[dayOfWeek]++;
      }

      const totalPendingDays = (acc += curr.timeToComplete);
      return totalPendingDays;
    }, 0);

    setPendingTasks(weeklyCount);
    setPendingTasksCount(totalPendingDays);
    //console.log(pendingTasksCount);
  };

  const handleClosedTask = () => {
    const newTasks = tasks?.foundData?.filter(
      (task) => task.status === "Completed"
    );

    const owners = newTasks?.flatMap((task) => task.owners);
    const projects = newTasks?.map((task) => task.project);
    const team = newTasks?.map((task) => task.team);

    setCompletedTasks(newTasks);
    setTasksOwners(owners);
    setTaskProjects(projects);
    setTaskTeam(team);
  };

  useEffect(() => {
    handleCompleteTask();
    handlePendingTasks();
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
          <div className="col-12 col-lg-6 mb-4" style={{ height: "40vh" }}>
            <div className="card h-100">
              <div className="card-body p-2 w-100">
                {!isLoading && (
                  <Bar
                    data={{
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                      datasets: [
                        {
                          label: "Completed Tasks",
                          data: lastWeekTasks?.map((taskCount) => taskCount),
                          borderWidth: 1,
                          backgroundColor: ["#4dabf7", "#74c0fc", "#a5d8ff"],
                          barThickness: 28,
                          borderRadius: 3,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: { text: "Tasks completed in the past week" },
                      },
                      scales: {
                        y: {
                          ticks: { beginAtZero: false, stepSize: 1 },
                          min: 0,
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className="col-12 col-lg-6 d-flex flex-column"
            style={{ height: "40vh" }}
          >
            <div className="card h-100">
              <div className="card-body p-2">
                <Bar
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        label: "Pending Tasks",
                        data: pendingTasks?.map((task) => task),
                        borderWidth: 1,
                        backgroundColor: ["#c92a2a", "#f03e3e", "#ff8787"],
                        barThickness: 28,
                        borderRadius: 3,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      title: { text: "Pending Tasks of the Week" },
                    },
                    scales: { y: { min: 0, ticks: { stepSize: 1 } } },
                  }}
                />
              </div>
            </div>
            <div className="card p-2">
              <h2 className="fs-5 d-flex align-items-center justify-content-start gap-4 text-capitalize">
                <span>Total days pending:</span>
                <span>{pendingTasksCount} days</span>
              </h2>
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
                  {completedTasks?.map((task, index) => {
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
                            .map((owners) => owners?.name)}
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
                  {completedTasks?.map((task, index) => {
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
                  {completedTasks?.map((task, index) => {
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
