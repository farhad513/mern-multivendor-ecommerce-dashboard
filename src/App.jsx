import { useEffect, useState } from "react";
import Routes from "./router/routes";
import publicRoutes from "./router/Routes/publicRoutes";
import { getRoutes } from "./router/Routes/index";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/reducers/authReducer";
function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [allRoutes, setRoutes] = useState([...publicRoutes]);
  // console.log(allRoutes);
  useEffect(() => {
    const routes = getRoutes();
    setRoutes([...allRoutes, routes]);
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token]);
  return <Routes allRoutes={allRoutes} />;
}

export default App;
