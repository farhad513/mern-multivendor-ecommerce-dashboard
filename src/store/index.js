import { configureStore } from "@reduxjs/toolkit";
import rootReduer from "./rootReducers";

const store = configureStore({
  reducer: rootReduer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

export default store;
