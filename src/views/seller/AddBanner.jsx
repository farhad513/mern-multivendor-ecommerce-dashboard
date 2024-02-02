import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  add_banner,
  get_banner,
  messageClear,
  update_Banner,
} from "../../store/reducers/bannerReducer";
import { toast } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overRideCss } from "../../utils/utils";
const AddBanner = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [imageShow, setImageShow] = useState("");
  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };
  const { loader, successMessage, errorMesssage, banner } = useSelector(
    (state) => state.banner
  );
  const addBanner = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("image", image);
    dispatch(add_banner(formData));
  };
  const updateBanner = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    dispatch(
      update_Banner({
        info: formData,
        bannerId: banner._id,
      })
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setImageShow("");
      setImage("");
    }
    if (errorMesssage) {
      toast.error(errorMesssage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMesssage]);

  useEffect(() => {
    dispatch(get_banner(productId));
  }, [productId]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-lg text-white font-semibold">Add Banner</h2>
          <Link
            to={"/seller/dashboard/all_banners"}
            className="bg-indigo-600 flex justify-center items-center w-[100px] hover:shadow-indigo-500/50 hover:shadow-sm text-white rounded-md px-7 py-2 my-2"
          >
            Banners
          </Link>
        </div>
        {!banner && (
          <div>
            <form onSubmit={addBanner}>
              <div className=" my-6">
                <label
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white"
                  htmlFor="images"
                >
                  <span>
                    <FaCloudUploadAlt className="w-[30px] h-[30px]" />
                  </span>
                  <span>Select Banner Image</span>
                </label>
                <input
                  // required
                  onChange={imageHandle}
                  type="file"
                  name="images"
                  id="images"
                  className="hidden "
                />
              </div>
              {imageShow && (
                <div className="w-full h-auto">
                  <img src={imageShow} alt="Bannner Image" />
                </div>
              )}

              <div className="mt-5">
                <button
                  disabled={loader ? true : false}
                  className="bg-blue-500 w-[200px] hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
                >
                  {loader ? (
                    <PropagateLoader color="white" cssOverride={overRideCss} />
                  ) : (
                    "Add Banner"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
        {banner && (
          <div>
            {
              <div className="w-full h-auto">
                <img src={banner.banner} alt="Bannner Image" />
              </div>
            }
            <form onSubmit={updateBanner}>
              <div className=" my-6">
                <label
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white"
                  htmlFor="images"
                >
                  <span>
                    <FaCloudUploadAlt className="w-[30px] h-[30px]" />
                  </span>
                  <span>Select Banner Image</span>
                </label>
                <input
                  // required
                  onChange={imageHandle}
                  type="file"
                  name="images"
                  id="images"
                  className="hidden "
                />
              </div>
              {imageShow && (
                <div className="w-full h-auto">
                  <img src={imageShow} alt="Bannner Image" />
                </div>
              )}

              <div className="mt-5">
                <button
                  disabled={loader ? true : false}
                  className="bg-blue-500 w-[200px] hover:shadow-blue-500/50 hover:shadow-md text-white px-7 py-2 rounded-md mb-3"
                >
                  {loader ? (
                    <PropagateLoader color="white" cssOverride={overRideCss} />
                  ) : (
                    "Update Banner"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBanner;
