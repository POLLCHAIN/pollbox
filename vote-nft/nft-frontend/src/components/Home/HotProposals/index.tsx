import Masonry from 'react-masonry-css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { format } from "date-fns";

import OutlinedButton from 'components/Buttons/OutlinedButton';
import BtnTimer from 'components/Timer/BtnTimer';
import useStyles from './style';
import { formatNum } from 'utils';

const breakpointColumnsObj = {
  default: 1,
};
const HotProposals = () => {
  const [proposals, setProposals] = useState([]);
  useEffect(() => {
    fetchProposals();
  }, [])

  function fetchProposals() {
    axios.get(`${process.env.REACT_APP_API_URL}/api/hot-proposals`)
      .then((res) => {
        if (res) {
          setProposals(res.data.proposals);
        } else {
          setProposals([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setProposals([]);
      });
  }

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.top}>
          <h1 className={classes.header}>Hot Proposals</h1>
        </div>
        <div className={classes.content}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.masonry}
            columnClassName={classes.gridColumn}
          >
            {
              proposals?.map((proposal: any, index: any) => (
                <div className={classes.productWrapper} key = {index}>
                  <div className={classes.cardTop}>
                    <p>POSTED {format(proposal.timestamp * 1000, "MMM dd yyyy HH:mm")}</p>
                    <h3>{proposal.title}</h3>
                    <p>
                      {proposal.description}
                    </p>
                  </div>
                  <div className={classes.btns}>
                    {
                      proposal.choices?.map((choice: any, index1: any) => (
                        <button className={`choice${index1}`} key={index1}>{choice}</button>
                      ))
                    }
                  </div>
                  <div className={classes.cardState}>
                    <span>
                      <BtnTimer
                        endTime={proposal.endTime}
                      />
                    </span>
                    <span>
                      <i className="fas fa-comment-alt"></i> {proposal.totalComments} COMMENTS
                    </span>
                  </div>
                  <div className={classes.cardDetail}>
                    <OutlinedButton
                      color={'viewDetail'}
                      label="View Detail"
                      handleClick={() =>
                        window.open(`/proposal-detail/${proposal.id}`, "_self")
                      }
                    />
                    {
                      proposal.totalPower > 0 &&
                      <div className={classes.progressState}>
                        <div className="labels">
                          {
                            proposal.voteSummary?.map((info: any, index2: any) => (
                              <p key={index2}>{formatNum(info.totalPower * 100 / proposal.totalPower)}%</p>
                            ))
                          }
                        </div>
                        <div className="progress">
                          {
                            proposal.voteSummary?.map((info: any, index2: any) => (
                              <div className={`progressBar${index2}`} key={index2} style={{ width: `${info.totalPower * 100 / proposal.totalPower}%` }}></div>
                            ))
                          }
                        </div>
                      </div>
                    }
                  </div>
                  <div className={classes.cardFooter}>
                    <h5>
                      TOTAL POWER: {proposal.totalPower} entities
                    </h5>
                  </div>
                </div>
              ))
            }
          </Masonry>
          <OutlinedButton color="black" label="View All" handleClick={() => window.open('/#', '_self')} />
        </div>
      </div>
    </>
  );
};

export default HotProposals;
