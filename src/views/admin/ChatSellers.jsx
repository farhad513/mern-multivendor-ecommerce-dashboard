import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  get_admin_message,
  get_sellers,
  messageClear,
  send_message_seller_admin,
  updateSellerMessage,
} from "../../store/reducers/chatReducer";
import { useParams, Link } from "react-router-dom";
import { socket } from "../../utils/utils";
const ChatSellers = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const {
    sellers,
    activeSellers,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);

  const { userInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const { sellerId } = useParams();
  const [recevedMessage, setRecevedMessage] = useState("");
  useEffect(() => {
    dispatch(get_sellers());
  }, []);
  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_seller_admin({
        senderId: "",
        receverId: sellerId,
        message: text,
        senderName: "Support",
      })
    );
    setText("");
  };
  useEffect(() => {
    if (sellerId) {
      dispatch(get_admin_message(sellerId));
    }
  }, [sellerId]);
  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_seller",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage]);
  useEffect(() => {
    socket.on("receve_seller_message", (msg) => {
      setRecevedMessage(msg);
    });
  }, []);
  useEffect(() => {
    if (recevedMessage) {
      if (
        recevedMessage.senderId === sellerId &&
        recevedMessage.receverId === ""
      ) {
        dispatch(updateSellerMessage(recevedMessage));
      } else {
        toast.success(recevedMessage.senderName + " " + "send a message");
      }
    }
  }, [recevedMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);
  console.log(recevedMessage);
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
                <h2>Sellers</h2>
                <span
                  className="block cursor-pointer md:hidden"
                  onClick={() => setShow(!show)}
                >
                  <IoMdClose />
                </span>
              </div>
              {sellers.map((c, i) => (
                <Link
                  key={i}
                  to={`/admin/dashboard/chat_seller/${c._id}`}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white p-2 rounded-sm cursor-pointer ${
                    sellerId === c._id ? "bg-slate-600" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      className="w-[40px] h-[40px] border-white border-2 max-w-[40px] p-[2px] rounded-full"
                      src={c.image}
                      alt=""
                    />
                    {activeSellers.some((a) => a.sellerId === c._id) && (
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
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[40px] h-[40px] border-green-500 border-2 max-w-[40px] p-[2px] rounded-full"
                      src="http://localhost:3001/admin.png"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <div className="flex justify-center items-center flex-col w-full">
                    <div className=" flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold text-white">
                        {currentSeller.name}
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
                {sellerId ? (
                  seller_admin_message.map((s, i) => {
                    if (s.senderId === sellerId) {
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
                                src="http://localhost:3001/admin.png"
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col w-full bg-orange-500 text-white py-1 px-3 rounded-sm">
                              <span>{s.message} </span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex justify-end items-center"
                        >
                          <div className="flex justify-start items-center gap-2 md:px-3 py-3 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                                src="http://localhost:3001/admin.png"
                                alt=""
                              />
                            </div>
                            <div className="flex -order-last justify-center items-start flex-col w-full bg-indigo-500 text-white py-1 px-3 rounded-sm">
                              <span>{s.message} </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center gap-2 flex-col text-white text-lg">
                    <span>Select Seller</span>
                  </div>
                )}
              </div>
            </div>
            <form className="flex gap-3" onSubmit={send}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={sellerId ? false : true}
                type="text"
                placeholder="Please enter your message"
                className="w-full px-2 border border-slate-700 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-white"
              />
              <button
                disabled={sellerId ? false : true}
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

export default ChatSellers;
