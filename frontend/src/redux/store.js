import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userRducer';
import networkReducer from './reducers/networkReducer';
import accountReducer from './reducers/accountReducer';

const Store = configureStore({
  reducer: {
    user: userReducer,
    provider: networkReducer,
    account: accountReducer,
  },
});
export default Store;
