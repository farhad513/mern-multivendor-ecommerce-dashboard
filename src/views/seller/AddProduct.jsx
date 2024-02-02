import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  get_category,
  messageClear,
} from "../../store/reducers/categoryReducer";
import { product_add } from "../../store/reducers/productReducer";
import { PropagateLoader } from "react-spinners";
import { overRideCss } from "../../utils/utils";
import { toast } from "react-hot-toast";
const AddProduct = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );
  const { categorys } = useSelector((state) => state.category);
  const [catShow, setCatShow] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSarchValue] = useState("");
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        perPage: "",
        page: "",
      })
    );
  }, []);
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  const categorySearch = (e) => {
    const value = e.target.value;
    setSarchValue(value);
    if (value) {
      let searchVal = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(searchVal);
    } else {
      setAllCategory(categorys);
    }
  };
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };
  //   console.log(imageShow);
  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;
      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImages([...tempImages]);
      setImageShow([...tempUrl]);
    }
  };
  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };
  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("brand", state.brand);
    formData.append("shopName", "Farhad Shop");
    formData.append("stock", state.stock);
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(product_add(formData));
    
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImages([]);
      setImageShow([]);
      setCategory("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-lg text-white font-semibold">Add Product</h2>
          <Link
            to={"/seller/dashboard/all_products"}
            className="bg-indigo-600 flex justify-center items-center w-[100px] hover:shadow-indigo-500/50 hover:shadow-sm text-white rounded-md px-7 py-2 my-2"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={addProduct}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                  placeholder="Product Name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product Brand</label>
                <input
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  // required
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                  placeholder="Product Brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Product Category</label>
                <input
                  // required
                  readOnly
                  onClick={() => setCatShow(!catShow)}
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    catShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      // required
                      value={searchValue}
                      onChange={categorySearch}
                      type="text"
                      className="px-1 py-2 w-full focus:border-indigo-500 outline-none bg-transparent overflow-hidden border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll">
                    {allCategory.map((c, i) => (
                      <span
                        className={`px-4 py-2 cursor-pointer hover:bg-indigo-500 hover:text-white w-full ${
                          category === c.name && "bg-indigo-500"
                        }`}
                        key={i}
                        onClick={() => {
                          setCatShow(false);
                          setCategory(c.name);
                          setSarchValue("");
                          setAllCategory(categorys);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Product Stock</label>
                <input
                  // required
                  min={0}
                  type="number"
                  onChange={inputHandle}
                  value={state.stock}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                  placeholder="Product stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Product Price</label>
                <input
                  // required
                  onChange={inputHandle}
                  value={state.price}
                  min={0}
                  type="number"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                  placeholder="Product price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Product Discount</label>
                <input
                  // required
                  onChange={inputHandle}
                  value={state.discount}
                  min={0}
                  type="number"
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                  placeholder="Product Discount"
                  name="discount"
                  id="discount"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-white">
              <label htmlFor="description">Product description</label>
              <textarea
                // required
                onChange={inputHandle}
                value={state.description}
                name="description"
                id="description"
                cols="30"
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                rows="5"
                placeholder="Product description"
              ></textarea>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-white my-4">
              {imageShow.map((img, i) => (
                <div key={i} className="relative h-[180px]">
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer hover:bg-slate-700  hover:shadow-md hover:shadow-slate-400/50 bg-white  absolute top-1 right-1 rounded-full"
                  >
                    <GrClose className="hover:text-white text-white" />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white"
                htmlFor="images"
              >
                <span>
                  <BsImage />
                </span>
                <span>Select Image</span>
              </label>
              <input
                // required
                onChange={imageHandle}
                multiple
                type="file"
                name="images"
                id="images"
                className="hidden "
              />
            </div>
            <div className="flex">
              <div className="mt-3">
                <button
                  disabled={loader ? true : false}
                  className="bg-blue-500 w-[200px] hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
                >
                  {loader ? (
                    <PropagateLoader color="white" cssOverride={overRideCss} />
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
