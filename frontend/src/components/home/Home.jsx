import React, { useEffect, useState } from 'react';
import wallet from '../../assets/wallet.png';
import './home.css';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { IoIosSend } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import PrivateKey from '../importkey/Privatekey';
import SendToken from '../sendToken/SendToken';
import UploadToken from '../uploadToken/UploadToken';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../sever';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MyAccount from '../myAccount/MyAccount';

const Home = () => {
  const [account, setAccount] = useState(false);
  const [send, setSend] = useState(false);
  const [upload, setUpload] = useState(false);
  const [activity, setActivity] = useState(false);
  const { user, userChange } = useSelector((state) => state.user);
  const { balance } = useSelector((state) => state.provider);
  const [assets, setAssets] = useState(false);
  const navigate = useNavigate();
  const copyAddress = () => {
    navigator.clipboard.writeText(
      userChange ? userChange?.address : user?.address
    );
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      window.location.reload(true);
      localStorage.removeItem('net');
      localStorage.removeItem('user');

      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <>
      {account ? (
        <PrivateKey />
      ) : send ? (
        <SendToken />
      ) : upload ? (
        <UploadToken />
      ) : (
        <section className="section">
          <div className="container">
            <div className="address">
              <p className="account" onClick={copyAddress}>
                {userChange
                  ? userChange?.address?.slice(0, 16)
                  : user?.address.slice(0, 16)}
                ...
              </p>
              <p className="status">Active</p>
            </div>
            <div className="content">
              <img src={wallet} alt="" width={60} height={60} />
              <p className="amount">
                {balance
                  ? Number.parseFloat(balance && balance)?.toFixed(5)
                  : '0.00'}
              </p>
            </div>
            <ul className="home-items">
              <li className="item">
                <div className="box">
                  <RiShoppingCart2Fill size={22} color="#10aafe" />
                  <p className="item-title">Buy</p>
                </div>
              </li>
              <li className="item" onClick={() => setSend(true)}>
                <div className="box">
                  <IoIosSend size={22} color="#10aafe" />
                  <p className="item-title">Send</p>
                </div>
              </li>
              <li className="item" onClick={() => setAccount(true)}>
                <div className="box">
                  <FaUser size={22} color="#10aafe" />
                  <p className="item-title">Account</p>
                </div>
              </li>
              <li className="item" onClick={() => setUpload(true)}>
                <div className="box">
                  <FaUpload size={22} color="#10aafe" />
                  <p className="item-title">Upload</p>
                </div>
              </li>
            </ul>
            <ul className="home-items activity">
              <li className="item" onClick={() => setAssets(!assets)}>
                Assets
              </li>
              <li className="item" onClick={logoutHandler}>
                Logout
              </li>

              <li className="item" onClick={() => setActivity(true)}>
                Activity
              </li>
            </ul>
            {assets && <MyAccount />}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
