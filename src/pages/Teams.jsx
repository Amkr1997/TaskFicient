import styles from "../css/workspace.module.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDeleteTeamMutation, useGetTeamsQuery } from "../features/apiSlice";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Teams = () => {
  const {
    data: teams,
    isLoading: teamIsLoading,
    isError: teamHasError,
    error: teamError,
  } = useGetTeamsQuery();
  const [deleteTeam] = useDeleteTeamMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = async (teamId) => {
    try {
      const response = await deleteTeam(teamId).unwrap();
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="container-fluid">
        <section className="row">
          <div className={`container w-100 m-0 ${styles.workspaceSec}`}>
            <h4
              className={`text-center pt-1 pb-1 fs-2 fw-medium ${styles.topHeading}`}
            >
              Team Management
            </h4>

            {!location.pathname.includes("teamDetails") && (
              <div className={`${styles.quickAccess} pt-3 pb-4`}>
                <div className="d-flex align-items-center justify-content-center gap-3 w-100">
                  <Link
                    to={"/add/?mode=team"}
                    className={`${styles.createTaskBtn} fw-medium fs-6 w-25`}
                  >
                    Add a Team
                  </Link>
                </div>
              </div>
            )}
            {!location.pathname.includes("teamDetails") ? (
              <div className="row">
                {teamHasError && <h1>{teamError}</h1>}
                {!teamIsLoading ? (
                  teams?.allTeams?.map((team, index) => {
                    return (
                      <div
                        key={team._id}
                        className="col-12 col-sm-6 col-md-4 mb-4"
                      >
                        <div
                          className={`card border border-0 ${styles.cardComponent}`}
                        >
                          <div className="card-body d-flex align-items-center justify-content-between">
                            <div className="flex-fill">
                              <Link
                                state={team.name}
                                to={`teamDetails/${team._id}`}
                                className={`${styles.workspaceProject}`}
                              >
                                <h4
                                  className={`card-heading text-uppercase text-center m-0 ${styles.projectHeading}`}
                                >
                                  Team {index + 1}
                                </h4>
                              </Link>
                              <p className="card-text text-center fs-5 m-0">
                                {team.name}
                              </p>
                            </div>
                            <div className="d-flex flex-column gap-4">
                              <span
                                className={`${styles.deleteBtn}`}
                                onClick={() => handleDelete(team._id)}
                              >
                                <BsFillTrashFill />
                              </span>
                              <span
                                className={`${styles.editBtn}`}
                                onClick={() =>
                                  navigate("/add?mode=team", { state: team })
                                }
                              >
                                <BsPencilSquare />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Teams;
