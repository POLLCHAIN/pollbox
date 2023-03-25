import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import toast from "react-hot-toast";
import axios from 'axios';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

import FilledButton from 'components/Buttons/FilledButton';
import Container from '../../components/Layout/Container';
import useStyles from './style';
import { getIpfsHashFromFile } from 'utils/ipfs';

import { formatNum } from 'utils';
import { isTokenContract, getTokenBalance, getCreatePrice, createSpace } from '../../utils/contracts';

const customStyles = {
  control: base => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '50px',
    width: '100%',
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

const sleep = (ms: any) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const CreateSpace = () => {
  const classes = useStyles();
  const { account, chainId, library } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const [priceInfo, setPriceInfo] = useState(null);
  useEffect(() => {
    getCreatePrice(chainId, library?.getSigner())
      .then((result) => {
        setPriceInfo(result)
      })
      .catch(() => {
        setPriceInfo(null)
      })
  }, [chainId, library])

  const [tokenBalance, setTokenBalance] = useState(0);
  useEffect(() => {
    if (account && library && chainId && priceInfo) {
      if (priceInfo.tokenAddr === '0x0000000000000000000000000000000000000000') {
        library.getBalance(account)
          .then((value: any) => {
            var etherVal = parseFloat(ethers.utils.formatEther(value));
            setTokenBalance(etherVal)
          })
          .catch(() => {
            setTokenBalance(0)
          })
      } else {
        getTokenBalance(account, priceInfo.tokenAddr, chainId, library?.getSigner())
          .then((balance) => {
            setTokenBalance(balance)
          })
          .catch(() => {
            setTokenBalance(0)
          })
      }
    }
    return () => {
      setTokenBalance(0)
    }
  }, [account, library, chainId, priceInfo])


  const [logoFile, setLogoFile] = useState(null);
  const [logoHash, setLogoHash] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);

  function handleLogo(event: any) {
    const fileType = event.target.files[0].type.split("/")[0];
    if (fileType === "image") {
      setLogoFile(event.target.files[0]);
      setLogoUploading(true);
      getIpfsHashFromFile(event.target.files[0]).then((hash) => {
        if (hash) {
          setLogoHash(`https://pollchain.mypinata.cloud/ipfs/${hash}`);
          setLogoUploading(false);
          return;
        } else {
          toast.error("Fail to upload media!");
          return;
        }

      });
    }
  }
  function closeLogo() {
    setLogoFile(null);
    setLogoHash("");
    setLogoUploading(false);
  }

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Social links
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");
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

  const [powerTokenAddress, setPowerTokenAddress] = useState("");
  const [price, setPrice] = useState(0);

  async function onCreateSpace() {
    if (loading) {
      return;
    }

    if (tokenBalance < Number(priceInfo.price)) {
      toast.error("Insufficiant funds!");
      return;
    }

    const tokenStatus = await isTokenContract(powerTokenAddress, chainId, library?.getSigner());
    if (!tokenStatus) {
      toast.error("Please Input Power Token Address Correctly!");
      return;
    }

    if (name === '') {
      toast.error("Please Input Name!");
      return;
    }
    if (about === '') {
      toast.error("Please Input Description!");
      return;
    }

    if (!logoHash) {
      toast.error("Please Select Logo!");
      return;
    }
    if (price <= 0) {
      toast.error("Please Input Limit Price!");
      return;
    }
    const socialMetaData = {
      website: website,
      facebook: facebook,
      twitter: twitter,
      linkedin: linkedin
    }

    const socialStr = JSON.stringify(socialMetaData);
    const load_toast_id = toast.loading("Creating Space...");
    setLoading(true);
    createSpace(
      account,
      logoHash,
      name,
      about,
      category,
      powerTokenAddress,
      price,
      socialStr,
      chainId,
      library?.getSigner()
    ).then(async (result) => {
      toast.dismiss(load_toast_id);
      setLoading(false);
      if (result) {
        toast.success("Space is Created! Data will be updated after some block confirmations");
        sleep(2000);
        window.open(`/home`, "_self");
        return;
      } else {
        toast.error("Failed to Create Box(Transaction Failed!)");
        return;
      }
    }).catch(err => {
      toast.dismiss(load_toast_id);
      setLoading(false);
      toast.error("Failed");
      return;
    });

  }

  return (
    <>
      {
        account &&
        <Container className={classes.root}>
          <div className={classes.section}>
            <div className={classes.rootContent}>
              <div className="text-left mx-auto my-10">
                <h1 className="text-3xl xl:text-4xl font-bold text-cusBlack">
                  Create Box
                </h1>
                {
                  priceInfo &&
                  <div>
                    <h4 className="text-cusBlack text-lg">
                      Create Fee : <span className='font-bold'>{formatNum(priceInfo.price)} {priceInfo.symbol}</span>
                    </h4>
                    <p className="text-cusBlack text-lg">
                      Your Balance : <span className='font-bold'>{formatNum(tokenBalance)} {priceInfo.symbol}</span>
                    </p>
                  </div>
                }

                {/* select logo */}
                <div className="mt-8">
                  <h4 className="text-cusBlack font-extrabold text-lg">Upload logo <span className="text-cusLink">*</span></h4>

                  <div>
                    <div className="upload_file_box py-10 p-3 mt-3 rounded-xl text-center"
                      style={{ display: logoFile ? "none" : "" }}>
                      <p className="text-l-LightBlack xs:text-xxs sm:text-base">File types supported: JPG, PNG, GIF Max size: 5 MB (400 px x 400px)</p>
                      <button
                        className="font-semibold text-white bg-cusBrightLink mt-6 text-cusLightLink px-6 py-3 rounded-full xs:text-xs sm:text-base">
                        Choose file
                        <input type="file" value="" accept="image/*" onChange={(event) => handleLogo(event)} />
                      </button>
                    </div>
                    <div className="preview_file_box p-2 mt-3 rounded-xl text-center"
                      style={{ display: logoFile ? "" : "none" }}>
                      <CloseIcon style={{ display: logoHash ? "" : "none" }}
                        onClick={() => closeLogo()} fontSize="small" />
                      <div className="mediaContainer">
                        <CircularProgress style={{ display: logoUploading ? "" : "none", width: "30px", height: "30px", color: "#37b5fe" }} />
                        {
                          logoHash &&
                          <img className="preview" src={logoHash} alt='logo' />
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* name */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">Name <span className="text-cusLink">*</span></h4>
                  <input type="text" name="" id="" placeholder='Name'
                    className="bg-transparent w-full h-full  text-cusBlack
                                        lightBlueBg p-5 sm:p-6 rounded-xl mt-3 focus:outline outline-blue-500"
                    value={name} onChange={event => setName(event.target.value)} />
                </div>

                {/* about */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">About <span className="text-cusLink">*</span></h4>
                  <textarea name="about" placeholder='About' rows={4}
                    className="bg-transparent w-full h-full  text-cusBlack
                    lightBlueBg p-5 sm:p-6 rounded-xl mt-3 focus:outline outline-blue-500"
                    value={about} onChange={event => setAbout(event.target.value)} />
                </div>

                {/* social links */}
                <div className="mt-8">
                  <div className='flex items-center'>
                    <h4 className="mr-5 text-cusBlack font-bold text-lg">Social links</h4>
                  </div>
                  <div className='flex'>
                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 items-center w-full">
                      <div className="lightBlueBg p-5 rounded-xl mt-3">
                        <input type="text" name="website" id="" placeholder='website'
                          className="bg-transparent w-full  outline-none text-cusBlack"
                          value={website} onChange={(e) => { setWebsite(e.target.value) }} />
                      </div>
                      <div className="lightBlueBg p-5 rounded-xl mt-3">
                        <input type="text" name="facebook" id="" placeholder='facebook'
                          className="bg-transparent w-full  outline-none text-cusBlack"
                          value={facebook} onChange={(e) => { setFacebook(e.target.value) }} />
                      </div>
                    </div>
                  </div>
                  <div className='flex'>
                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 items-center w-full">
                      <div className="lightBlueBg p-5 rounded-xl mt-3">
                        <input type="text" name="twitter" id="" placeholder='twitter'
                          className="bg-transparent w-full  outline-none text-cusBlack"
                          value={twitter} onChange={(e) => { setTwitter(e.target.value) }} />
                      </div>
                      <div className="lightBlueBg p-5 rounded-xl mt-3">
                        <input type="text" name="linkedin" id="" placeholder='linkedin'
                          className="bg-transparent w-full  outline-none text-cusBlack"
                          value={linkedin} onChange={(e) => { setLinkedin(e.target.value) }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* select category */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold">Category</h4>
                  <span className="w-full mt-3">
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
                </div>

                {/* power token address */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">Power Token Address <span className="text-cusLink">*</span></h4>
                  <input type="text" name="" id="" placeholder='e.g 0x32A2E3cA31210Bed60D60B16745902Cc6bD37e90'
                    className="bg-transparent w-full h-full  text-cusBlack
                                        lightBlueBg p-5 sm:p-6 rounded-xl mt-3 focus:outline outline-blue-500"
                    value={powerTokenAddress} onChange={event => setPowerTokenAddress(event.target.value)} />
                </div>

                {/* create limit */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">Token Limit to allow to submit proposal <span className="text-cusLink">*</span></h4>
                  <input type="number" name="" id="" placeholder=''
                    className="bg-transparent w-full h-full  text-cusBlack
                                        lightBlueBg p-5 sm:p-6 rounded-xl mt-3 focus:outline outline-blue-500"
                    value={price} onChange={event => setPrice(Number(event.target.value))} />
                </div>

                {/* action */}
                {
                  account &&
                  <div className="mt-8 flex justify-center">
                    <FilledButton
                      handleClick={() => {
                        onCreateSpace();
                      }}
                      label={
                        <>
                          {loading ? 'Createing...' : 'Create Box'}
                        </>
                      }
                    ></FilledButton>
                  </div>
                }
              </div>
            </div>
          </div>
        </Container>
      }
    </>
  );
};

export default CreateSpace;
