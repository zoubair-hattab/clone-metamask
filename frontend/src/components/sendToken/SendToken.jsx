import React, { useState } from 'react';
import wallet from '../../assets/wallet.png';
import './login.css';
import Register from '../register/Register';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Home from '../home/Home';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const SendToken = () => {
  const [back, setBack] = useState(false);
  const { currentProvider } = useSelector((state) => state.provider);
  const { user, userChange } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    address: '',
    amount: '',
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handler = async (e) => {
    try {
      e.preventDefault();
      const provider = new ethers.providers.JsonRpcProvider(currentProvider);
      let wallet = new ethers.Wallet(
        userChange ? userChange?.privateKey : user?.privateKey,
        provider
      );
      const tx = {
        to: userData.address,
        value: ethers.utils.parseEther(userData.amount),
      };
      const texHash = await wallet.sendTransaction(tx);
      toast.success('transaction send');
    } catch (error) {
      toast.error(error.message);
    }
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
              <p className="title-send">Send Token</p>
            </div>
            <form onSubmit={handler}>
              <div>
                <input
                  type="text"
                  className="input"
                  name="address"
                  placeholder="Target Address"
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="input"
                  name="amount"
                  placeholder="Enter Amount of token"
                  onChange={handleChangeInput}
                />
              </div>
              <button type="submit" className="btn">
                Send
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default SendToken;
