import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { truncateWalletString, formatNum } from 'utils';
import useStyles from './style';


const VotingByAddressTable = ({ headers, votes, tokenSymbol, choices, totalPower }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((column: any, index: any) => (
              <TableCell style={{ color: '#000' }} key={index}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            votes.map((vote: any, index1: any) => (
              <TableRow key={index1}>
                <TableCell style={{ color: '#000' }}>
                  <div className={classes.cell}>
                    <img src={`https://cdn.stamp.fyi/avatar/eth:${vote.address}`} alt="" />
                    <p> {truncateWalletString(vote.address)}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`text-center p-2 rounded-md choice${choices.indexOf(vote.choice)}`}>
                    {vote.choice}
                  </div>                  
                </TableCell>
                <TableCell style={{ color: '#000' }}>{formatNum(vote.power)} {tokenSymbol}</TableCell>
                <TableCell style={{ color: '#000' }}>{formatNum(vote.power * 100 / totalPower)} %</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VotingByAddressTable;
