import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import UserServices, { UpdateUserRequest } from "services/users.services";
import { IUser } from "types/user/user";
import { RootState } from "./store";

export const getListUser = createAsyncThunk("users/getListUser", async () => {
  const response = await UserServices.getAllUser();
  return response;
});

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: string) => {
    const response = await UserServices.getUserById(id);
    return response;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: UpdateUserRequest) => {
    const response = await UserServices.createUser(user);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (params: { id: string; user: UpdateUserRequest }) => {
    const response = await UserServices.updateUser(params.id, params.user);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    await UserServices.deleteUser(id);
    return id;
  }
);

interface InitialStateType {
  userList: IUser[];
  userDetail: IUser;
  loading: boolean;
}
const initialState: InitialStateType = {
  userList: [],
  userDetail: {
    id: "",
    userName: "",
    email: "",
    password: {
      value: "",
      wrongTimes: 0,
      timeExpired: ""
    },
    googleId: "",
    facebookId: "",
    appleId: "",
    socialToken: "",
    otp: {
      value: "",
      wrongTimes: 0,
      timeExpired: ""
    },
    profile: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      avatar: ""
    },
    lastLogin: "",
    country: "",
    status: "",
    statusSeller: "",
    isSeller: false,
    isDeleted: false,
    deletedBy: "",
    deletedAt: "",
    dateUpdated: "",
    dateCreated: ""
  },
  loading: false
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getListUser.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getListUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<IUser[]>
    ) => {
      state.loading = false;
      state.userList = [...action.payload];
    },
    [getListUser.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [getUserById.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserById.fulfilled.toString()]: (
      state,
      action: PayloadAction<IUser>
    ) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    [getUserById.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [createUser.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<IUser>
    ) => {
      state.loading = false;
      state.userList = [...state.userList, action.payload];
    },
    [createUser.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [updateUser.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<IUser>
    ) => {
      state.loading = false;
      const newUser = state.userList.filter(
        (user: IUser) => user.id !== action.payload.id
      );
      state.userList = [action.payload, ...newUser];
    },
    [updateUser.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [deleteUser.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<IUser>
    ) => {
      state.loading = false;
      const newUserList = state.userList.filter(
        (user: IUser) => user.id !== action.payload
      );
      state.userList = [...newUserList];
    },
    [deleteUser.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

export const selectUserList = (state: RootState) => state.user.userList;
export const selectUserDetail = (state: RootState) => state.user.userDetail;
export const selectUserLoading = (state: RootState) => state.user.loading;
