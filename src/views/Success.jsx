import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import {
  active_stripe_account,
  messageClear,
} from "../store/reducers/sellerReducers";
const Success = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.seller
  );
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const activeCode = queryParams.get("activeCode");
  useEffect(() => {
    dispatch(active_stripe_account(activeCode));
  }, [activeCode]);
  const redirect = () => {
    dispatch(messageClear());
    navigate("/");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <span className="text-center text-red-600">Error Message</span>
          <button
            onClick={redirect}
            className="px-5 py-2 bg-green-500 text-white"
          >
            Back to Dashboard
          </button>
        </>
      ) : (
        successMessage && (
          <>
            <span className="text-center text-green-600">Success Message</span>
            <button
              onClick={redirect}
              className="px-5 py-2 bg-green-500 text-white"
            >
              Back to Dashboard
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Success;
