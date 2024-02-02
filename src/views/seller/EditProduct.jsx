import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { get_category } from "../../store/reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  get_product,
  messageClear,
  update_product,
  product_Image_update,
} from "../../store/reducers/productReducer";
import { toast } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overRideCss } from "../../utils/utils";
const EditProduct = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { product, successMessage, errorMessage, loader } = useSelector(
    (state) => state.product
  );
  const { productId } = useParams();
  // console.log(productId);

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        perPage: "",
        page: "",
      })
    );
  }, []);
  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);
  const [catShow, setCatShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSarchValue] = useState("");
  const [state, setState] = useState({
    name: "",
    discription: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

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
  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_Image_update({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  useEffect(() => {
    setState({
      name: product.name,
      discription: product.description,
      discount: product.discount,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
    });
    setCategory(product.category);
    setImageShow(product.images);
  }, [product]);
  useEffect(() => {
    if (categorys.length > 0) {
      setAllCategory(categorys);
    }
  }, [categorys]);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const updateProduct = (e) => {
    e.preventDefault();
    state.productId = productId;
    const obj = {
      name: state.name,
      description: state.discription,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      productId: productId,
    };
    dispatch(update_product(obj));
  };
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-lg text-white font-semibold">Edit Product</h2>
          <Link
            to={"/seller/dashboard/all_products"}
            className="bg-indigo-600 flex justify-center items-center w-[100px] hover:shadow-indigo-500/50 hover:shadow-sm text-white rounded-md px-7 py-2 my-2"
          >
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={updateProduct}>
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
                      value={searchValue}
                      onChange={categorySearch}
                      type="text"
                      className="px-1 py-2 w-full focus:border-indigo-500 outline-none bg-transparent overflow-hidden border border-slate-600 rounded-md text-white"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll">
                    {allCategory.length > 0 &&
                      allCategory.map((c, i) => (
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
              <label htmlFor="discription">Product Discription</label>
              <textarea
                onChange={inputHandle}
                value={state.discription}
                name="discription"
                id="discription"
                cols="30"
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-600 rounded-md text-white"
                rows="5"
                placeholder="Product discription"
              ></textarea>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-white my-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div key={i} className="relative h-[180px]">
                    <label htmlFor={i}>
                      <img
                        className="w-full h-full rounded-sm"
                        src={img}
                        alt=""
                      />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                  </div>
                ))}

              <input
                onChange={imageHandle}
                multiple
                type="file"
                name="images"
                id="images"
                className="hidden "
              />
            </div>
            <div className="mt-3">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[200px] hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
              >
                {loader ? (
                  <PropagateLoader color="white" cssOverride={overRideCss} />
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
