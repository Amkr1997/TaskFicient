import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Refresherhandler = () => {
  const { isAuthenticated } = useSelector((state) => state.authSlice);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, location, isAuthenticated]);

  return <></>;
};

export default Refresherhandler;
