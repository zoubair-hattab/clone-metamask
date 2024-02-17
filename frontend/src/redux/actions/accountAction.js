import axios from 'axios';
import {
  accountCreateFail,
  accountCreateRequest,
  accountCreateSuccess,
  getAllaccountsFailed,
  getAllaccountsRequest,
  getAllaccountsSuccess,
} from '../reducers/accountReducer';
import { server } from '../../sever';
import { toast } from 'react-toastify';

// create account
export const createAccount = (data) => async (dispatch) => {
  try {
    dispatch(accountCreateRequest());

    const res = await axios.post(`${server}/account/createaccount`, data, {
      withCredentials: true,
    });
    toast.success('add new account');
    dispatch(accountCreateSuccess(res.data.account));
  } catch (error) {
    toast.error(error.response.data.message);

    dispatch(accountCreateFail(error.response.data.message));
  }
};

// get all accounts
export const getAllAccounts = () => async (dispatch) => {
  try {
    dispatch(getAllaccountsRequest());
    const { data } = await axios.get(`${server}/account/allaccount`);
    console.log(data.accounts);
    dispatch(getAllaccountsSuccess(data.accounts));
  } catch (error) {
    dispatch(getAllaccountsFailed(error.response.data.message));
  }
};
