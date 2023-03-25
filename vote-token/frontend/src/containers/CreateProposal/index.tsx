import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { CloseCircleFilled } from "@ant-design/icons";
import HtmlEditor, { Toolbar, Item } from 'devextreme-react/html-editor';
import 'devextreme/ui/html_editor/converters/markdown';
import Querystring from "query-string"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


import { NetworkParams, formatNum } from 'utils';
import { getTokenBalance } from 'utils/contracts';
import Container from '../../components/Layout/Container';

import useStyles from './style';

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];

const CreateProposal = (props: any) => {
  const classes = useStyles();
  const { spaceId } = useParams<{ spaceId: string }>();
  const { user, login } = props;
  const { account, chainId, library } = useWeb3React();

  useEffect(() => {
    if (account) {
      login();
    }
  }, [user, account])

  const [spaceInfo, setSpaceInfo] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/space/detail/${spaceId}`)
      .then((res) => {
        if (res) {
          setSpaceInfo(res.data.space);
        } else {
          setSpaceInfo(null)
        }
      })
      .catch((err) => {
        console.log(err);
        setSpaceInfo(null)
      });
  }, [spaceId])

  // fetch token balance
  const [tokenBalance, setTokenBalance] = useState(0);
  useEffect(() => {
    if (account && chainId && spaceInfo) {
      if (spaceInfo.powerToken.address === '0x0000000000000000000000000000000000000000') {
        library.getBalance(account)
          .then((value: any) => {
            var etherVal = parseFloat(ethers.utils.formatEther(value));
            setTokenBalance(etherVal)
          })
          .catch(() => {
            setTokenBalance(0)
          })
      } else {
        getTokenBalance(account, spaceInfo.powerToken.address, chainId, library?.getSigner())
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
  }, [account, chainId, library, spaceInfo])






  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [overview, setOverview] = useState('');
  function valueChanged(e) {
    setOverview(e.value);
  }

  const [choices, setChoices] = useState([]);
  function createChoice() {
    setChoices((choiceList) => [...choiceList, ""]);
  }
  function editChoices(propIndex, newVal) {
    let choiceList = [...choices];
    choiceList[propIndex] = newVal;
    setChoices(choiceList);
  }
  function deleteChoice(index) {
    let props = [...choices];
    props.splice(index, 1);
    setChoices(props);
  }

  const [endDate, setEndDate] = useState(null);

  async function onCreateProposal() {
    if (Number(chainId) != Number(spaceInfo.chainId)) {
      toast.error(`Please connect correct network(${NetworkParams?.[spaceInfo.chainId]?.chainName})`);
      return;
    }
    if (tokenBalance < spaceInfo.createLimit) {
      toast.error(`You don't hold enough ${spaceInfo.powerToken.symbol}`);
      return;
    }


    if (title === '') {
      toast.error("Please Input Title!");
      return;
    }
    if (description === '') {
      toast.error("Please Input Description!");
      return;
    }

    const currentTime = new Date().getTime();
    if (!endDate) {
      toast.error("Please select end time.");
      return;
    }
    const endTime = endDate.getTime();
    const endTimeStamp = Math.floor(endTime / 1000);
    if (currentTime >= endTime) {
      toast.error("The end time must be after the current time.");
      return;
    }

    if (!choices || choices.length < 2) {
      toast.error("Please Add at least 2 choices!");
      return;
    }

    const load_toast_id = toast.loading("Please wait for submit proposal...");
    axios.post(`${process.env.REACT_APP_API_URL}/api/proposal/create`,
      Querystring.stringify({
        spaceId: spaceId,
        address: account,
        title: title,
        description: description,
        overview: overview,
        choices: JSON.stringify(choices),
        endTime: endTimeStamp,
      }))
      .then(async (res) => {
        toast.dismiss(load_toast_id);
        if (res) {
          toast.success("Proposal submitted successfully!");
          window.open(`/space-detail/${spaceId}`, "_self");
          return;
        } else {
          toast.error('unknown error in the server. please try again later');
          return;
        }
      })
      .catch(err => {
        toast.dismiss(load_toast_id);
        toast.error(err ? err.response.data.message : err.message);
        return;
      })
  }

  return (
    <>
      {
        account && spaceInfo &&
        <Container className={classes.root}>
          <div className={classes.section}>
            <div className={classes.rootContent}>
              <div className="text-left mx-auto my-10 w-5/6 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
                <h1 className="text-3xl xl:text-4xl font-bold text-cusBlack">
                  Submit Proposal
                </h1>
                <div>
                  <p className="">
                    You need to have a minimum of {formatNum(spaceInfo.createLimit)} {spaceInfo.powerToken.symbol} in order to submit a proposal.
                  </p>
                  <h4 className="text-cusBlack text-lg">
                    Your Balance : <span className='font-bold'>{formatNum(tokenBalance)} {spaceInfo.powerToken.symbol}</span>
                  </h4>
                </div>

                {/* title */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">Title <span className="text-cusLink">*</span></h4>
                  <input type="text" title="" id="" placeholder='Title'
                    className="bg-transparent w-full h-full  text-cusBlack
                                        lightBlueBg p-5 sm:p-6 rounded-xl mt-3 focus:outline outline-blue-500"
                    value={title} onChange={event => setTitle(event.target.value)} />
                </div>

                {/* description */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">Description <span className="text-cusLink">*</span></h4>
                  <textarea title="description" placeholder='Description' rows={4}
                    className="bg-transparent w-full h-full  text-cusBlack
                    lightBlueBg p-5 sm:p-6 rounded-xl mt-3 focus:outline outline-blue-500"
                    value={description} onChange={event => setDescription(event.target.value)} />
                </div>

                {/* overview */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">Overview</h4>
                  <div className="widget-container">
                    <HtmlEditor
                      height={300}
                      valueType='html'
                      value={overview}
                      onValueChanged={valueChanged}
                    >
                      <Toolbar>
                        <Item name="undo" />
                        <Item name="redo" />
                        <Item name="separator" />
                        <Item
                          name="size"
                          acceptedValues={sizeValues}
                        />
                        <Item
                          name="font"
                          acceptedValues={fontValues}
                        />
                        <Item name="separator" />
                        <Item name="bold" />
                        <Item name="italic" />
                        <Item name="strike" />
                        <Item name="underline" />
                        <Item name="separator" />
                        <Item name="alignLeft" />
                        <Item name="alignCenter" />
                        <Item name="alignRight" />
                        <Item name="alignJustify" />
                        <Item name="separator" />
                        <Item name="color" />
                        <Item name="background" />
                      </Toolbar>
                    </HtmlEditor>
                  </div>
                </div>

                {/* choices */}
                <div className="mt-8">
                  <div className='flex items-center'>
                    <h4 className="mr-5 text-cusBlack font-bold text-lg">Choices</h4>
                    <button className="lightBlueBg py-3 px-4 rounded-lg text-cusBlack"
                      onClick={createChoice}>
                      + Add Choice
                    </button>
                  </div>
                  {
                    choices.map((value, index) => {
                      return (
                        <div className='flex' key={index}>
                          <div className="lightBlueBg p-5 rounded-xl mt-3 w-full">
                            <input type="text" title="" id="" placeholder='choice context'
                              className="bg-transparent w-full outline-none text-cusBlack"
                              value={value} onChange={(e) => { editChoices(index, e.target.value) }} />
                          </div>
                          <button className="property-remove-button"
                            onClick={() => { deleteChoice(index) }}>
                            <CloseCircleFilled style={{ fontSize: '26px' }} />
                          </button>
                        </div>
                      );
                    })
                  }
                </div>


                {/* end time */}
                <div className="mt-8">
                  <h4 className="mr-5 text-cusBlack font-bold text-lg">End Time <span className="text-cusLink">*</span></h4>
                  <DatePicker
                    selected={endDate}
                    onChange={value => setEndDate(value)}
                    className={"input-picker"}
                    showTimeSelect
                    dateFormat="Pp"
                  />
                </div>

                {/* action */}
                <div className="mt-8 flex justify-center">
                  <button className="lightBlueBg py-3 px-4 rounded-lg text-cusBlack bg-green-500"
                    onClick={() => {
                      // create
                      onCreateProposal();
                    }}>
                    Submit
                  </button>
                </div>

              </div>
            </div>
          </div>
        </Container>
      }
    </>
  );
};

export default CreateProposal;
