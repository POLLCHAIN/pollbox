import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import './topbar.scss';
import FilledButton from 'components/Buttons/FilledButton';
import Select from 'react-select';

import { useAuthDispatch, logout } from "hooks/authContext";
import { connectorLocalStorageKey } from 'utils/connectors';
import { setupNetwork } from 'utils/wallet';

const customStyles = {
  control: base => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    minWidth: '150px',
    border: '1px solid #21274F !important',
    boxShadow: 'none',
    marginRight: '10px',
    '@media screen and (max-width: 540px)': {
      marginRight: '5px',
      fontSize: 13,
      minWidth: '120px',
    },

    '&:focus': {
      border: '0 !important',
    },
  }),

  menu: (provided, state) => ({
    ...provided,
    border: '1px solid #ffffff13',
    color: '#fff',
    padding: 0,
    background: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #aaa',
    padding: 3,
    color: '#fff',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#ddd',
    },
    ':active': {
      backgroundColor: '#555',
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};
const optionSyle = {
  display: "flex",
  alignItems: "center",
  background: "transparent"
};
const FormatsortOptionLabel = ({ value, label }) => (
  <div style={optionSyle} className='option'>
    <div style={{ color: "black", fontWeight: "bold", paddingLeft: "10px" }}>{label}</div>
  </div>
);

type MenuType = {
  menuOpen?: boolean;
  setMenuOpen?(flag: boolean): void;
  connectAccount: any;
};


export default function Topbar({ menuOpen, setMenuOpen, connectAccount }: MenuType) {

  const { account, chainId, deactivate, activate } = useWeb3React();
  const dispatch = useAuthDispatch();
  function signOut() {
    deactivate();
    logout(dispatch);
    window.localStorage.setItem(connectorLocalStorageKey, "");
  }

  const [tempChainId, setTempChainId] = useState(0);
  const handleSelectNetwork = (e: any) => {
    if (chainId) {
      setupNetwork(e.value);
    } else {
      setNetworkOption(e);
      setTempChainId(e.value);
    }
  };
  const networkOptions = [
    { value: 1, label: 'Ethereum' },
    { value: 56, label: 'BSC' },
    { value: 137, label: 'Polygon' },
    { value: 8217, label: 'Klaytn' },
  ];

  const [networkOption, setNetworkOption] = useState(networkOptions[0]);
  useEffect(() => {
    if (chainId) {
      if (tempChainId > 0 && chainId !== tempChainId) {
        // open switch dialog
        setupNetwork(tempChainId);
        setTempChainId(0);
      } else {
        for (let index = 0; index < networkOptions.length; index++) {
          const networkOption = networkOptions[index];
          if (networkOption.value === chainId) {
            setNetworkOption(networkOption);
          }
        }
      }
    }
  }, [chainId, tempChainId])

  return (
    <div className="nav-background">
      <div className="topbar">
        <div className="logo">
          <div className={menuOpen ? 'hamburger active' : 'hamburger'} onClick={() => setMenuOpen(!menuOpen)}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
          <a href="/">
            <img src="/assets/logo.png" alt="" />
            <h1>PollBox</h1>
          </a>
        </div>
        <div className="navList">
          <ul>
            <li className={window.location.href.includes('nft') ? '' : 'selected'}>
              <a href="/home">
                TOKEN
              </a>
            </li>  
            <li className={window.location.href.includes('nft') ? 'selected' : ''}>
              <a href="https://nft.pollbox.org/home">
                NFT
              </a>
            </li>
            <Select
              value={networkOption}
              formatOptionLabel={FormatsortOptionLabel}
              options={networkOptions}
              instanceId="chainSelect"
              className={`select-gray `}
              onChange={e => handleSelectNetwork(e)}
              isSearchable={false}
              isClearable={false}
              styles={customStyles}
            />
          </ul>
          <div className="connectBtn">
            {account ? (
              <FilledButton
                handleClick={() => {
                  signOut();
                }}
                label={
                  <>
                    Disconnect
                  </>
                }
              ></FilledButton>
            ) : (
              <FilledButton
                handleClick={() => {
                  connectAccount();
                }}
                label={
                  <>
                    Connect
                  </>
                }
              ></FilledButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
