import React, { useEffect, useState } from "react";
import Search from "../../component/Search";
import { Link, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const { sellerId } = useParams();
  const [searchValue, setSarchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, totalOrder } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(
      get_seller_orders({
        perPage: parseInt(perPage),
        page: parseInt(currentPage),
        searchValue,
        sellerId: userInfo._id,
      })
    );
  }, [perPage, currentPage, searchValue]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <Search
          setPerPage={setPerPage}
          setSarchValue={setSarchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-sm text-white uppercase border-b border-slate-600">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    #{d._id}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.payment_status}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.delivery_status}
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <Link
                      to={`/seller/dashboard/order/details/${d._id}`}
                      className="p-[6px] w-[40px] flex justify-center items-center bg-green-500 rounded-md hover:shadow-md hover:shadow-green-500/50"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            perPage={perPage}
            showItem={3}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Orders;
