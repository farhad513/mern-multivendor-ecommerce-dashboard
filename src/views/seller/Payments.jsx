import React, { forwardRef, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { BsCurrencyDollar } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  get_seller_payment_details,
  messageClear,
  send_widthraw_request,
} from "../../store/reducers/paymentReducer";
import moment from "moment";
import { toast } from "react-hot-toast";
function handleOnWheel({ deltaY }) {
  // console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const Payments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    errorMessage,
    successMessage,
    loader,
    pendingWidthraw,
    successWidthraw,
    totalAmount,
    widthrawAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state) => state.payment);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.success(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  const sendRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      dispatch(send_widthraw_request({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error("Insuffcient Balance");
    }
  };

  useEffect(() => {
    dispatch(get_seller_payment_details(userInfo._id));
  }, []);
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
          {moment(pendingWidthraw[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };
  const rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-white">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${successWidthraw[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-600 text-blue-500 rounded-md text-xs">
            {successWidthraw[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(successWidthraw[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-5">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">${totalAmount}</h2>
            <span className="font-medium text-md">Total Sales</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-md" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{availableAmount}</h2>
            <span className="font-medium text-md">Available Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-md" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">${widthrawAmount}</h2>
            <span className="font-medium text-md"> Widthraw Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-md" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">${pendingAmount}</h2>
            <span className="font-medium text-md">Pending Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-md" />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
        <div className="bg-[#283046] text-white rounded-md p-5">
          <h2 className="text-lg font-semibold">Send Request</h2>
          <div className="py-5">
            <form onSubmit={sendRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  disabled={loader}
                  min={0}
                  type="number"
                  name=""
                  id=""
                  className="px-4 py-2 md:w-[75%] focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                />
                <button className="bg-indigo-600 hover:shadow-indigo-500/50 hover:shadow-sm text-white rounded-md px-7 py-2">
                  {loader ? "Loading...." : "Submit"}
                </button>
              </div>
            </form>
          </div>
          <h2 className="text-lg font-semibold">Pending Request</h2>
          <div className="w-full py-5">
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#161d31] uppercase text-sm min-w-[340px] text-white">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
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
        </div>
        <div className="bg-[#283046] text-white rounded-md p-5">
          <h2 className="text-lg font-semibold">Success Widthraw</h2>
          <div className="w-full py-5">
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#161d31] uppercase text-sm min-w-[340px] text-white">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {
                <List
                  style={{ minHeight: "340px", overflowX: "hidden" }}
                  className="List"
                  height={350}
                  itemCount={successWidthraw.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
