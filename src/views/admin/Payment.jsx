import React, { forwardRef, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  confirm_payment_request,
  get_payment_request,
} from "../../store/reducers/paymentReducer";
function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const Payment = () => {
  const dispatch = useDispatch();
  const { errorMessage, successMessage, loader, pendingWidthraw } = useSelector(
    (state) => state.payment
  );
  useEffect(() => {
    dispatch(get_payment_request());
  }, []);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      // dispatch(messageClear());
    }
    if (errorMessage) {
      toast.success(errorMessage);
      // dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  const [paymentId, setPaymentId] = useState("");
  const confirm_request = (id) => {
    setPaymentId(id);
    dispatch(confirm_payment_request(id));
  };
  const row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-white">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${pendingWidthraw[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-600 text-blue-500 rounded-md text-xs">
            {pendingWidthraw[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {" "}
          {moment(pendingWidthraw[index]?.createdAt).format("LL")}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button
            disabled={loader}
            onClick={() => confirm_request(pendingWidthraw[index]?._id)}
            className="text-white bg-indigo-500 hover:shadow-indigo-500/50 px-3 rounded-sm text-xs py-[2px] cursor-pointer"
          >
            {loader && paymentId === pendingWidthraw[index]?._id
              ? "pending..."
              : "confirm"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <h2 className="text-3xl font-semibold text-white mb-3">
          Payment Request
        </h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#161d31] uppercase text-sm min-w-[340px] text-white">
              <div className="w-[25%] p-2">No</div>
              <div className="w-[25%] p-2">amount</div>
              <div className="w-[25%] p-2">status</div>
              <div className="w-[25%] p-2">date</div>
              <div className="w-[25%] p-2">action</div>
            </div>
            {
              <List
                style={{ minHeight: "340px", overflowX: "hidden" }}
                className="List"
                height={350}
                itemCount={pendingWidthraw.length}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {row}
              </List>
            }
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Payment;
