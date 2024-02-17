import axios from 'axios';
import { server } from '../../sever';

import {
  LoadUserFail,
  LoadUserRequest,
  LoadUserSuccess,
} from '../reducers/userRducer';

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    let { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
    });

    dispatch(LoadUserSuccess(data && data.user));
    return data?.user.address;
  } catch (error) {
    dispatch(LoadUserFail(error?.response?.data.message));
  }
};
