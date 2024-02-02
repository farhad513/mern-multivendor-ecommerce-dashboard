import React, { useEffect, useState } from "react";
import Search from "../../component/Search";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector, useDispatch } from "react-redux";
import { get_products } from "../../store/reducers/productReducer";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);
  const [searchValue, setSarchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, setCurrentPage, perPage]);
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
              {products.map((d, i) => (
                <tr key={i}>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    <img
                      className="w-[40px] h-[40px]"
                      src={d?.images[0]}
                      alt=""
                    />
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    {d?.name?.slice(0, 14)}
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    {d?.category}
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    {d?.brand}
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    ${d?.price}
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    {d.discount === 0 ? (
                      <span>No Discount</span>
                    ) : (
                      <span>{d?.discount}%</span>
                    )}
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    {d?.stock}
                  </td>
                  <td className="py-1 px-6 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-3">
                      <Link
                        to={`/seller/dashboard/edit_product/${d._id}`}
                        className="p-[6px] bg-yellow-500 rounded-md hover:shadow-md hover:shadow-yellow-500/50"
                      >
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-green-500 rounded-md hover:shadow-md hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      <Link className="p-[6px] bg-red-500 rounded-md hover:shadow-md hover:shadow-red-500/50">
                        <FaTrash />
                      </Link>
                      <button
                        onClick={() =>
                          navigate(`/seller/dashboard/add_banner/${d._id}`)
                        }
                        className="p-[6px] bg-green-500 rounded-md hover:shadow-md hover:shadow-green-500/50"
                      >
                        Add Banner
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalProduct <= perPage ? (
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

export default AllProduct;
