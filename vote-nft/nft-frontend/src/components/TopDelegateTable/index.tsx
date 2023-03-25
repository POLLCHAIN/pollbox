import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    '& .MuiTableCell-root': {
      borderBottom: `1px solid #472D74`,
      cursor: 'pointer',
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      // background: '#006a66 !important',

      fontSize: 18,
      color: '#fff',
      // textShadow: '1px 1px 0px #000, -1px -1px 0px #000, -1px 1px 0px #000, 1px -1px 0px #000, 3px 3px 3px #000'
    },
  },
  cell: {
    display: 'flex !important',
    alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    color: '#fff',
    '& img': {
      width: 60,
      height: 60,
      borderRadius: 80,
      border: '1px #6366F1 solid',
      marginLeft: 10,
      marginRight: 10,
    },
    '& p': {
      width: 'fit-content',
      marginLeft: 10,
      color: '#fff',
    },
  },
  container: {
    borderRadius: '5px',
    background: '#2E2440',
    padding: 20,
    boxShadow: '3px 3px 5px #555',
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

const TopDelegateTable = ({ columns, rows, type }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, k) => (
              <TableCell style={{ color: type === 'top' ? '#fff !important' : '#fff !important' }} key={k}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, kk) => (
            <TableRow
              key={kk}
              // onClick={() => history.push(`/product/${0}`)}
            >
              <TableCell style={{ color: type === 'top' ? '#fff' : '#fff' }}>
                <div className={classes.cell}>
                  {kk + 1}.
                  <img src={row.img} alt="" />
                  <p> {row.name}</p>
                </div>
              </TableCell>
              <TableCell style={{ color: '#fff' }}>{row.delegators} addresses</TableCell>
              <TableCell style={{ color: '#fff' }}>{row.votingPower} %</TableCell>
              <TableCell style={{ color: '#fff' }}>{row.mkr} MKR</TableCell>
              <TableCell style={{ color: '#fff' }}>{row.participation} %</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopDelegateTable;
