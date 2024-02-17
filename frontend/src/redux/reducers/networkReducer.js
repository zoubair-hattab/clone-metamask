import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentProvider: JSON.parse(localStorage.getItem('net'))?.provider
    ? JSON.parse(localStorage.getItem('net'))?.provider
    : 'https://polygon-mumbai.g.alchemy.com/v2/zugfZUB20fp_7ROh0A8GWM69rh_M2-4n',
};

export const networkReducer = createSlice({
  name: 'networkReducer',
  initialState,
  reducers: {
    selectNetwork: (state, action) => {
      state.currentProvider = action.payload;
    },
    currentBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { selectNetwork, currentBalance } = networkReducer.actions;

export default networkReducer.reducer;
