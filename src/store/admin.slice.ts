import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import AdminServices, { UpdateAdminRequest } from "services/admin.service";
import { IAdmin } from "types/admin/admin";
import { RootState } from "./store";

export const getListAdmin = createAsyncThunk(
  "admins/getListAdmin",
  async () => {
    const response = await AdminServices.getAllAdmin();
    return response;
  }
);

export const getAdminById = createAsyncThunk(
  "admins/getAdminById",
  async (id: string) => {
    const response = await AdminServices.getAdminById(id);
    return response;
  }
);

export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (admin: UpdateAdminRequest) => {
    const response = await AdminServices.createAdmin(admin);
    return response;
  }
);

export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async (params: { id: string; admin: UpdateAdminRequest }) => {
    const response = await AdminServices.updateAdmin(params.id, params.admin);
    return response;
  }
);

export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id: string) => {
    await AdminServices.deleteAdmin(id);
    return id;
  }
);

interface InitialStateType {
  adminList: IAdmin[];
  adminDetail: IAdmin;
  loading: boolean;
}
const initialState: InitialStateType = {
  adminList: [],
  adminDetail: {
    id: "",
    email: "",
    prefixPhone: "",
    phone: "",
    userName: "",
    password: "",
    fullName: "",
    avatar: "",
    isSuperAdmin: false,
    lastLogin: "",
    groupPermission: "",
    createdBy: "",
    status: "",
    isDeleted: false,
    deletedAt: "",
    dateCreated: "",
    dateUpdated: ""
  },
  loading: false
};

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: {
    [getListAdmin.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getListAdmin.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAdmin[]>
    ) => {
      state.loading = false;
      state.adminList = [...action.payload];
    },
    [getListAdmin.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [getAdminById.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAdminById.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAdmin>
    ) => {
      state.loading = false;
      state.adminDetail = action.payload;
    },
    [getAdminById.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [createAdmin.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createAdmin.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAdmin>
    ) => {
      state.loading = false;
      state.adminList = [...state.adminList, action.payload];
    },
    [createAdmin.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [updateAdmin.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateAdmin.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAdmin>
    ) => {
      state.loading = false;
      const newAdmin = state.adminList.filter(
        (admin: IAdmin) => admin.id !== action.payload.id
      );
      state.adminList = [action.payload, ...newAdmin];
    },
    [updateAdmin.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [deleteAdmin.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteAdmin.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAdmin>
    ) => {
      state.loading = false;
      const newAdminList = state.adminList.filter(
        (admin: IAdmin) => admin.id !== action.payload
      );
      state.adminList = [...newAdminList];
    },
    [deleteAdmin.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdminList = (state: RootState) => state.admin.adminList;
export const selectAdminDetail = (state: RootState) => state.admin.adminDetail;
export const selectAdminLoading = (state: RootState) => state.admin.loading;
