import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import homeReducer from "./homeSlice";
import topupReducer from "./topupSlice";
import paymentReducer from "./paymentSlice";
import transactionReducer from "./transactionSlice";
import profileReducer from "./profileSlice";
import userReducer from "./saldoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    topup: topupReducer,
    payment: paymentReducer,
    transactions: transactionReducer,
    profile: profileReducer,
    user: userReducer,
  },
});

export default store;
