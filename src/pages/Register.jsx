import { useState } from "react";
import styles from "../css/addTaskBtn.module.css";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../features/apiSLice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUp] = useSignupMutation();

  const changeHandler = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await signUp(formData);
    } catch (error) {
      console.log(error);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="container">
      <div className="row mt-4">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 px-sm-0 px-4">
          <h2 className="py-2 text-center display-3 fw-medium">
            Sign<span className="text-primary">Up</span>
          </h2>
          <form onSubmit={submitHandler}>
            <div className="my-2">
              <label className="form-label">Name:</label>
              <input
                type="text"
                required
                className="form-control"
                name="name"
                value={formData.name}
                onChange={changeHandler}
              />
            </div>
            <div className="my-2">
              <label className="form-label">Email:</label>
              <input
                type="email"
                required
                className="form-control"
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />
            </div>
            <div className="my-2">
              <label className="form-label">Password:</label>
              <input
                type="password"
                required
                className="form-control"
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </div>

            <button type="submit" className={`my-3 ${styles.createTaskBtn}`}>
              Sign-Up
            </button>
          </form>

          <p className="gap-2 py-4 fs-4 m-0 d-flex align-items-center justify-content-center">
            Already a User{" "}
            <Link to={"/login"} className="btn btn-outline-primary btn-sm">
              Go to Login
            </Link>
          </p>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </section>
  );
};

export default Register;
