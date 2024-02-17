import React, { useState } from 'react';
import wallet from '../../assets/wallet.png';
import './login.css';
import Register from '../register/Register';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../sever';

const Login = () => {
  const [userData, setUserData] = useState({
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
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/user/login-user`,
        {
          email: userData.email,
          password: userData.password,
        },
        { withCredentials: true }
      );
      toast.success('Login Success!');
      window.location.reload(true);
      navigate('/home');
    } catch (err) {
      toast.error(err?.response?.data.message);
    }
  };
  return (
    <section className="section login">
      <div className="container">
        <div className="content">
          <img src={wallet} alt="" width={60} height={60} className="image" />
          <p className="title-login">Login to your Account</p>
        </div>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div className="create-account">
          <p className="create-account">
            Create new Account <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
