import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import PermissionGroupServices from "services/permission-group.service";
import { IPermissionGroup } from "types/permission-group/permission-group";
import { RootState } from "./store";

export const getAllPermissionGroup = createAsyncThunk(
  "group-permission/getAllPermissionGroup",
  async () => {
    const response = await PermissionGroupServices.getAllPermissionGroup();
    return response;
  }
);

export const getPermissionGroupDetail = createAsyncThunk(
  "group-permission/getPermissionGroupDetail",
  async (id: string) => {
    const response = await PermissionGroupServices.getPermissionGroupById(id);
    return response;
  }
);

export const updatePermissionGroup = createAsyncThunk(
  "group-permission/updatePermissionGroup",
  async (params: { id: string; body: IPermissionGroup }) => {
    const response = await PermissionGroupServices.updatePermissionGroup(
      params.id,
      params.body
    );
    return response;
  }
);
interface InitialStateType {
  loading: boolean;
  listPermissionGroup: IPermissionGroup[];
  permissionGroupDetail: IPermissionGroup;
  error: string;
}

const initialState: InitialStateType = {
  listPermissionGroup: [],
  permissionGroupDetail: {
    id: "",
    name: "",
    description: "",
    permission: [],
    status: "",
    isDeleted: false,
    deletedAt: "",
    dateCreated: "",
    dateUpdated: ""
  },
  loading: false,
  error: ""
};

const permissionGroupSlice = createSlice({
  name: "group-permission",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPermissionGroup.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAllPermissionGroup.fulfilled.toString()]: (state, action) => {
      state.listPermissionGroup = action.payload;
    },
    [getAllPermissionGroup.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [updatePermissionGroup.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updatePermissionGroup.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      const listPermissionGroupFilter = state.listPermissionGroup.filter(
        (item: IPermissionGroup) => item.id !== action.payload.id
      );
      state.listPermissionGroup = [
        ...listPermissionGroupFilter,
        action.payload
      ];
    },
    [updatePermissionGroup.rejected.toString()]: (state) => {
      state.loading = false;
    },
    [getPermissionGroupDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPermissionGroupDetail.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.permissionGroupDetail = action.payload;
    },
    [getPermissionGroupDetail.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const listPermissionGroup = (state: RootState) =>
  state.permissionGroup.listPermissionGroup;
export const permissionGroupDetail = (state: RootState) =>
  state.permissionGroup.permissionGroupDetail;
export default permissionGroupSlice.reducer;
