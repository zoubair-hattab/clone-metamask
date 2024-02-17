import React, { useState } from 'react';
import wallet from '../../assets/wallet.png';
import './login.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Home from '../home/Home';

const UploadToken = () => {
  const [back, setBack] = useState(false);
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
              <p className="title-send">Upload Token</p>
            </div>
            <form action="">
              <div>
                <input
                  type="Text"
                  className="input"
                  name="address"
                  placeholder="Token Address"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Enter name of token"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="input"
                  name="symbol"
                  placeholder="Enter name of symbol"
                />
              </div>
              <button type="submit" className="btn">
                Upload Token
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default UploadToken;
