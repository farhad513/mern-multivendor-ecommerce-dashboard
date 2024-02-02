import { lazy } from "react";
const AllBanner = lazy(() => import("../../views/seller/AllBanner"));
const AddBanner = lazy(() => import("../../views/seller/AddBanner"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const DiscountProducts = lazy(() =>
  import("../../views/seller/DiscountProducts")
);
const AllProduct = lazy(() => import("../../views/seller/AllProduct"));
const Orders = lazy(() => import("../../views/seller/Orders"));
const Payments = lazy(() => import("../../views/seller/Payments"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const Profile = lazy(() => import("../../views/seller/Profile"));
const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));
const SellerToCutomer = lazy(() =>
  import("../../views/seller/SellerToCutomer")
);
const Deactive = lazy(() => import("../../views/Deactive"));
const Pending = lazy(() => import("../../views/Pending"));
export const sellerRoutes = [
  {
    path: "/seller/account/pending",
    element: <Pending />,
    ablity: "seller",
  },
  {
    path: "/seller/account/deactive",
    element: <Deactive />,
    ablity: "seller",
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/add_product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },

  {
    path: "/seller/dashboard/edit_product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/all_products",
    element: <AllProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/add_banner/:productId",
    element: <AddBanner />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/all_banners",
    element: <AllBanner />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/discount_products",
    element: <DiscountProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/orders",
    element: <Orders />,
    role: "seller",
    visiablity: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "seller",
    visiablity: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/payment",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat_customer",
    element: <SellerToCutomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat_customer/:customerId",
    element: <SellerToCutomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/admin_chat",
    element: <SellerToAdmin />,
    role: "seller",
    visiablity: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/profile",
    element: <Profile />,
    role: "seller",
    visiablity: ["active", "deactive", "pending"],
  },
];
