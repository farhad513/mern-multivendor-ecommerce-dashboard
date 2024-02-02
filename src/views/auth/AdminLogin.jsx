import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { admin_login, messageClear } from "../../store/reducers/authReducer";
import { overRideCss } from "../../utils/utils";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);
  return (
    <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center">
      <div className="w-[350px] text-white p-2">
        <div className="bg-[#283046] p-4 rounded-md ">
          <h1 className="text-3xl text-center">
            E_<span className="text-green-600">ST</span>
            <span className="text-red-600">O</span>
            <span className="text-teal-600">RE</span>
          </h1>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                type="email"
                placeholder="Please enter your Email"
                name="email"
                id="email"
                required
                className="px-3 py-2 outline-none border border-slate-600 bg-transparent rounded-md text-white focus:border-indigo-500 overflow-hidden"
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                type="password"
                placeholder="Please enter your Password"
                name="password"
                id="password"
                required
                className="px-3 py-2 outline-none border border-slate-600 bg-transparent rounded-md text-white focus:border-indigo-500 overflow-hidden"
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
            >
              {loader ? (
                <PropagateLoader color="white" cssOverride={overRideCss} />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
