import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller,
  messageClear,
  seller_status_update,
} from "../../store/reducers/sellerReducers";
import { toast } from "react-hot-toast";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { seller, totalSeller, successMessage, errorMessage } = useSelector(
    (state) => state.seller
  );
  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);
  const [status, setStatus] = useState("");
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status_update({
        sellerId,
        status,
      })
    );
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
  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="w-full flex flex-wrap text-white">
          <div className=" w-3/12 flex justify-center items-center py-3">
            <div>
              {seller?.image ? (
                <img className="w-full h-[230px]" src={seller?.image} alt="" />
              ) : (
                <span>Image Not Found</span>
              )}
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Basic Information</h2>
              </div>
              <div className="flex justify-between  text-sm flex-col gap-2 p-4 bg-slate-600 rounded-md">
                <div className="flex  gap-1">
                  <span>Name :</span>
                  <span>{seller?.name}</span>
                </div>
                <div className="flex  gap-1">
                  <span>Email :</span>
                  <span>{seller?.email}</span>
                </div>
                <div className="flex  gap-1">
                  <span>Role :</span>
                  <span>{seller?.role}</span>
                </div>
                <div className="flex  gap-1">
                  <span>Status :</span>
                  <span>{seller?.status}</span>
                </div>
                <div className="flex  gap-1">
                  <span>Payment Account :</span>
                  <span>{seller?.payment}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Address</h2>
              </div>
              <div className="flex justify-between  text-sm flex-col gap-2 p-4 bg-slate-600 rounded-md">
                <div className="flex  gap-1">
                  <span>Shop Name :</span>
                  <span>{seller?.shopInfo?.shopName}</span>
                </div>
                <div className="flex  gap-1">
                  <span>Division :</span>
                  <span>{seller?.shopInfo?.division}</span>
                </div>
                <div className="flex  gap-1">
                  <span>Distict :</span>
                  <span>{seller?.shopInfo?.distict}</span>
                </div>
                <div className="flex  gap-1">
                  <span> Thana :</span>
                  <span>{seller?.shopInfo?.thana}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={submit}>
            <div className="flex gap-3 py-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white "
              >
                <option value="">--select status--</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
              <button className="bg-indigo-600 w-[150px] hover:shadow-indigo-500/50 hover:shadow-sm text-white rounded-md px-7 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
