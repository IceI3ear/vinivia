import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import ShopProfileServices, {
  UpdateShopProfileRequest
} from "services/shop-profile.service";
import { IShopProfile } from "types/shop/profile";
import { RootState } from "./store";

export const getListShopProfile = createAsyncThunk(
  "shopProfile/getListShopProfile",
  async () => {
    const response = await ShopProfileServices.getAllShopProfile();
    return response;
  }
);

export const getShopProfileById = createAsyncThunk(
  "shopProfile/getShopProfileById",
  async (id: string) => {
    const response = await ShopProfileServices.getShopProfileById(id);
    return response;
  }
);

export const createShopProfile = createAsyncThunk(
  "shopProfile/createShopProfile",
  async (shopProfile: UpdateShopProfileRequest) => {
    const response = await ShopProfileServices.createShopProfile(shopProfile);
    return response;
  }
);

export const updateShopProfile = createAsyncThunk(
  "shopProfile/updateShopProfile",
  async (params: { id: string; shopProfile: UpdateShopProfileRequest }) => {
    const response = await ShopProfileServices.updateShopProfile(
      params.id,
      params.shopProfile
    );
    return response;
  }
);

export const deleteShopProfile = createAsyncThunk(
  "shopProfile/deleteShopProfile",
  async (id: string) => {
    await ShopProfileServices.deleteShopProfile(id);
    return id;
  }
);

interface InitialStateType {
  shopProfileList: IShopProfile[];
  shopProfileDetail: IShopProfile;
  loading: boolean;
}
const initialState: InitialStateType = {
  shopProfileList: [],
  shopProfileDetail: {
    id: "",
    user: "",
    logo: "",
    wallImage: "",
    description: "",
    name: "",
    status: "",
    isDeleted: false,
    deleteAt: "",
    dateCreated: "",
    dateUpdate: ""
  },
  loading: false
};

const shopProfileSlice = createSlice({
  name: "shopProfile",
  initialState,
  reducers: {},
  extraReducers: {
    [getListShopProfile.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getListShopProfile.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopProfile[]>
    ) => {
      state.loading = false;
      state.shopProfileList = [...action.payload];
    },
    [getListShopProfile.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [getShopProfileById.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getShopProfileById.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopProfile>
    ) => {
      state.loading = false;
      state.shopProfileDetail = action.payload;
    },
    [getShopProfileById.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [createShopProfile.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createShopProfile.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopProfile>
    ) => {
      state.loading = false;
      state.shopProfileList = [...state.shopProfileList, action.payload];
    },
    [createShopProfile.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [updateShopProfile.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateShopProfile.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopProfile>
    ) => {
      state.loading = false;
      const newShopProfile = state.shopProfileList.filter(
        (shopProfile: IShopProfile) => shopProfile.id !== action.payload.id
      );
      state.shopProfileList = [action.payload, ...newShopProfile];
    },
    [updateShopProfile.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [deleteShopProfile.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteShopProfile.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopProfile>
    ) => {
      state.loading = false;
      const newShopProfileList = state.shopProfileList.filter(
        (ShopProfile: IShopProfile) => ShopProfile.id !== action.payload
      );
      state.shopProfileList = [...newShopProfileList];
    },
    [deleteShopProfile.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const ShopProfileActions = shopProfileSlice.actions;

export default shopProfileSlice.reducer;

export const selectShopProfileList = (state: RootState) =>
  state.shopProfile.shopProfileList;
export const selectShopProfileDetail = (state: RootState) =>
  state.shopProfile.shopProfileList;
export const selectShopProfileLoading = (state: RootState) =>
  state.shopProfile.loading;
