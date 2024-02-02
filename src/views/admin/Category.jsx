import React, { useEffect, useState } from "react";
import Search from "../../component/Search";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { BsImage } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { PropagateLoader } from "react-spinners";
import { overRideCss } from "../../utils/utils";
import {
  addCategory,
  get_category,
  messageClear,
} from "../../store/reducers/categoryReducer";
import { toast } from "react-hot-toast";
const Category = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categorys } = useSelector(
    (state) => state.category
  );
  const [searchValue, setSarchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const [imageShow, setImageShow] = useState("");
  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    dispatch(addCategory(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        image: "",
      });
      setImageShow("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);
  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, setCurrentPage, perPage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
        <h1 className="text-white font-semibold text-xl">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-indigo-500 shadow-md hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
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
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((d, i) => (
                    <tr key={i}>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        <img
                          className="w-[40px] h-[40px]"
                          src={d.image}
                          alt=""
                        />
                      </td>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        {d.name}
                      </td>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        <div className="flex justify-start items-center gap-3">
                          <Link className="p-[6px] bg-yellow-500 rounded-md hover:shadow-md hover:shadow-yellow-500/50">
                            <FaEdit />
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
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-6">
            <div className=" bg-[#283046] rounded-md h-screen lg:h-auto px-3 py-2 lg:rounded-lg text-white">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-white font-semibold text-xl w-full text-center">
                  Add Category
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className="block lg:hidden cursor-pointer"
                >
                  <GrClose className="text-white" />
                </div>
              </div>
              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-2 mb-3">
                  <label htmlFor="name">Category Name</label>
                  <input
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    value={state.name}
                    type="text"
                    name="name"
                    placeholder="category name"
                    id="name"
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="flex justify-center items-center flex-col h-[240px] cursor-pointer border  border-dashed hover:border-indigo-500 w-full border-white"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} alt="" />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                />
                <div className="mt-3">
                  <button
                    disabled={loader ? true : false}
                    className="bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="white"
                        cssOverride={overRideCss}
                      />
                    ) : (
                      "Add Category"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
