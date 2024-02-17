import React, { useEffect } from 'react';
import Header from '../components/layout/Header';
import Home from '../components/home/Home';
import Register from '../components/register/Register';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate('/');
    }
  }, [isAuthenticated]);
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
};

export default HomePage;
