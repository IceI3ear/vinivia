import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import AddressServices, {
  UpdateAddressRequest
} from "services/address.service";
import { IAddress } from "types/user/address";
import { RootState } from "./store";

export const getListAddress = createAsyncThunk(
  "address/getListAddress",
  async () => {
    const response = await AddressServices.getAllAddress();
    return response;
  }
);

export const getAddressById = createAsyncThunk(
  "address/getAddressById",
  async (id: string) => {
    const response = await AddressServices.getAddressById(id);
    return response;
  }
);

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (Address: UpdateAddressRequest) => {
    const response = await AddressServices.createAddress(Address);
    return response;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (params: { id: string; address: UpdateAddressRequest }) => {
    const response = await AddressServices.updateAddress(
      params.id,
      params.address
    );
    return response;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id: string) => {
    await AddressServices.deleteAddress(id);
    return id;
  }
);

interface InitialStateType {
  addressList: IAddress[];
  addressDetail: IAddress;
  loading: boolean;
}
const initialState: InitialStateType = {
  addressList: [],
  addressDetail: {
    id: "",
    user: "",
    phone: "",
    fullName: "",
    city: "",
    address: "",
    subAddress: "",
    label: "",
    isDefault: "",
    status: "",
    isDeleted: false,
    deleteAt: "",
    dateCreated: "",
    dateUpdate: ""
  },
  loading: false
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: {
    [getListAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getListAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAddress[]>
    ) => {
      state.loading = false;
      state.addressList = [...action.payload];
    },
    [getListAddress.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [getAddressById.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAddressById.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAddress>
    ) => {
      state.loading = false;
      state.addressDetail = action.payload;
    },
    [getAddressById.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [createAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [createAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAddress>
    ) => {
      state.loading = false;
      state.addressList = [...state.addressList, action.payload];
    },
    [createAddress.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [updateAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [updateAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAddress>
    ) => {
      state.loading = false;
      const newAddress = state.addressList.map((Address: IAddress) => {
        if (Address.id === action.payload.id) {
          return action.payload;
        }
        return Address;
      });
      state.addressList = newAddress;
    },
    [updateAddress.rejected.toString()]: (state) => {
      state.loading = false;
    },

    [deleteAddress.pending.toString()]: (state) => {
      state.loading = true;
    },
    [deleteAddress.fulfilled.toString()]: (
      state,
      action: PayloadAction<IAddress>
    ) => {
      state.loading = false;
      const newAddressList = state.addressList.filter(
        (Address: IAddress) => Address.id !== action.payload
      );
      state.addressList = [...newAddressList];
    },
    [deleteAddress.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export const AddressActions = addressSlice.actions;

export default addressSlice.reducer;

export const selectAddressList = (state: RootState) =>
  state.address.addressList;
export const selectAddressDetail = (state: RootState) =>
  state.address.addressDetail;
export const selectAddressLoading = (state: RootState) => state.address.loading;
