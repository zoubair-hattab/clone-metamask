import { currentBalance, selectNetwork } from '../reducers/networkReducer';
import { ethers } from 'ethers';
export const currentProvider = (data) => async (dispatch) => {
  dispatch(selectNetwork(data));
};

export const chargeProvider = (url, address) => async (dispatch) => {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.utils.formatEther(balance);
  console.log(balanceInEth);
  dispatch(currentBalance(balanceInEth));
};

//dispatch(selectNetwork('ff'));
