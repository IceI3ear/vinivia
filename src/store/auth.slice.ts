import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthServices from "services/auth/auth.service";
import { IAdmin } from "types/admin/admin";
import { RootState } from "./store";

export const login = createAsyncThunk("login/getListAdmin", async () => {
  const response = await AuthServices.getAllAdmin();
  return response;
});

interface InitialStateType {
  loading: boolean;
  listAdmin: IAdmin[];
  error: string;
}

const initialState: InitialStateType = {
  listAdmin: [],
  loading: false,
  error: ""
};

const authSlice = createSlice({
  name: "getListAdmin",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.toString()]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.toString()]: (state, action) => {
      state.listAdmin = action.payload;
    },
    [login.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const adminLogin = (state: RootState) => state.auth.listAdmin;
export default authSlice.reducer;
