import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/addTaskBtn.module.css";
import { useLoginMutation } from "../features/apiSlice";
import { useDispatch } from "react-redux";
import { loginReducer } from "../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginForm] = useLoginMutation();
  const dispatch = useDispatch();

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
      const response = await loginForm(formData).unwrap();

      dispatch(loginReducer(response));
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error?.data?.error || "Login failed");
      console.log(error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <section className="container">
        <div className="row mt-4">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 px-sm-0 px-4">
            <h2 className="py-2 text-center display-3 fw-medium">
              Log<span className="text-primary">In</span>
            </h2>
            <form onSubmit={submitHandler}>
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
                Log-In
              </button>
            </form>
            <p className="gap-2 py-4 fs-4 m-0 d-flex align-items-center justify-content-center">
              New User{" "}
              <Link to={"/register"} className="btn btn-outline-primary btn-sm">
                Go to Sign Up
              </Link>
            </p>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </section>
    </>
  );
};

export default Login;
