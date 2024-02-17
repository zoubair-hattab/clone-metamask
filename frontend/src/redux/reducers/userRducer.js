import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userChange:
    JSON.parse(localStorage.getItem('user')) != null
      ? JSON.parse(localStorage.getItem('user'))
      : null,
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    addChangeUser: (state, action) => {
      state.userChange = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { LoadUserRequest, LoadUserSuccess, LoadUserFail, addChangeUser } =
  userReducer.actions;

export default userReducer.reducer;
