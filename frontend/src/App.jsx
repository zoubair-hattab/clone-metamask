import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction';
import Store from './redux/store';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ActivationPage from './pages/ActivationPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';
import { chargeProvider, currentProvider } from './redux/actions/networkAction';
import { ethers } from 'ethers';
import { getAllAccounts } from './redux/actions/accountAction';
function App() {
  const dispatch = useDispatch();
  const { currentProvider } = useSelector((state) => state.provider);
  const { account } = useSelector((state) => state.account);
  const { userChange } = useSelector((state) => state.user);

  useEffect(() => {
    const loadData = async () => {
      const address = await Store.dispatch(loadUser());

      Store.dispatch(
        chargeProvider(
          currentProvider,
          userChange ? userChange?.address : address
        )
      );
      Store.dispatch(getAllAccounts());
    };
    loadData();
  }, [currentProvider, account, userChange]);
  return (
    <div className="card">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </HashRouter>
      <div className="body-bg-shape"></div>
    </div>
  );
}

export default App;
