import React, { useEffect } from "react";
import { AiFillAlert, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_dashboard } from "../../store/reducers/indexReducer";
import moment from "moment";
const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
    recentOrders,
    recentMessage,
  } = useSelector((state) => state.dashboard);
  const state = {
    series: [
      {
        name: "Orders",
        data: [34, 53, 16, 35, 58, 20, 30, 40, 60, 78, 55],
      },
      {
        name: "Revenue",
        data: [50, 52, 19, 35, 58, 20, 70, 40, 60, 78, 55],
      },
      {
        name: "Sales",
        data: [43, 37, 98, 25, 58, 20, 30, 46, 60, 78, 55],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        redius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        color: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "jan",
          "feb",
          "mar",
          "apl",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "jan",
              "feb",
              "mar",
              "apl",
              "may",
              "jun",
              "jul",
              "aug",
              "sep",
              "oct",
              "nov",
              "dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };
  useEffect(() => {
    dispatch(get_seller_dashboard());
  });
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">${totalSale}</h2>
            <span className="font-medium text-md">Total Sales</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-md" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="font-medium text-md">Products</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-[#28c76f] shadow-md" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="font-medium text-md"> Orders</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <FiUser className="text-[#28c76f] shadow-md" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-white">
            <h2 className="text-3xl font-bold">{totalPendingOrder}</h2>
            <span className="font-medium text-md">Pending Orders</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#28c76f] shadow-md" />
          </div>
        </div>
      </div>
      <div className="w-full flex-wrap flex mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#283046] p-4 rounded-md text-white">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Recent Message</h2>
              <Link className="text-sm">View All</Link>
            </div>
            <div className="flex flex-col gap-3 pt-6 text-white">
              <ol className="relative border-1 border-slate-600 ml-4">
                {recentMessage.map((m, i) => (
                  <li className="mb-3 ml-6" key={i}>
                    <div className="flex absolute rounded-full -left-5 shadow-md justify-center items-center w-10 h-10 p-[6px] bg-[#00]">
                      {m.senderId === userInfo._id ? (
                        <img
                          className="rounded-full"
                          src={userInfo.image}
                          alt=""
                        />
                      ) : (
                        <img
                          className="rounded-full"
                          src="http://localhost:3000/admin.png"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="p-3 bg-slate-600 rounded-lg border border-slate-600 shadow-md">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          {m.senderName}
                        </Link>
                        <span className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          {moment(m.createdAt).startOf("hour").fromNow()}
                        </span>
                      </div>
                      <div className="p-2 text-xs font-normal bg-slate-600 rounded-md border border-slate-700">
                        <span>{m.message}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        <div className=" flex justify-between text-white items-center">
          <h2 className="font-semibold text-lg ">Recent Orders</h2>
          <Link to={"/seller/dashboard/orders"} className="text-sm ">
            View All
          </Link>
        </div>
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
              {recentOrders.map((d, i) => (
                <tr key={i}>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    #{d._id}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    {d.delivery_status}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    {d.payment_status}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap">
                    <Link to={`/seller/dashboard/order/details/${d._id}`}>
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
