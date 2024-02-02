import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import chatReducer from "./reducers/chatReducer";
import indexReducer from "./reducers/indexReducer";
import orderReducer from "./reducers/orderReducer";
import paymentReducer from "./reducers/paymentReducer";
import productReducer from "./reducers/productReducer";
import sellerReducers from "./reducers/sellerReducers";
import bannerReducer from "./reducers/bannerReducer";

const rootReduer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducers,
  chat: chatReducer,
  order: orderReducer,
  payment: paymentReducer,
  dashboard: indexReducer,
  banner: bannerReducer,
};

export default rootReduer;
