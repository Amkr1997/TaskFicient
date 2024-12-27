import { useEffect, useState } from "react";
import styles from "../css/addTaskBtn.module.css";
import {
  useAddTaskMutation,
  useGetAllUsersQuery,
  useGetProjectsQuery,
  useGetTagsQuery,
  useGetTeamsQuery,
  useUpdateTaskMutation,
} from "../features/apiSLice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const AddTask = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [project, setProject] = useState("");
  const [owner, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [status, setStatus] = useState("");

  const {
    data: teams,
    isLoading: teamIsLoading,
    isError: teamHasError,
    error: teamError,
  } = useGetTeamsQuery();

  const {
    data: users,
    isLoading: userIsLoading,
    isError: userHasError,
    error: userError,
  } = useGetAllUsersQuery();

  const {
    data: projects,
    isLoading: projectIsLoading,
    isError: projectHasError,
    error: projectError,
  } = useGetProjectsQuery();

  const {
    data: allTags,
    isLoading: tagIsLoading,
    isError: tagHasError,
    error: tagError,
  } = useGetTagsQuery();

  const [addTask] = useAddTaskMutation();
  const [editTask] = useUpdateTaskMutation();

  const { state } = useLocation();

  const textChangeHandler = (e) => {
    const { value, name } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "team") {
      setTeam(value);
    } else if (name === "project") {
      setProject(value);
    } else if (name === "status") {
      setStatus(value);
    } else {
      setTimeToComplete(value);
    }
  };

  const arrayChangeHandler = (e) => {
    const { value, name, checked } = e.target;

    if (name === "owner") {
      setOwners((prev) =>
        checked ? [...prev, value] : prev.filter((owner) => owner !== value)
      );
    }

    if (name === "tags") {
      setTags((prev) =>
        checked ? [...prev, value] : prev.filter((tag) => tag !== value)
      );
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!state) {
      try {
        await addTask({
          name,
          project,
          team,
          owners: owner,
          tags,
          timeToComplete,
          status,
        });

        toast.success("Task Created Successfully");
      } catch (error) {
        toast.error("Task was not able to get create");
        console.log(error);
      }
    } else if (state) {
      try {
        const response = await editTask({
          name,
          project,
          team,
          owners: owner,
          tags,
          timeToComplete,
          status,
          _id: state?._id,
        });

        toast.success(response?.data?.message);
      } catch (error) {
        toast.error("Task was not able to edit");
        console.log(error);
      }
    }

    setName("");
    setTeam("");
    setProject("");
    setOwners([]);
    setTags([]);
    setTimeToComplete(0);
    setStatus("");
  };

  useEffect(() => {
    setName(state?.name || "");
    setTimeToComplete(state?.timeToComplete || 0);
  }, [state]);

  return (
    <>
      <h2 className="py-2">{!state ? "Create New Task" : "Edit Task"}</h2>

      {(teamHasError && <h1>{teamError}</h1>) ||
        (userHasError && <h1>{userError}</h1>) ||
        (projectHasError && <h1>{projectError}</h1>)}

      {!teamIsLoading && !userIsLoading && (
        <form onSubmit={submitHandler} className={`${styles.createTaskForm}`}>
          <div className="my-2">
            <label className="form-label">Task Name:</label>
            <input
              type="text"
              className="form-control"
              required
              name="name"
              value={name}
              onChange={textChangeHandler}
            />
          </div>
          <div className="my-2">
            <label className="form-label">Team:</label>
            <select
              className="form-control"
              name="team"
              onChange={textChangeHandler}
            >
              <option>--Select Team--</option>
              {teams?.allTeams?.map((team) => (
                <option key={team._id} value={team._id}>
                  {team?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-2">
            <label className="form-label">Project:</label>
            <select
              className="form-control"
              name="project"
              onChange={textChangeHandler}
            >
              <option>--Select Project--</option>
              {projects?.allProjects?.map((project) => {
                return (
                  <option key={project._id} value={project._id}>
                    {project?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-2">
            <label className="form-check-label py-2">Owners:</label>
            <br />
            {users?.allUsers?.map((user) => {
              return (
                <span key={user._id}>
                  <input
                    type="checkbox"
                    className="form-check-input px-2"
                    checked={owner.includes(user._id)}
                    name="owner"
                    value={user._id}
                    onChange={arrayChangeHandler}
                  />
                  {"  "}
                  <label className="form-label px-1">{user.name}</label>
                </span>
              );
            })}
          </div>
          <div className="my-2">
            <label className="form-check-label py-2">Tags:</label>
            <br />
            {allTags?.allTags?.map((tag) => {
              return (
                <span key={tag._id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="tags"
                    value={tag.name}
                    checked={tags.includes(tag.name)}
                    onChange={arrayChangeHandler}
                  />
                  <label>{tag.name}</label>
                </span>
              );
            })}
          </div>

          <div className="my-2">
            <label className="form-label">Time (Days):</label>
            <input
              type="number"
              required
              name="time"
              value={timeToComplete}
              className="form-control"
              onChange={textChangeHandler}
            />
          </div>

          <div className="my-2">
            <label className="form-label">Status:</label>
            <select
              className="form-control"
              name="status"
              onChange={textChangeHandler}
            >
              <option>--Select Status--</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          <button type="submit" className={`my-3 ${styles.createTaskBtn}`}>
            {!state ? "Create Task" : "Edit Task"}
          </button>
        </form>
      )}
    </>
  );
};

export default AddTask;
