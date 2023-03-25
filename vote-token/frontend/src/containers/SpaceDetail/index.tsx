import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import Container from '../../components/Layout/Container';

import FilledButton from 'components/Buttons/FilledButton';
import ActiveProposals from 'components/ActiveProposals';
import { formatNum, NetworkParams } from 'utils';
import useStyles from './style';

const SpaceDetail = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const classes = useStyles();
  const { account } = useWeb3React();

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


  return (
    <>
      {
        spaceInfo &&
        <Container className={classes.root}>
          <div className={classes.topSection}>
            <div className={classes.wrapper}>
              <div className="left">
                <h1> {spaceInfo.name} </h1>
                <p>
                  {spaceInfo.about}
                </p>
                {
                  account &&
                  <div className="btns">
                    <FilledButton className={classes.conBtn} label="Submit Proposal" handleClick={() => window.open(`/create_proposal/${spaceId}`, "_self")} />
                  </div>
                }
              </div>
              <div className="right">
                <img src={spaceInfo.logo} alt="" />
              </div>
            </div>
          </div>
          {/* State */}
          <div className={classes.section}>
            <div className={classes.stateRoot}>
              <div className={classes.content}>
                <div className={`${classes.item} ${classes.rightLine}`}>
                  <h3 
                    onClick={() => window.open(`${NetworkParams?.[spaceInfo.chainId]?.blockExplorerUrls[0]}/address/${spaceInfo.powerToken.address}`)}>
                    {spaceInfo.powerToken.symbol} <span style={{color:'#4460fe'}}>( {NetworkParams?.[spaceInfo.chainId]?.chainName} )</span>
                  </h3>
                  <p>Power Token</p>
                </div>
                <div className={`${classes.item} ${classes.rightLine}`}>
                  <h3>{formatNum(spaceInfo.overview.totalPower)} {spaceInfo.powerToken.symbol}</h3>
                  <p>Total Power</p>
                </div>
                <div className={`${classes.item} ${classes.rightLine}`}>
                  <h3>{spaceInfo.overview.totalVoter}</h3>
                  <p>Total Voters</p>
                </div>
                <div className={`${classes.item} ${classes.rightLine}`}>
                  <h3>{(spaceInfo.overview.totalActiveProposals + spaceInfo.overview.totalEndProposals)}</h3>
                  <p>Total Proposals</p>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.section}>
            <ActiveProposals spaceId={spaceId} spaceInfo={spaceInfo}/>
          </div>
        </Container>
      }
    </>
  );
};

export default SpaceDetail;
