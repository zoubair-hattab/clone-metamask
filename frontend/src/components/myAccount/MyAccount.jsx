import React from 'react';
import './myaccount.css';
import { useDispatch, useSelector } from 'react-redux';
import { addChangeUser } from '../../redux/reducers/userRducer';
const MyAccount = () => {
  const { accounts } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const changeAccount = (item) => {
    const userWallet = {
      address: item.address,
      privateKey: item.privateKey,
    };
    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem('user', jsonObj);
    dispatch(addChangeUser(userWallet));
  };
  return (
    <ul className="accounts">
      {accounts?.map((item, index) => (
        <li className="item" key={index} onClick={() => changeAccount(item)}>
          <p>{index}</p>
          <p>{item?.address}</p>
        </li>
      ))}
    </ul>
  );
};

export default MyAccount;
