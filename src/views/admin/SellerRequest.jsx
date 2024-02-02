import React, { useEffect, useState } from "react";
import Search from "../../component/Search";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_request } from "../../store/reducers/sellerReducers";

const SellerRequest = () => {
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((state) => state.seller);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(
      get_seller_request({
        perPage,
        currentPage,
        searchValue,
      })
    );
  }, [perPage, currentPage, searchValue]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <Search
          searchValue={searchValue}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="relative overflow-x-auto mt-2">
          <table className="w-full text-xs text-left text-white">
            <thead className="text-xs text-white uppercase border-b border-slate-600">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>

                <th scope="col" className="py-3 px-4">
                  name
                </th>

                <th scope="col" className="py-3 px-4">
                  email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((d, i) => (
                <tr className="text-sm border-b border-slate-600" key={i}>
                  <td className="py-2 px-6  whitespace-nowrap">{i + 1}</td>

                  <td className="py-2 px-6  whitespace-nowrap">{d.name}</td>

                  <td className="py-2 px-6  whitespace-nowrap">{d.email}</td>
                  <td className="py-2 px-6  whitespace-nowrap">{d.payment} </td>
                  <td className="py-2 px-6  whitespace-nowrap">{d.status} </td>
                  <td className="py-2 px-6  whitespace-nowrap">
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
        {totalSeller <= perPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              perPage={perPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerRequest;
