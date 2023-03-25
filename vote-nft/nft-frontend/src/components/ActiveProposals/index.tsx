import axios from 'axios';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { Pagination } from '@windmill/react-ui';
import { format } from "date-fns";

import useStyles from './style';
import OutlinedButton from 'components/Buttons/OutlinedButton';
import BtnTimer from 'components/Timer/BtnTimer';
import { formatNum } from 'utils';

const customStyles = {
  control: (base: any) => ({
    ...base,
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '150px',
    borderRadius: '50px',
    border: '1px solid #21274F !important',
    boxShadow: 'none',

    '&:focus': {
      border: '0 !important',
    },
  }),

  menu: (provided: any, state: any) => ({
    ...provided,
    border: '1px solid #ffffff13',
    color: '#fff',
    padding: 0,
    background: '#fff',
  }),
  option: (provided: any, state: any) => ({
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
  singleValue: (provided: any, state: { isDisabled: any; }) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};
const FormatsortOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center", background: "transparent", height: "40px" }}>
		<div style={{color: "black", fontWeight: "bold", paddingLeft: "10px"}}>{label}</div>
	</div>
);

const ActiveProposals = (props: any) => {
  const { spaceId } = props;
  const classes = useStyles();

  const [searchTxt, setSearchTxt] = useState('');
  const [type, setType] = useState(1);
  const handleSelectType = (e: any) => {
    setType(e.value);
  };
  const typeOptions = [
    { value: 0, label: 'All Proposals', customAbbreviation: '0' },
    { value: 1, label: 'Active Proposals', customAbbreviation: '1' },
    { value: 2, label: 'Ended Proposals', customAbbreviation: '2' },
  ];

  const [sort, setSort] = useState(2);
  const handleSelectSort = (e: any) => {
    setSort(e.value);
  };
  const sortOptions = [
    { value: 0, label: 'Title', customAbbreviation: '0' },
    { value: 1, label: 'Ending Soon', customAbbreviation: '1' },
    { value: 2, label: 'Newest Created', customAbbreviation: '2' },
    { value: 3, label: 'Highst Power', customAbbreviation: '3' },
  ];

  const [proposals, setProposals] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setProposals([]);
    setPage(1);
    fetchProposals();
  }, [spaceId, type, sort, searchTxt])

  useEffect(() => {
    fetchProposals();
  }, [page])

  function fetchProposals() {
    let paramData: any = {
      limit: 3,
      spaceId: spaceId,
      page: page
    };
    if (searchTxt) {
      paramData.searchTxt = searchTxt;
    }
    switch (type) {
      case 1:
        // Active Proposals
        paramData.type = 'active';
        break;

      case 2:
        // Ended Proposals
        paramData.type = 'ended';
        break;
      default:
        break;
    }
    switch (sort) {
      case 0:
        // Sort with Title
        paramData.sortBy = 'title';
        break;

      case 1:
        // Ending Soon
        paramData.sortBy = 'end';
        break;
      case 2:
        // Newest Created
        paramData.sortBy = 'timestamp';
        break;
      case 3:
        // Highst Power
        paramData.sortBy = 'power';
        break;
      default:
        break;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/api/proposals`, {
      params: paramData
    })
      .then((res) => {
        if (res) {
          setProposalCount(res.data.count);
          setProposals(res.data.proposals);
        } else {
          setProposalCount(0);
          setProposals([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setProposals([]);
      });
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className='search-content'>
          <input className=''
            type={'text'}
            placeholder='Search...'
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <i className='fa fa-search'></i>
        </div>

        <span>
          <Select
            defaultValue={typeOptions[1]}
            formatOptionLabel={FormatsortOptionLabel}
            options={typeOptions}
            instanceId="chainSelect"
            className={`select-gray `}
            onChange={e => handleSelectType(e)}
            isSearchable={false}
            isClearable={false}
            styles={customStyles}
          />
        </span>

        <span>
          <Select
            defaultValue={sortOptions[2]}
            formatOptionLabel={FormatsortOptionLabel}
            options={sortOptions}
            instanceId="chainSelect"
            className={`select-gray `}
            onChange={e => handleSelectSort(e)}
            isSearchable={false}
            isClearable={false}
            styles={customStyles}
          />
        </span>

      </div>
      <div className={classes.content}>
        <div className={classes.left}>
          <h1 className={classes.header}>
            {
              typeOptions[type].label
            }
          </h1>
          <p>{proposalCount} Proposals</p>

          {
            proposals?.map((proposal: any, index: any) => (
              <div className={classes.productWrapper} key={index}>
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
                    label="View Details"
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

          <div className='flex justify-center'>
            {
              proposalCount > 0 &&
              <Pagination
                totalResults={proposalCount}
                resultsPerPage={3}
                onChange={(p) => {
                  setPage(p);
                }}
                label="Proposals Navigation"
              />
            }
          </div>
        </div>        
      </div>
    </div>
  );
};

export default ActiveProposals;
