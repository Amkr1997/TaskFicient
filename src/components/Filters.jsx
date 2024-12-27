import { useState } from "react";
import {
  useGetAllUsersQuery,
  useGetProjectsQuery,
  useGetTagsQuery,
  useGetTeamsQuery,
} from "../features/apiSlice";

const Filters = ({
  fetchTasks,
  projectTasks,
  teamTasks,
  setNewProject,
  setNewTeam,
}) => {
  const [filterByOwners, setFilterByOwner] = useState([]);
  const [filterByTeam, setFilterByTeam] = useState([]);
  const [filterByProject, setFilterByProject] = useState([]);
  const [filterByTags, setFilterByTags] = useState([]);

  const {
    data: users,
    isLoading: userIsLoading,
    isError: userHasError,
    error: userError,
  } = useGetAllUsersQuery();

  const {
    data: teams,
    isLoading: teamIsLoading,
    isError: teamHasError,
    error: teamError,
  } = useGetTeamsQuery();

  const {
    data: projects,
    isLoading: projectIsLoading,
    isError: projectHasError,
    error: projectError,
  } = useGetProjectsQuery();

  const {
    data: tags,
    isLoading: tagIsLoading,
    isError: tagHasError,
    error: tagError,
  } = useGetTagsQuery();

  const handleFilters = (e) => {
    const { value, name, checked } = e.target;

    if (name === "owners") {
      setFilterByOwner((prev) =>
        checked
          ? [...prev, value]
          : [...prev].filter((owner) => owner !== value)
      );
    }
    if (name === "team") {
      setFilterByTeam((prev) =>
        checked ? [...prev, value] : [...prev].filter((team) => team !== value)
      );
    }
    if (name === "projects") {
      setFilterByProject((prev) =>
        checked
          ? [...prev, value]
          : [...prev].filter((project) => project !== value)
      );
    }
    if (name === "tags") {
      setFilterByTags((prev) =>
        checked ? [...prev, value] : [...prev].filter((tag) => tag !== value)
      );
    }
  };

  const submitFilters = async () => {
    try {
      const queryParams = new URLSearchParams({
        owners: filterByOwners || [],
        team: filterByTeam || [],
        project: filterByProject || [],
        tags: filterByTags || [],
      }).toString();

      const response = await fetchTasks(queryParams).unwrap();

      //console.log(response);

      if (location.pathname.includes("/projectDetails")) {
        const tasks = response?.foundData?.filter((taskOne) => {
          return projectTasks?.some((taskTwo) => {
            return taskTwo?.project?._id === taskOne?.project?._id;
          });
        });

        setNewProject(tasks);
      }

      if (location.pathname.includes("/teams")) {
        const tasks = response?.foundData?.filter((taskOne) => {
          return teamTasks?.some((taskTwo) => {
            return taskTwo?.team?._id === taskOne?.team?._id;
          });
        });

        setNewTeam(tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container py-2">
      <div className={`card border border-0`}>
        <div className="card-body p-0 d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <div>
            <div className="my-1">
              <div className="d-flex align-items-center justify-content-start gap-1 flex-wrap">
                <h6 className="pe-2 m-0 d-inline">Filter By Owners: </h6>
                {userHasError && <h1>{userError}</h1>}
                {!userIsLoading ? (
                  users?.allUsers?.map((user) => {
                    return (
                      <label key={user._id}>
                        <input
                          type="checkbox"
                          className="ps-2"
                          value={user._id}
                          name="owners"
                          checked={filterByOwners.includes(user._id)}
                          onChange={handleFilters}
                        />{" "}
                        {user.name}
                      </label>
                    );
                  })
                ) : (
                  <p className="text-uppercase fw-bold fs-6 m-0">loading...</p>
                )}
              </div>
            </div>
            {location.pathname.includes("/projectDetails") && (
              <div className="my-1">
                <div className="d-flex align-items-center justify-content-start gap-1 flex-wrap">
                  <h6 className="pe-2 m-0 d-inline">Filter By Team: </h6>
                  {teamHasError && <h1>{teamError}</h1>}
                  {!teamIsLoading ? (
                    teams?.allTeams?.map((team) => {
                      return (
                        <label key={team._id}>
                          <input
                            type="checkbox"
                            className="ps-2"
                            value={team._id}
                            name="team"
                            checked={filterByTeam.includes(team._id)}
                            onChange={handleFilters}
                          />{" "}
                          {team.name}
                        </label>
                      );
                    })
                  ) : (
                    <p className="text-uppercase fw-bold fs-6 m-0">
                      loading...
                    </p>
                  )}
                </div>
              </div>
            )}
            {location.pathname.includes("/teams") && (
              <div className="my-1">
                <div className="d-flex align-items-center justify-content-start gap-1 flex-wrap">
                  <h6 className="pe-2 m-0 d-inline">Filter By Project: </h6>
                  {projectHasError && <h1>{projectError}</h1>}
                  {!projectIsLoading ? (
                    projects?.allProjects?.map((project) => {
                      return (
                        <label key={project._id}>
                          <input
                            type="checkbox"
                            className="ps-2"
                            value={project._id}
                            name="projects"
                            checked={filterByProject.includes(project._id)}
                            onChange={handleFilters}
                          />{" "}
                          {project.name}
                        </label>
                      );
                    })
                  ) : (
                    <p className="text-uppercase fw-bold fs-6 m-0">
                      loading...
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="my-1">
              <div className="d-flex align-items-center justify-content-start gap-1 flex-wrap">
                <h6 className="pe-2 m-0 d-inline">Filter By Tags: </h6>
                {tagHasError && <h1>{tagError}</h1>}
                {!tagIsLoading ? (
                  tags?.allTags?.map((tag) => {
                    return (
                      <label key={tag._id}>
                        <input
                          type="checkbox"
                          className="ps-2"
                          value={tag.name}
                          name="tags"
                          checked={filterByTags.includes(tag.name)}
                          onChange={handleFilters}
                        />{" "}
                        {tag.name}
                      </label>
                    );
                  })
                ) : (
                  <p className="text-uppercase fw-bold fs-6 m-0">loading...</p>
                )}
              </div>
            </div>
          </div>

          <button className="btn btn-danger me-5" onClick={submitFilters}>
            Filter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filters;
