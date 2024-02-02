import React from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";
const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[250px] rounded-md h-[65px] flex justify-between items-center bg-[#283046] text-white px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden bg-indigo-500 hover:shadow-indigo-500/50 justify-center items-center cursor-pointer py-2 rounded-md"
        >
          <FaList />
        </div>
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="px-3 py-2 outline-none border border-slate-600 bg-transparent text-white focus:border-indigo-500 overflow-hidden rounded-md"
          />
        </div>
        <div className=" flex justify-center items-center gap-8 relative">
          <div className=" flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-sm font-bold">{userInfo.name}</h2>
                <span className="text-[15px] w-full font-normal">
                  {userInfo.role}
                </span>
              </div>
              {userInfo.role === "admin" ? (
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src="http://localhost:3001/admin.png"
                  alt=""
                /> 
              ) : (
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={userInfo.image}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
