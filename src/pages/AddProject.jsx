import { useEffect, useState } from "react";
import styles from "../css/addTaskBtn.module.css";
import { toast } from "react-toastify";
import {
  useAddProjectsMutation,
  useUpdateProjectMutation,
} from "../features/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [addProject] = useAddProjectsMutation();
  const [updateProject] = useUpdateProjectMutation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!state) {
      try {
        const response = await addProject(formData).unwrap();
        toast.success(response);
        navigate("/");
      } catch (error) {
        toast.error("Cannot add project now!");
        console.log(error);
      }
    } else if (state) {
      try {
        const response = await updateProject({
          ...formData,
          _id: state._id,
        }).unwrap();

        toast.success(response?.message);
        navigate("/");
      } catch (error) {
        toast.error("Cannot add project now!");
        console.log(error);
      }
    }

    setFormData({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    setFormData({
      name: state?.name || "",
      description: state?.description || "",
    });
  }, [state]);

  return (
    <>
      <h2 className="py-2">{!state ? "Create New Project" : "Edit Project"}</h2>
      <form onSubmit={submitHandler}>
        <div className="my-2">
          <label className="form-label">Project Name:</label>
          <input
            type="text"
            className="form-control"
            required
            name="name"
            value={formData.name}
            onChange={changeHandler}
          />
        </div>
        <div className="my-2">
          <label className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            required
            name="description"
            value={formData.description}
            onChange={changeHandler}
          />
        </div>

        <button type="submit" className={`my-3 ${styles.createTaskBtn}`}>
          {!state ? "Create Project" : "Edit Project"}
        </button>
      </form>
    </>
  );
};

export default AddProject;
