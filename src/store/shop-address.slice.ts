import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import ShopAddressServices, {
  UpdateShopAddressRequest
} from "services/shop-address.service";
import { IShopAddress } from "types/shop/address";
import { RootState } from "./store";

export const getListShopAddress = createAsyncThunk(
  "shopAddress/getListShopAddress",
  async () => {
    const response = await ShopAddressServices.getAllShopAddress();
    return response;
  }
);

export const getShopAddressById = createAsyncThunk(
  "shopAddress/getShopAddressById",
  async (id: string) => {
    const response = await ShopAddressServices.getShopAddressById(id);
    return response;
  }
);

export const createShopAddress = createAsyncThunk(
  "shopAddress/createShopAddress",
  async (shopAddress: UpdateShopAddressRequest) => {
    const response = await ShopAddressServices.createShopAddress(shopAddress);
    return response;
  }
);

export const updateShopAddress = createAsyncThunk(
  "shopAddress/updateShopAddress",
  async (params: { id: string; shopAddress: UpdateShopAddressRequest }) => {
    const response = await ShopAddressServices.updateShopAddress(
      params.id,
      params.shopAddress
    );
    return response;
  }
);

export const deleteShopAddress = createAsyncThunk(
  "shopAddress/deleteShopAddress",
  async (id: string) => {
    await ShopAddressServices.deleteShopAddress(id);
    return id;
  }
);

interface InitialStateType {
  shopAddressList: IShopAddress[];
  shopAddressDetail: IShopAddress;
  loading: boolean;
}
const initialState: InitialStateType = {
  shopAddressList: [],
  shopAddressDetail: {
    id: "",
    shopProfile: "",
    phone: "",
    fullName: "",
    city: "",
    address: "",
    subAddress: "",
    label: "",
    isDefault: "",
    status: "",
    isDeleted: false,
    deletedAt: "",
    dateCreated: "",
    dateUpdated: ""
  },
  loading: false
};

const shopAddressSlice = createSlice({
  name: "shopAddress",
  initialState,
  reducers: {},
  extraReducers: {
    [getListShopAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getListShopAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopAddress[]>
    ) => {
      state.loading = false;
      state.shopAddressList = [...action.payload];
    },
    [getListShopAddress.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [getShopAddressById.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getShopAddressById.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopAddress>
    ) => {
      state.loading = false;
      state.shopAddressDetail = action.payload;
    },
    [getShopAddressById.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [createShopAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createShopAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopAddress>
    ) => {
      state.loading = false;
      state.shopAddressList = [...state.shopAddressList, action.payload];
    },
    [createShopAddress.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [updateShopAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateShopAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopAddress>
    ) => {
      state.loading = false;
      const newShopAddress = state.shopAddressList.map(
        (Address: IShopAddress) => {
          if (Address.id === action.payload.id) {
            return action.payload;
          }
          return Address;
        }
      );
      state.shopAddressList = newShopAddress;
    },
    [updateShopAddress.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [deleteShopAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteShopAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IShopAddress>
    ) => {
      state.loading = false;
      const newShopAddressList = state.shopAddressList.filter(
        (ShopAddress: IShopAddress) => ShopAddress.id !== action.payload
      );
      state.shopAddressList = [...newShopAddressList];
    },
    [deleteShopAddress.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const ShopAddressActions = shopAddressSlice.actions;

export default shopAddressSlice.reducer;

export const selectShopAddressList = (state: RootState) =>
  state.shopAddress.shopAddressList;
export const selectShopAddressDetail = (state: RootState) =>
  state.shopAddress.shopAddressDetail;
export const selectShopAddressLoading = (state: RootState) =>
  state.shopAddress.loading;
