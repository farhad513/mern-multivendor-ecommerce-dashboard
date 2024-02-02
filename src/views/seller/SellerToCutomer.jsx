import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  get_customer_message,
  get_customers,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/chatReducer";
import { toast } from "react-hot-toast";
import { socket } from "../../utils/utils";
const SellerToCustomer = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [receverMsg, setRecevermsg] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    customers,
    messages,
    currentCustomer,
    successMessage,
    activeCustomer,
  } = useSelector((state) => state.chat);
  const { customerId } = useParams();
  const scrollRef = useRef();
  useEffect(() => {
    dispatch(get_customers(userInfo._id));
  }, []);
  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [customerId]);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message({
        senderId: userInfo._id,
        receverId: customerId,
        text,
        name: userInfo?.shopInfo?.shopName,
      })
    );
    setText("");
  };
  useEffect(() => {
    socket.on("customer_message", (msg) => {
      setRecevermsg(msg);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_seller_message", messages[messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);
  useEffect(() => {
    if (receverMsg) {
      if (
        customerId === receverMsg.senderId &&
        userInfo._id === receverMsg.receverId
      ) {
        dispatch(updateMessage(receverMsg));
      } else {
        toast.success(receverMsg.senderName + " " + "send a message");
        dispatch(messageClear());
      }
    }
  }, [receverMsg]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-y-auto ">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 text-white">
                <h2>Customers</h2>
                <span
                  className="block cursor-pointer md:hidden"
                  onClick={() => setShow(!show)}
                >
                  <IoMdClose />
                </span>
              </div>
              {customers.map((c, i) => (
                <Link
                  key={i}
                  to={`/seller/dashboard/chat_customer/${c.fndId}`}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white p-2 rounded-sm cursor-pointer`}
                >
                  <div className="relative">
                    <img
                      className="w-[40px] h-[40px] border-white border-2 max-w-[40px] p-[2px] rounded-full"
                      src="http://localhost:3000/admin.png"
                      alt=""
                    />
                    {activeCustomer.some((u, i) => u.userId === c.fndId) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className="flex justify-center items-center flex-col w-full">
                    <div className=" flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold text-white">
                        {c.name}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {customerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[40px] h-[40px] border-green-500 border-2 max-w-[40px] p-[2px] rounded-full"
                      src="http://localhost:3000/admin.png"
                      alt=""
                    />
                    {activeCustomer.some(
                      (u, i) => u.userId === currentCustomer._id
                    ) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className="flex justify-center items-center flex-col w-full">
                    <div className=" flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold text-white">
                        {currentCustomer.name}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className="w-[40px] flex h-[40px] md:hidden rounded-sm bg-blue-500 shadow-md hover:shadow-blue-500/40 justify-center items-center cursor-pointer"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {customerId ? (
                  messages.map((m, i) => {
                    if (m.senderId === customerId) {
                      return (
                        <div
                          ref={scrollRef}
                          className="w-full flex justify-start items-center"
                          key={i}
                        >
                          <div className="flex justify-start items-center gap-2 md:px-3 py-3 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                                src="http://localhost:3000/admin.png"
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col w-full bg-orange-500 text-white py-1 px-3 rounded-sm">
                              <span>{m.message} </span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          className="w-full flex justify-end items-center"
                        >
                          <div className="flex justify-start items-center gap-2 md:px-3 py-3 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                                src="http://localhost:3000/admin.png"
                                alt=""
                              />
                            </div>
                            <div className="flex -order-last justify-center items-start flex-col w-full bg-indigo-500 text-white py-1 px-3 rounded-sm">
                              <span>{m.message} </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center gap-2 flex-col text-white text-lg">
                    <span>Select Customer</span>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={send} className="flex gap-3">
              <input
                readOnly={customerId ? false : true}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Please enter your message"
                className="w-full px-2 border border-slate-700 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white"
              />
              <button
                disabled={customerId ? false : true}
                className="bg-indigo-500 shadow-md hover:shadow-indigo-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToCustomer;
