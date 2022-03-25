import { configureStore } from "@reduxjs/toolkit";

import addressSlice from "./address.slice";
import adminSlice from "./admin.slice";
import authSlice from "./auth.slice";
import permissionGroupSlice from "./permission-group.slice";
import shopAddressSlice from "./shop-address.slice";
import shopProfileSlice from "./shop-profile.slice";
import userSlice from "./users.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    permissionGroup: permissionGroupSlice,
    user: userSlice,
    admin: adminSlice,
    address: addressSlice,
    shopAddress: shopAddressSlice,
    shopProfile: shopProfileSlice
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
