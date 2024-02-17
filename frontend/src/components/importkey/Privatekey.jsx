import React, { useState } from 'react';
import wallet from '../../assets/wallet.png';
import './login.css';
import Register from '../register/Register';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Home from '../home/Home';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../redux/actions/accountAction';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const PrivateKey = () => {
  const [back, setBack] = useState(false);
  const [privateKey, setPrivateKey] = useState();
  const { currentProvider } = useSelector((state) => state.provider);
  const navigate = useNavigate();
  console.log(privateKey);
  const dispatch = useDispatch();
  const addAccount = async (e) => {
    e.preventDefault();

    const provider = new ethers.providers.JsonRpcProvider(currentProvider);
    let wallet = new ethers.Wallet(privateKey, provider);
    const data = {
      privateKey: privateKey,
      address: wallet.address,
    };
    await dispatch(createAccount(data));
    navigate('/home');
  };

  return (
    <>
      {back ? (
        <Home />
      ) : (
        <section className="section login">
          <div className="container">
            <div className="content">
              <IoMdArrowRoundBack
                size={35}
                color="#10aafe"
                onClick={() => setBack(true)}
              />
              <p className="title-send">Import Private Key</p>
            </div>
            <form onSubmit={addAccount}>
              <div>
                <input
                  type="text"
                  className="input"
                  name="address"
                  placeholder="Enter your private key"
                  onChange={(e) => setPrivateKey(e.target.value)}
                />
              </div>

              <button type="submit" className="btn">
                Import
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default PrivateKey;
