import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import axios from 'axios';
import toast from "react-hot-toast";
import { Pagination } from '@windmill/react-ui';
import { format } from "date-fns";
import HtmlEditor from 'devextreme-react/html-editor';
import 'devextreme/ui/html_editor/converters/markdown';

import VotingByAddressTable from 'components/VotingByAddressTable';
import OutlinedButton from 'components/Buttons/OutlinedButton';
import BtnTimer from 'components/Timer/BtnTimer';
import { formatNum, truncateWalletString, NetworkParams } from 'utils';
import { getTokenBalance } from 'utils/contracts';
import ModalVote from 'components/modals/modal-vote';
import Container from 'components/Layout/Container';
import useStyles from './style';

const ProposalDetail = (props: any) => {
  const { user, login } = props;
  const classes = useStyles();
  const { proposalId } = useParams<{ proposalId: string }>();

  const { account, chainId, active, library } = useWeb3React();

  useEffect(() => {
    if (account) {
      login();
    }
  }, [user, account])

  // fetch proposal information
  const [proposalInfo, setProposalInfo] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/proposal/detail/${proposalId}`)
      .then((res) => {
        if (res) {
          setProposalInfo(res.data.proposal);
        } else {
          setProposalInfo(null)
        }
      })
      .catch((err) => {
        console.log(err);
        setProposalInfo(null)
      });
  }, [proposalId])

  // fetch token balance
  const [tokenBalance, setTokenBalance] = useState(0);
  useEffect(() => {
    if (account && chainId && proposalInfo) {
      if (proposalInfo.spaceInfo.powerToken.address === '0x0000000000000000000000000000000000000000') {
        library.getBalance(account)
          .then((value: any) => {
            var etherVal = parseFloat(ethers.utils.formatEther(value));
            setTokenBalance(etherVal)
          })
          .catch(() => {
            setTokenBalance(0)
          })
      } else {
        getTokenBalance(account, proposalInfo.spaceInfo.powerToken.address, chainId, library?.getSigner())
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
  }, [account, chainId, library, proposalInfo])

  const [choice, setChoice] = useState('');
  const [showVoteModal, setShowVoteModal] = useState(false);

  // fetch comments
  const [comments, setComments] = useState([]);
  const [commentPage, setCommentPage] = useState(1);
  useEffect(() => {
    setComments([]);
    setCommentPage(1);
  }, [proposalId])

  useEffect(() => {
    fetchComments();
  }, [commentPage])

  function fetchComments() {
    let paramData: any = {
      limit: 3,
      page: commentPage,
      proposalId: proposalId
    };

    axios.get(`${process.env.REACT_APP_API_URL}/api/comments`, {
      params: paramData
    })
      .then((res) => {
        if (res) {
          setComments(res.data.comments);
        } else {
          setComments([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setComments([]);
      });
  }

  // fetch votes
  const [votes, setVotes] = useState([]);
  const [voteCount, setVoteCount] = useState(0);
  const [votePage, setVotePage] = useState(1);
  useEffect(() => {
    setVotes([]);
  }, [proposalId])

  useEffect(() => {
    fetchVotes();
  }, [votePage])

  function fetchVotes() {
    let paramData: any = {
      limit: 3,
      page: votePage,
      proposalId: proposalId
    };

    axios.get(`${process.env.REACT_APP_API_URL}/api/votes`, {
      params: paramData
    })
      .then((res) => {
        if (res) {
          setVoteCount(res.data.count);
          setVotes(res.data.votes);
        } else {
          setVoteCount(0);
          setVotes([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setVotes([]);
      });
  }

  const [tabId, setTaqId] = useState(0);
  const changeTab = (id: number) => {
    setTaqId(id);
  };


  return (
    <div className={classes.root}>
      <div className={classes.section}>
        {
          proposalInfo &&
          <div className={classes.rootContent}>
            <div className={classes.top}>
              <span>
                <OutlinedButton
                  className={classes.blackBtn}
                  color="rectBtn"
                  icon={<i className="fas fa-angle-left"></i>}
                  iconPosition="start"
                  label="BACK"
                  handleClick={() => window.open(`/space-detail/${proposalInfo.spaceId}`, "_self")}
                />
              </span>
              <span className='network'>
                {NetworkParams?.[proposalInfo.spaceInfo.chainId]?.chainName}
              </span>
            </div>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                <div className={classes.productWrapper}>
                  <div className={classes.cardTop}>
                    <span>
                      <p>POSTED {format(proposalInfo.timestamp * 1000, "MMM dd yyyy HH:mm")}</p>
                      <BtnTimer
                        endTime={proposalInfo.endTime}
                      />
                    </span>

                    <h3>{proposalInfo.title}</h3>
                    <p>
                      {proposalInfo.description}
                    </p>
                  </div>
                  <div className={classes.btns}>
                    {
                      proposalInfo.choices?.map((choice: any, index1: any) => (
                        <button className={`choice${index1}`} key={index1}
                          onClick={() => {
                            if (!!account && !!chainId) {
                              if (Number(chainId) === Number(proposalInfo.spaceInfo.chainId)) {
                                // if proposalId is active 
                                const currentDate: any = Date.now() / 1000;
                                if (currentDate < proposalInfo.endTime) {
                                  setChoice(choice);
                                  setShowVoteModal(true);
                                } else {
                                  setShowVoteModal(false);
                                  toast.error("This proposal is ended now.");
                                  return;
                                }
                              } else {
                                setShowVoteModal(false);
                                toast.error(`Please connect correct network(${NetworkParams?.[proposalInfo.spaceInfo.chainId]?.chainName})`);
                                return;
                              }

                            } else {
                              setShowVoteModal(false);
                            }
                          }}>
                          {choice}
                        </button>
                      ))
                    }
                  </div>

                  <div className={classes.cardDetail}>
                    <div className="Mytab">
                      <div className="tabList">
                        <div
                          className="tab"
                          onClick={() => changeTab(0)}
                          style={{
                            color: tabId === 0 ? '#32F99C' : '#000',
                          }}
                        >
                          Vote Breakdown
                        </div>
                        <div
                          className="tab"
                          onClick={() => changeTab(1)}
                          style={{
                            color: tabId === 1 ? '#32F99C' : '#000',
                          }}
                        >
                          Overview
                        </div>
                        <div
                          className="tab"
                          onClick={() => changeTab(2)}
                          style={{
                            color: tabId === 2 ? '#32F99C' : '#000',
                          }}
                        >
                          Comments ({proposalInfo.totalComments})
                        </div>
                      </div>
                      {tabId === 0 && (
                        <div className="tabContent">
                          {
                            proposalInfo.totalPower > 0 &&
                            proposalInfo.voteSummary.map((info: any, index2: any) => (
                              <div className={classes.progressState} key={index2}>
                                <div className="labels">
                                  <p>{info.choice}</p>
                                  <p>{formatNum(info.totalPower)} {proposalInfo.spaceInfo.powerToken.symbol} Voting ({formatNum(info.totalPower * 100 / proposalInfo.totalPower)}%)</p>
                                </div>
                                <div className="progress">
                                  <div className={`progressBar${index2}`} style={{ width: `${info.totalPower * 100 / proposalInfo.totalPower}%` }}></div>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )}
                      {
                        tabId === 1 &&
                        <div className="tabContent">
                          <HtmlEditor
                            style={{ border: 'none' }}
                            value={proposalInfo.overview}
                            valueType='html' />
                        </div>
                      }
                      {
                        tabId === 2 &&
                        <div className="tabContent">
                          <div className='flex justify-center flex-col flex-no-wrap w-full my-2'>
                            {/* comments */}
                            {
                              comments.map((comment: any, index: any) => (
                                <div className='flex flex-row flex-no-wrap mt-1 p-2' key={index}>
                                  <img className='w-12 h-12 mr-2 rounded-full' src={`https://cdn.stamp.fyi/avatar/eth:${comment.address}`} alt="" />
                                  <div className='w-full'>
                                    <p className='font-bold'>
                                      {truncateWalletString(comment.address)}
                                    </p>
                                    <p>
                                      {comment.message}
                                    </p>
                                  </div>
                                </div>
                              ))
                            }

                            {
                              proposalInfo.totalComments > 0 &&
                              <Pagination
                                totalResults={proposalInfo.totalComments}
                                resultsPerPage={3}
                                onChange={(p) => {
                                  setCommentPage(p);
                                }}
                                label="Comments Navigation"
                              />
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </div>

                  <div className={classes.cardState}>
                    <h1>Voting Stats</h1>
                    <span>
                      <p>Total Votes</p>
                      <p>{formatNum(proposalInfo.totalPower)} {proposalInfo.spaceInfo.powerToken.symbol}</p>
                    </span>
                    <span>
                      <p>Unique Voters</p>
                      <p>{proposalInfo.totalVoters}</p>
                    </span>
                  </div>

                  <div className={classes.cardState}>
                    <h1>Voting By Address</h1>
                    <div className="myTable">
                      <VotingByAddressTable
                        headers={['ADDRESS', 'OPTION', 'VOTING POWER', 'PERCENTAGE']}
                        votes={votes}
                        tokenSymbol={proposalInfo.spaceInfo.powerToken.symbol}
                        choices={proposalInfo.choices}
                        totalPower={proposalInfo.totalPower}
                      />
                      <div className='flex justify-center mt-4'>
                        {
                          voteCount > 0 &&
                          <Pagination
                            totalResults={voteCount}
                            resultsPerPage={3}
                            onChange={(p) => {
                              setVotePage(p);
                            }}
                            label="Company Page Navigation"
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              account && choice &&
              <ModalVote
                account={account}
                balance={tokenBalance}
                tokenSymbol={proposalInfo.spaceInfo.powerToken.symbol}
                proposalId={proposalInfo.id}
                choice={choice}
                showVoteModal={showVoteModal}
                setShowVoteModal={setShowVoteModal}
              />
            }
          </div>
        }
      </div>
    </div>
  );
};

export default ProposalDetail;
