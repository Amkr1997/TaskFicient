import { useDispatch } from "react-redux";
import { logoutReducer } from "../features/authSlice";
import { toast } from "react-toastify";
import stylesTwo from "../css/profile.module.css";
import {
  useGetSingleUserQuery,
  usePrivateRouteQuery,
} from "../features/apiSLice";
import styles from "../css/workspace.module.css";

const Profile = () => {
  const { data: userId } = usePrivateRouteQuery();
  const { data: userData } = useGetSingleUserQuery(userId, { skip: !userId });
  const dispatch = useDispatch();

  const handleLogoutChange = () => {
    dispatch(logoutReducer());
    toast.success("LoggedOut Successfully");
  };

  return (
    <section className="container">
      <div className="row mt-4">
        <div className="col-sm-2"></div>
        <div className="col-12 col-sm-8">
          <div
            className={`card mb-3 mx-auto ${styles.cardComponent}`}
            style={{ maxWidth: "540px" }}
          >
            <div className="row g-0">
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center py-2">
                <img
                  src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                  alt="profile-pic"
                  className={`${stylesTwo.profilePic} py-2`}
                />
                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={handleLogoutChange}
                >
                  LOGOUT
                </button>
              </div>
              <div className="col-md-8">
                <div className="card-body d-flex flex-column align-items-start justify-content-center">
                  <h5 className="card-title m-0 text-capitalize">
                    Name: {userData?.foundUser?.name}
                  </h5>
                  <br />
                  <h5 className="card-title m-0">
                    Email: {userData?.foundUser?.email}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </section>
  );
};

export default Profile;
