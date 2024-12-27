import styles from "../css/workspace.module.css";

const WorkSpace = () => {
  return (
    <section className={`container w-100 m-0 ${styles.workspaceSec}`}>
      <h2
        className={`text-center py-3 display-6 fw-medium ${styles.topHeading}`}
      >
        WorkSpace
      </h2>

      <div className="row">
        <div className={`${styles.workspaceProject} col-sm-4 col-md-3`}>
          <div className="card border border-0">
            <div className="card-body">
              <h4
                className={`card-heading text-uppercase text-center m-0 ${styles.projectHeading}`}
              >
                Project 1
              </h4>
              <p className="card-text text-center fs-5 m-0">
                Website UI Redesign
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.workspaceProject} col-sm-4 col-md-3`}>
          <div className="card border border-0">
            <div className="card-body">
              <h4
                className={`card-heading text-uppercase text-center m-0 ${styles.projectHeading}`}
              >
                Project 2
              </h4>
              <p className="card-text text-center fs-5 m-0">
                Mobile App Development
              </p>
            </div>
          </div>
        </div>

        <h2 className="pt-5 pb-2 ps-4">My Tasks:</h2>

        <div className="tasks">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Due</th>
                <th scope="col">Owner</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td className="fw-medium">Design Homepage</td>
                <td className="fw-medium text-warning">In Progress</td>
                <td>
                  {new Date().getDate() + 4}/{new Date().getMonth() + 1}/
                  {new Date().getFullYear()}
                </td>
                <td>Alice</td>
                <td>Design</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td className="fw-medium">Develope Landing Page</td>
                <td className="fw-medium text-warning">In Progress</td>
                <td>
                  {new Date().getDate() + 5}/{new Date().getMonth() + 1}/
                  {new Date().getFullYear()}
                </td>
                <td>Dana</td>
                <td>Devlopment</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={`d-flex align-items-center justify-content-between py-5 ${styles.quickAccess}`}
        >
          <div className="d-flex align-items-center justify-content-center gap-3 w-100">
            <p className="m-0 fw-semibold fs-4">Add New Task:</p>
            <button className={`${styles.addTaskBtn} fw-medium fs-5 w-50`}>
              Add
            </button>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-3 w-100">
            <p className="m-0 fw-semibold fs-4">Quick Filters:</p>
            <button className={`${styles.inProgress}`}>In Progress</button>
            <button className={`${styles.completed}`}>Completed</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSpace;
