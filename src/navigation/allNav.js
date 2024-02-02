import { AiFillDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory, BiLoaderCircle, BiChat } from "react-icons/bi";
import { FiUser, FiLogOut } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
export const allNavs = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    path: "/admin/dashboard",
    role: "admin",
  },
  {
    id: 2,
    title: "Orders",
    icon: <BiLoaderCircle />,
    path: "admin/dashboard/orders",
    role: "admin",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiCategory />,
    path: "/admin/dashboard/category",
    role: "admin",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <FiUser />,
    path: "/admin/dashboard/sellers",
    role: "admin",
  },
  {
    id: 5,
    title: "Payment",
    icon: <BsCurrencyDollar />,
    path: "/admin/dashboard/payment_request",
    role: "admin",
  },
  {
    id: 6,
    title: "Deactive Sellers",
    icon: <FiUser />,
    path: "/admin/dashboard/decative_sellers",
    role: "admin",
  },
  {
    id: 7,
    title: "Seller Request",
    icon: <AiFillDashboard />,
    path: "/admin/dashboard/seller_request",
    role: "admin",
  },
  {
    id: 8,
    title: "Chat Seller",
    icon: <CiChat1 />,
    path: "/admin/dashboard/chat_sellers",
    role: "admin",
  },
  {
    id: 9,
    title: "Dashboard",
    icon: <AiFillDashboard />,
    path: "/seller/dashboard",
    role: "seller",
  },
  {
    id: 10,
    title: "Add Product",
    icon: <GoPlus />,
    path: "/seller/dashboard/add_product",
    role: "seller",
  },

  {
    id: 11,
    title: "All Product",
    icon: <FaProductHunt />,
    path: "/seller/dashboard/all_products",
    role: "seller",
  },

  {
    id: 11,
    title: "All Banner",
    icon: <FaProductHunt />,
    path: "/seller/dashboard/all_banners",
    role: "seller",
  },
  {
    id: 12,
    title: "Discount Product",
    icon: <FaProductHunt />,
    path: "/seller/dashboard/discount_products",
    role: "seller",
  },
  {
    id: 13,
    title: "Orders",
    icon: <BiLoaderCircle />,
    path: "/seller/dashboard/orders",
    role: "seller",
  },
  {
    id: 14,
    title: "Payments",
    icon: <BsCurrencyDollar />,
    path: "/seller/dashboard/payment",
    role: "seller",
  },
  {
    id: 15,
    title: "Chat Customer",
    icon: <CiChat1 />,
    path: "/seller/dashboard/chat_customer",
    role: "seller",
  },
  {
    id: 16,
    title: "Chat Support",
    icon: <BiChat />,
    path: "/seller/dashboard/admin_chat",
    role: "seller",
  },
  {
    id: 17,
    title: "Profile",
    icon: <CgProfile />,
    path: "/seller/dashboard/profile",
    role: "seller",
  },
];
