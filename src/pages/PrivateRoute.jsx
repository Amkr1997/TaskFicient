import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.authSlice);

  return isAuthenticated ? element : <Navigate to={"/login"} />;
};

export default PrivateRoute;
