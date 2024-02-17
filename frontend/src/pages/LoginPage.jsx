import React, { useEffect } from 'react';
import Login from '../components/lgoin/Login';
import Header from '../components/layout/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated === true) {
      return navigate('/home');
    }
  }, [isAuthenticated]);
  return (
    <>
      <Header />
      <Login />
    </>
  );
};

export default LoginPage;
