import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { FadeLoader, PropagateLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_add_info,
  profile_image_upload,
  messageClear,
} from "../../store/reducers/authReducer";
import { toast } from "react-hot-toast";
import { overRideCss } from "../../utils/utils";
import { create_stripe_account } from "../../store/reducers/sellerReducers";
const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, successMessage, errorMessage, loader } = useSelector(
    (state) => state.auth
  );
  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);
  const [state, setState] = useState({
    division: "",
    shopName: "",
    distict: "",
    thana: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const addInfo = (e) => {
    e.preventDefault();
    dispatch(profile_add_info(state));
  };
  // console.log(userInfo._id);
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#283046] rounded-md text-white">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img className="w-full h-full" src={userInfo.image} alt="" />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-80 flex justify-center items-center">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-white relative"
                  htmlFor="img"
                >
                  <span>
                    <BsImage />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-80 flex justify-center items-center">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                name=""
                id="img"
                className="hidden"
              />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between  text-sm flex-col gap-2 p-4 bg-slate-600 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-3">
                  <span>Name : </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-3">
                  <span>Email : </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-3">
                  <span>Role : </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-3">
                  <span>Status : </span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account : </span>
                  <p>
                    {userInfo?.payment === "active" ? (
                      <span className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        {userInfo?.payment}
                      </span>
                    ) : (
                      <span
                        onClick={() => dispatch(create_stripe_account())}
                        className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded"
                      >
                        click active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-0 lg:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form onSubmit={addInfo}>
                  <div className="flex flex-col w-full gap-2">
                    <label htmlFor="shopName">Shop Name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandle}
                      type="text"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                      placeholder="Shop Name"
                      name="shopName"
                      id="shopName"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 pt-2">
                    <label htmlFor="division">Division</label>
                    <input
                      value={state.division}
                      onChange={inputHandle}
                      type="text"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                      placeholder="Division"
                      name="division"
                      id="division"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 pt-2">
                    <label htmlFor="distict">Distict</label>
                    <input
                      value={state.distict}
                      onChange={inputHandle}
                      type="text"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                      placeholder="Distict"
                      name="distict"
                      id="distict"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-2 pt-2 pb-2">
                    <label htmlFor="thana">Thana</label>
                    <input
                      value={state.thana}
                      onChange={inputHandle}
                      type="text"
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                      placeholder="Product Name"
                      name="thana"
                      id="thana"
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      disabled={loader ? true : false}
                      className="bg-blue-500 w-[200px] hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="white"
                          cssOverride={overRideCss}
                        />
                      ) : (
                        "Add Info"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between  text-sm flex-col gap-2 p-4 bg-slate-600 rounded-md relative">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name : </span>
                    <span>{userInfo?.shopInfo?.shopName} </span>
                  </div>
                  <div className="flex gap-2">
                    <span>Division : </span>
                    <span>{userInfo?.shopInfo?.division} </span>
                  </div>
                  <div className="flex gap-2">
                    <span>Distict : </span>
                    <span>{userInfo?.shopInfo?.distict} </span>
                  </div>
                  <div className="flex gap-2">
                    <span>Thana : </span>
                    <span>{userInfo?.shopInfo?.thana} </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0 ">
            <div className="bg-[#283046] text-white p-5 rounded-md">
              <h2 className="text-2xl font-semibold pb-2">Change Password</h2>
              <form>
                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    //   value={name}
                    type="email"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                    placeholder="Email Address"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-full gap-2 pt-2">
                  <label htmlFor="old_password">Old Password</label>
                  <input
                    //   value={name}
                    type="password"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                    placeholder="old password"
                    name="old_password"
                    id="old_password"
                  />
                </div>
                <div className="flex flex-col w-full gap-2 pt-2">
                  <label htmlFor="new_password">New Password</label>
                  <input
                    //   value={name}
                    type="password"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                    placeholder="new password"
                    name="new_password"
                    id="new_password"
                  />
                </div>
                <button className="bg-indigo-600 w-[150px] hover:shadow-indigo-500/50 hover:shadow-sm text-white rounded-md px-7 py-2 my-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
