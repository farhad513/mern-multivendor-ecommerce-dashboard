import { useRoutes } from "react-router-dom";

const Routes = ({ allRoutes }) => {
  const routes = useRoutes([...allRoutes]);
  return routes;
};

export default Routes;
