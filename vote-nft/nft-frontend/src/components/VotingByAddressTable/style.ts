import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  table: {
    '& .MuiTableCell-root': {
      borderBottom: `1px solid #979797`,
      color: '#000',
      cursor: 'pointer',
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      fontSize: 18,
      color: '#000',
      '@media screen and (max-width: 576px) and (orientation: portrait)': {
        fontSize: 14,
      },
    },
    '& .choice0': {
      background: '#29ed89',
      color: '#f50202',
    },
    '& .choice1': {
      background: '#c5aa00',
      color: '#6200ff',
    },
    '& .choice2': {
      background: '#E4C3FF',
      color: '#940000',
    },
    '& .choice3': {
      background: '#c3faff',
      color: '#320094',
    },
    '& .choice4': {
      background: '#f500d7',
      color: '#003294',
    },
    '& .choice5': {
      background: '#8b00f5',
      color: '#943200',
    },
    '& .choice6': {
      background: '#00dff5',
      color: '#ff0094',
    },
    '& .choice7': {
      background: '#00f54b',
      color: '#8544b6',
    },
    '& .choice8': {
      background: '#f56600',
      color: '#3200a2',
    },
    '& .choice9': {
      background: '#ff8800',
      color: '#32ff84',
    },
  },
  cell: {
    display: 'flex !important',
    alignItems: 'center',
    '& img': {
      width: 40,
      height: 40,
      borderRadius: 40,
    },
    '& p': {
      width: 'fit-content',
      marginLeft: 10,
    },
  },
  container: {
    borderRadius: '5px',
  },
}));

export default useStyles;
