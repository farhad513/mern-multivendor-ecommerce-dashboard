import React, { useEffect, useState } from "react";
import Search from "../../component/Search";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_sellers } from "../../store/reducers/sellerReducers";

const Sellers = () => {
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((state) => state.seller);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_sellers(obj));
  }, [searchValue, perPage, currentPage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
          >
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="text"
            placeholder="Search"
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
          />
        </div>
        <div className="relative overflow-x-auto mt-2">
          <table className="w-full text-xs text-center text-white">
            <thead className="text-xs text-white uppercase border-b border-slate-600">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  IMage
                </th>
                <th scope="col" className="py-3 px-4">
                  name
                </th>
                <th scope="col" className="py-3 px-4">
                  shop name
                </th>
                <th scope="col" className="py-3 px-4">
                  email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Division
                </th>
                <th scope="col" className="py-3 px-4">
                  Distict
                </th>
                <th scope="col" className="py-3 px-4">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((d, i) => (
                <tr className="text-sm" key={i}>
                  <td className="py-4 px-6  whitespace-nowrap">{i + 1}</td>
                  <td className="py-4 px-6  whitespace-nowrap">
                    <img className="w-[40px] h-[40px]" src={d?.image} alt="" />
                  </td>
                  <td className="py-4 px-6  whitespace-nowrap">{d?.name}</td>
                  <td className="py-4 px-6  whitespace-nowrap">
                    {d?.shopInfo?.shopName}
                  </td>
                  <td className="py-4 px-6  whitespace-nowrap">{d?.email}</td>
                  <td className="py-4 px-6  whitespace-nowrap">{d?.payment}</td>
                  <td className="py-4 px-6  whitespace-nowrap">
                    {d?.shopInfo?.division}
                  </td>
                  <td className="py-4 px-6  whitespace-nowrap">
                    {d?.shopInfo?.distict}
                  </td>
                  <td className="py-4 px-6  whitespace-nowrap">
                    <div className="flex justify-start items-center gap-3">
                      <Link
                        to={`/admin/dashboard/seller/details/${d._id}`}
                        className="p-[6px] bg-green-500 rounded-md hover:shadow-md hover:shadow-green-500/50"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* {totalSeller <= perPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSeller}
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

export default Sellers;
