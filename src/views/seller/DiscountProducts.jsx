import React, { useState } from "react";
import Search from "../../component/Search";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

const DiscountProducts = () => {
  const [searchValue, setSarchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <Search
          setPerPage={setPerPage}
          setSarchValue={setSarchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto mt-2">
          <table className="w-full text-sm text-left text-white">
            <thead className="text-sm text-white uppercase border-b border-slate-600">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  name
                </th>
                <th scope="col" className="py-3 px-4">
                  category
                </th>
                <th scope="col" className="py-3 px-4">
                  brand
                </th>
                <th scope="col" className="py-3 px-4">
                  price
                </th>
                <th scope="col" className="py-3 px-4">
                  discount
                </th>
                <th scope="col" className="py-3 px-4">
                  stock
                </th>
                <th scope="col" className="py-3 px-4">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">1</td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    <img
                      className="w-[40px] h-[40px]"
                      src="http://localhost:3000/admin.png"
                      alt=""
                    />
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    Ball
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    Sports
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    Adidas
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    $5934
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    20%
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    100
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-3">
                      <Link className="p-[6px] bg-yellow-500 rounded-md hover:shadow-md hover:shadow-yellow-500/50">
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded-md hover:shadow-md hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      <Link className="p-[6px] bg-red-500 rounded-md hover:shadow-md hover:shadow-red-500/50">
                        <FaTrash />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscountProducts;
