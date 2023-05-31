import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  console.log(Component);
  useEffect(() => {
    console.log(Component);
    if (window.localStorage.getItem("user_data") === null) {
      navigate("/login",{replace:true});
    }
  });
  return <Component />;
};

export default ProtectedRoute;
