import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Pagination } from '@windmill/react-ui';
import useStyles from './style';
import FilledButton from 'components/Buttons/FilledButton';

import HotProposals from 'components/Home/HotProposals';
import HowItWork from 'components/Home/HowItWork';
import Container from '../../components/Layout/Container';

const customStyles = {
  control: base => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '50px',
    minWidth: '150px',
    border: '1px solid #21274F !important',
    boxShadow: 'none',

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

const FormatsortOptionLabel = ({ value, label }) => (
  <div style={{ display: "flex", alignItems: "center", background: "transparent", height: "40px" }}>
    <div style={{ color: "black", fontWeight: "bold", paddingLeft: "10px" }}>{label}</div>
  </div>
);

const Home = (props: any) => {
  const { connectAccount } = props;
  const { account } = useWeb3React();
  const classes = useStyles();

  const [searchTxt, setSearchTxt] = useState('');

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, [categories]);

  function fetchCategories() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log("err: ", err.message);
        setCategories([]);
      });
  }
  const handleSelectCategory = (e: any) => {
    const index = e.value
    setCategory(categories[index].label);
  };

  const [chainId, setChainId] = useState(0);
  const handleSelectNetwork = (e: any) => {
    setChainId(e.value);
  };

  // const networkOptions = [
  //   { value: 0, label: 'All Network' },
  //   { value: 1, label: 'Ethereum' },
  //   { value: 137, label: 'Polygon' },
  //   { value: 250, label: 'Fantom' },
  //   { value: 43114, label: 'Avalanche' },
  //   { value: 100, label: 'Gnosis' },
  // ];
  const networkOptions = [
    { value: 0, label: 'All Network' },
    { value: 1, label: 'Ethereum' },
    { value: 250, label: 'Fantom' },
    { value: 43114, label: 'Avalanche' },
    { value: 100, label: 'Gnosis' },
  ];

  const [spaces, setSpaces] = useState([]);
  const [spaceCount, setSpaceCount] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setSpaces([]);
    setPage(1);
    fetchSpaces();
  }, [category, chainId, searchTxt])

  useEffect(() => {
    fetchSpaces();
  }, [page])

  function fetchSpaces() {
    let paramData: any = {
      limit: 4,
      page: page
    };
    if (searchTxt) {
      paramData.searchTxt = searchTxt;
    }
    if (category) {
      paramData.category = category;
    }
    if (chainId > 0) {
      paramData.chainId = chainId;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/api/spaces`, {
      params: paramData
    })
      .then((res) => {
        if (res) {
          setSpaceCount(res.data.count);
          setSpaces(res.data.spaces);
        } else {
          setSpaceCount(0);
          setSpaces([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setSpaces([]);
      });
  }

  return (
    <Container className={classes.root}>
      <div className={classes.topSection}>
        <div className={classes.wrapper}>
          <h1>Govern better, together</h1>
          <h1 style={{color:'#6440fe'}}>Build your DAO on PollBox.</h1>
          <p>Build your Decentralized Autonomous Organization</p>
          <p>that makes it easy to create and vote on proposals</p>          
          <FilledButton className={classes.conBtn}
            label={account ? 'Create Box' : 'Connect Wallet'}
            handleClick={() => {
              if (account) {
                window.open('/create_space', '_self')
              } else {
                connectAccount();
              }
            }} />
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.rootContent}>
          <div className={classes.top}>
            <div className='search-content'>
              <input className=''
                type={'text'}
                placeholder='Search...'
                onChange={(e) => setSearchTxt(e.target.value)}
              />
              <i className='fa fa-search'></i>
            </div>
            {
              categories && categories.length > 0 &&
              <span>
                <Select
                  defaultValue={categories[0]}
                  formatOptionLabel={FormatsortOptionLabel}
                  options={categories}
                  instanceId="chainSelect"
                  className={`select-gray `}
                  onChange={e => handleSelectCategory(e)}
                  isSearchable={false}
                  isClearable={false}
                  styles={customStyles}
                />
              </span>
            }
            <span>
              <Select
                defaultValue={networkOptions[0]}
                formatOptionLabel={FormatsortOptionLabel}
                options={networkOptions}
                instanceId="chainSelect"
                className={`select-gray `}
                onChange={e => handleSelectNetwork(e)}
                isSearchable={false}
                isClearable={false}
                styles={customStyles}
              />
            </span>
          </div>
          <div className={classes.spaceLists}>
            <div className='full'>
              {spaces.map((space: any, index: any) => (
                <div
                  key={index}
                  className='root'
                  onClick={() => window.open(`/space-detail/${space.id}`, "_self")}
                >
                  <div className='container'>
                    <div className='avataWrapper'>
                      <img src={space.logo} alt='investor' />
                    </div>
                    <div className='infoWrapper'>
                      <p className='name'>{space.name}</p>
                      <p>{space.totalVoters} members</p>
                    </div>
                    <div className='join'>
                      Join
                    </div>
                  </div>
                </div>
              ))}

            </div>
            {
              spaceCount > 0 &&
              <Pagination
                totalResults={spaceCount}
                resultsPerPage={4}
                onChange={(p) => {
                  setPage(p);
                }}
                label="Spaces Navigation"
              />
            }
          </div>
        </div>
      </div>

      <div className={classes.section}>
        <HotProposals />
      </div>
      <div className={classes.section}>
        <HowItWork />
      </div>
    </Container >
  );
};

export default Home;
