import React, { useState } from 'react';
import wallet from '../../assets/wallet.png';
import { ethers } from 'ethers';
import axios from 'axios';
import './login.css';
import { server } from '../../sever';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const wallet = ethers.Wallet.createRandom();
      if (wallet.address) {
        const res = await axios.post(`${server}/user/create-user`, {
          name: userData?.name,
          email: userData?.email,
          password: userData?.password,
          address: wallet.address,
          privateKey: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        });
        toast.success(res.data.message);
      }

      setUserData({
        name: '',
        email: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="section login">
      <div className="container">
        <div className="content">
          <img src={wallet} alt="" width={60} height={60} className="image" />
          <p className="title-login">Create New Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="name"
              className="input"
              name="name"
              placeholder="Your name"
              onChange={handleChangeInput}
              value={userData?.name}
            />
          </div>
          <div>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Your Email"
              onChange={handleChangeInput}
              value={userData?.email}
            />
          </div>
          <div>
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Your password"
              onChange={handleChangeInput}
              value={userData?.password}
            />
          </div>
          <button type="submit" className="btn">
            Create Account
          </button>
        </form>
        <p className="create-account">
          Login to your account <Link to="/">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
