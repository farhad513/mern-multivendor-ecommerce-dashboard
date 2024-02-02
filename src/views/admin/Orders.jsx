import React, { useEffect, useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../../component/Search";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "../../store/reducers/orderReducer";
const Orders = () => {
  const [searchValue, setSarchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { myOrders, totalOrder } = useSelector((state) => state.order);
  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [perPage, currentPage, searchValue]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div>
          <Search
            searchValue={searchValue}
            setPerPage={setPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left text-white">
            <div className="text-sm text-white uppercase border-b border-slate-700">
              <div className="flex justify-between items-start">
                <div className="py-3  w-[25%]">Order Id</div>
                <div className="py-3  w-[13%]">Price</div>
                <div className="py-3  w-[18%]">Payment Status</div>
                <div className="py-3  w-[18%]">Order Status</div>
                <div className="py-3  w-[18%]">Action</div>
                <div className="py-3  w-[8%]">
                  <BsArrowBarDown />
                </div>
              </div>
            </div>
            {myOrders.map((o, i) => (
              <div className="text-white">
                <div className="flex justify-between items-start border-b border-slate-700">
                  <div className="py-4 font-medium whitespace-nowrap w-[25%]">
                    {o._id}
                  </div>
                  <div className="py-4 font-medium whitespace-nowrap w-[13%]">
                    ${o.price}
                  </div>
                  <div className="py-4 font-medium whitespace-nowrap w-[18%]">
                    {o.payment_status}
                  </div>
                  <div className="py-4 font-medium whitespace-nowrap w-[18%]">
                    {o.delivery_status}
                  </div>
                  <div className="py-4 font-medium whitespace-nowrap w-[18%]">
                    <Link to={`/admin/dashboard/order/details/${o._id}`}>
                      view
                    </Link>
                  </div>
                  <div
                    onClick={() => setShow(o._id)}
                    className="py-4 cursor-pointer w-[8%]"
                  >
                    <BsArrowBarDown />
                  </div>
                </div>
                <div
                  className={
                    show === o._id
                      ? "block border-b border-slate-700 bg-slate-800 duration-500"
                      : "hidden"
                  }
                >
                  {o.subOrder.map((or, i) => (
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 font-medium whitespace-nowrap w-[25%] pl-5">
                        {or._id}
                      </div>
                      <div className="py-4 font-medium whitespace-nowrap w-[13%]">
                        ${or.price}
                      </div>
                      <div className="py-4 font-medium whitespace-nowrap w-[18%]">
                        {or.payment_status}
                      </div>
                      <div className="py-4 font-medium whitespace-nowrap w-[18%]">
                        {or.delivery_status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* {totalOrder <= perPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              perPage={perPage}
              showItem={3}
            />
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default Orders;
