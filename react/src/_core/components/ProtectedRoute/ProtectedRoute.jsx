import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthContext";
import { IconLoading } from "../../utilities/svg-icons";

const ProtectedRoute = ({ children }) => {
  let auth = useContext(AuthContext);
  let location = useLocation();

  if (auth.isAuthed) {
    return children;
  } else if (auth.isAuthWaiting) {
    return <div><IconLoading width="40" color="gray" className="mx-auto animate-spin mt-10" /></div>
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;