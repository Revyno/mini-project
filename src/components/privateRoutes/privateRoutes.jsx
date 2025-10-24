import { Navigate, Outlet } from "react-router-dom";

import Cookies from "js-cookie";

/*! An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. It will either load child routes if the user is Authitecated or will force the user to Navigate to the login page */
const PrivateRoutes = () => {
  const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
