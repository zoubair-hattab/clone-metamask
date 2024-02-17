import React, { useEffect, useRef, useState } from 'react';
import wallet from '../../assets/wallet.png';
import { IoLockClosedSharp } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';
import { CiWallet } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import './header.css';
import { currentProvider } from '../../redux/actions/networkAction';
import { useDispatch } from 'react-redux';
const Header = () => {
  const element = useRef();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const chooseNetwork = (e) => {
    setActive(false);
    let providerURL;
    element.current.innerHTML = e.target.innerText;
    if (e.target.innerText === 'Ethereum Mainnet')
      providerURL = 'https://rpc.ankr.com/eth';
    else if (e.target.innerText === 'Polygon Mainnet')
      providerURL = 'https://rpc.ankr.com/polygon';
    else if (e.target.innerText === 'Polygon Mumbai')
      providerURL = 'https://rpc.ankr.com/polygon_mumbai';
    else if (e.target.innerText === 'Sepolia test network')
      providerURL = 'https://rpc.ankr.com/eth_sepolia';
    const network = {
      name: e.target.innerText,
      provider: providerURL,
    };
    dispatch(currentProvider(providerURL));
    localStorage.setItem('net', JSON.stringify(network));
  };
  useEffect(() => {
    element.current.innerHTML = JSON.parse(localStorage.getItem('net'))?.name
      ? JSON.parse(localStorage.getItem('net'))?.name
      : 'Polygon Mumbai';
  });
  return (
    <header className="header" data-header>
      <div className="container">
        <img src={wallet} alt="" width={40} height={40} />
        <div className="select-item">
          <p className="select-title" onClick={() => setActive(true)}>
            <span ref={element} className="">
              Polygon Mumbai
            </span>
            <FaChevronDown size={15} color="#10aafe" />
          </p>
          <ul className={`${active && 'active '} list-items`}>
            <li className="item" onClick={chooseNetwork}>
              <div className="net-box">
                <IoLockClosedSharp size={15} color="#10aafe" />
                <p>Polygon Mumbai</p>
              </div>
            </li>
            <li className="item" onClick={chooseNetwork}>
              <div className="net-box">
                <IoLockClosedSharp size={15} color="#10aafe" />
                <p>Polygon Mainnet</p>
              </div>
            </li>
            <li className="item" onClick={chooseNetwork}>
              <div className="net-box">
                <IoLockClosedSharp size={15} color="#10aafe" />
                <p>Ethereum Mainnet</p>
              </div>
            </li>
            <li className="item" onClick={chooseNetwork}>
              <div className="net-box">
                <IoLockClosedSharp size={15} color="#10aafe" />
                <p>Sepolia test network</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
