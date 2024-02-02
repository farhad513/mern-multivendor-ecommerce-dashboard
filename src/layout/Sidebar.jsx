import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNavs } from "../navigation/index";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { role, successMessage } = useSelector((state) => state.auth);
  const [allNav, setAllNav] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const navs = getNavs(role);
    setAllNav(navs);
  }, [role]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);
  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#22292f80] top-0 left-0 z-50`}
      ></div>
      <div
        className={`w-[250px] fixed bg-[#283046] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[250px] lg:left-0"
        }`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to={"/"}>
            <h1 className="text-3xl text-center">
              E_<span className="text-green-600">ST</span>
              <span className="text-red-600">O</span>
              <span className="text-teal-600">RE</span>
            </h1>
          </Link>
        </div>
        <div className="px-[16px]">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-slate-600 shadow-indigo-500/50 text-white duration-500"
                      : "text-white font-normal duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-2 hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className="text-white font-normal duration-200
                 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-2 hover:pl-4 transition-all w-full mb-1"
              >
                <span>
                  <FiLogOut />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
