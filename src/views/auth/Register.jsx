import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineGoogle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overRideCss } from "../../utils/utils";
import {
  messageClear,
  seller_register,
} from "../../store/reducers/authReducer";
import { toast } from "react-hot-toast";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    name: "",
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
    dispatch(seller_register(state));
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
  }, [successMessage, errorMessage]);
  return (
    <div className="min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center">
      <div className="w-[350px] text-white p-2">
        <div className="bg-[#283046] p-4 rounded-md">
          <h2 className="text-xl mb-3 text-center">Welcome to e-commerce </h2>
          <p className="text-sm mb-3 text-center">
            Please register to your account and Shoping
          </p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                onChange={inputHandle}
                value={state.name}
                type="text"
                placeholder="Please enter your name"
                name="name"
                id="name"
                required
                className="px-3 py-2 outline-none border border-slate-600 bg-transparent rounded-md text-white focus:border-indigo-500 overflow-hidden"
              />
            </div>
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
            <div className="flex w-full gap-2 items-center mb-3">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                required
                className="w-3 h-3"
              />
              <label htmlFor="checkbox">I agree privacy policy & terms</label>
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
            >
              {loader ? (
                <PropagateLoader color="white" cssOverride={overRideCss} />
              ) : (
                "Signup"
              )}
            </button>
            <div className="flex items-center gap-2 justify-center mb-3">
              <p>
                Already hava an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
            <div className="w-full flex justify-center items-center gap-2 mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center ">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="w-[35px] h-[35px] flex rounded-md bg-lime-500 shadow-md hover:shadow-lime-500/30  justify-center items-center cursor-pointer overflow-hidden">
                <span>
                  <AiOutlineFacebook />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex rounded-md bg-orange-500 shadow-md hover:shadow-orange-500/30  justify-center items-center cursor-pointer overflow-hidden">
                <span>
                  <AiOutlineTwitter />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex rounded-md bg-indigo-500 shadow-md hover:shadow-indigo-500/30  justify-center items-center cursor-pointer overflow-hidden">
                <span>
                  <AiOutlineGoogle />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex rounded-md bg-blue-500 shadow-md hover:shadow-blue-500/30  justify-center items-center cursor-pointer overflow-hidden">
                <span>
                  <AiOutlineGithub />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
