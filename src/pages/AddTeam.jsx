import { useEffect, useState } from "react";
import styles from "../css/addTaskBtn.module.css";
import { toast } from "react-toastify";
import {
  useAddTeamMutation,
  useUpdateTeamMutation,
} from "../features/apiSlice";
import { useLocation } from "react-router-dom";

const AddTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [addTeam] = useAddTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const { state } = useLocation();

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
        const response = await addTeam(formData).unwrap();
        toast.success(response);
      } catch (error) {
        toast.error("Cannot add team");
        console.log(error);
      }
    } else if (state) {
      try {
        console.log(state._id);
        const response = await updateTeam({
          ...formData,
          _id: state._id,
        }).unwrap();

        toast.success(response?.message);
      } catch (error) {
        toast.error(error);
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
      <h2 className="py-2">{!state ? "Create New Team" : "Edit Team"}</h2>
      <form onSubmit={submitHandler}>
        <div className="my-2">
          <label className="form-label">Name:</label>
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
          {!state ? "Create Team" : "Update Team"}
        </button>
      </form>
    </>
  );
};

export default AddTeam;
