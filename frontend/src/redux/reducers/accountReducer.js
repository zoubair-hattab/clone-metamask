import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

export const accountReducer = createSlice({
  name: 'accountReducer',
  initialState,
  reducers: {
    accountCreateRequest: (state) => {
      state.isLoading = true;
    },
    accountCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.account = action.payload;
      state.success = true;
    },
    accountCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    // get all accounts
    getAllaccountsRequest: (state) => {
      state.isLoading = true;
    },
    getAllaccountsSuccess: (state, action) => {
      state.isLoading = false;
      state.accounts = action.payload;
    },
    getAllaccountsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  accountCreateRequest,
  accountCreateSuccess,
  accountCreateFail,
  getAllaccountsRequest,
  getAllaccountsSuccess,
  getAllaccountsFailed,
  clearErrors,
} = accountReducer.actions;

export default accountReducer.reducer;
