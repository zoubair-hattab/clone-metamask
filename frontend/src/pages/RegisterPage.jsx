import React, { useEffect } from 'react';
import Register from '../components/register/Register';
import Header from '../components/layout/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      return navigate('/home');
    }
  }, [isAuthenticated]);
  return (
    <>
      <Header />
      <Register />
    </>
  );
};

export default RegisterPage;
