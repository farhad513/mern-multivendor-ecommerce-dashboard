import MainLayout from "../../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { privateRoute } from "./privateRoutes";

export const getRoutes = () => {
  const allRoute = [];
  privateRoute.map((r) => {
    // console.log(r);
    r.element = <ProtectedRoute route={r}>{r.element}</ProtectedRoute>;
  });
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoute,
  };
};
