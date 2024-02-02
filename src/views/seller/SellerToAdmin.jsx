import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import {
  get_seller_message,
  messageClear,
  send_message_seller_admin,
  updateAdminMessage,
} from "../../store/reducers/chatReducer";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../utils/utils";
const SellerToAdmin = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { seller_admin_message, successMessage, activeAdmin } = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  useEffect(() => {
    dispatch(get_seller_message(""));
  }, []);
  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_seller_admin({
        senderId: userInfo._id,
        receverId: "",
        message: text,
        senderName: userInfo.name,
      })
    );
    setText("");
  };
  useEffect(() => {
    socket.on("receve_admin_message", (msg) => {
      dispatch(updateAdminMessage(msg));
    });
  }, []);
  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_seller_admin",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full md:pl-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <div className="relative">
                  <img
                    className="w-[40px] h-[40px] border-green-500 border-2 max-w-[40px] p-[2px] rounded-full"
                    src="http://localhost:3000/admin.png"
                    alt=""
                  />
                  {activeAdmin && (
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  )}
                </div>
                <div className="flex justify-center items-center flex-col w-full">
                  <div className=" flex justify-between items-center w-full">
                    <h2 className="text-base font-semibold text-white">
                      Md Farhad Hossain
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {seller_admin_message.map((m, i) => {
                  if (userInfo._id !== m.senderId) {
                    return (
                      <div
                        ref={scrollRef}
                        key={i}
                        className="w-full flex justify-start items-center"
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
                        key={i}
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
                })}
              </div>
            </div>
            <form onSubmit={send} className="flex gap-3">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Please enter your message"
                className="w-full px-2 border border-slate-700 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white"
              />
              <button className="bg-indigo-500 shadow-md hover:shadow-indigo-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;
