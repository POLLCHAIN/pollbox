import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fdfdfd',
    padding: 50,
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: 1440,    
    [theme.breakpoints.only('sm')]: {
      paddingLeft: theme.spacing(1.75),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingTop: 10,
      flexDirection: 'column',
    },
    '& .MuiOutlinedInput-root': {
      background: '#00D9AC00',
      border: 'none',
      boxShadow: '0px 0px 3px #00D9AC',
    },
  },
  top: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    maxWidth: 1440,
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '& .search-content': {
      marginRight: 10,
      padding: '5px 15px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '30px',
      border: '1px solid #121317',
      boxShadow: '2px 2px 20px 0 rgb(20 20 20 / 35%)',
      '& input': {
        padding: '5px 5px',
        '&:focus': {
          outline: 'none'          
        },
      }
    }, 
    '& span': {
      marginRight: 10,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        marginRight: 0,
        marginBottom: 10,
      },
      '& .reset': {
        border: 'none',
        background: '#ffffff00',
        color: '#6864F9',
        cursor: 'pointer',
      },
    },
  },
  left: {
    padding: '1%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: '30px',
    width: '100%'    
  },
  right: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: '30px',
    width: '30%',
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      width: '100%',
    },
  },

  header: {
    fontSize: 24,
    color: '#000',
    textAlign: 'left',
    lineHeight: '50px',
    position: 'relative',
    marginBottom: 10,
    width: '100%',
    '@media (max-width: 768px)': {
      fontSize: '1.5em',
    },
  },
  btns: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& button': {
      border: 'none',
      padding: '8px 20px',
      borderRadius: 7,
      margin: 10,
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
  masonry: {
    display: 'flex',
    margin: theme.spacing(5, 0),
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0),
    },
  },
  productWrapper: {
    width: '100%',
    marginBottom: theme.spacing(4),
    cursor: 'pointer',
    boxShadow: '3px 3px 5px #777',
    borderRadius: 7,
    padding: 20,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: 20,
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      alignItems: 'center',
    },
    '& p': {
      fontSize: 14,
    },
    '& h3': {
      fontSize: 20,
      color: '#6864F9',
      marginBottom: 10,
      marginTop: 10,
    },
  },

  cardState: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      justifyContent: 'center',
    },
    '& span': {
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      marginRight: 10,
      '& .fas': {
        color: '#32F99C',
        marginRight: 7,
      },
    },
  },

  cardDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,

    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      justifyContent: 'center',
      flexDirection: 'column',
    },
  },
  progressState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      marginTop: 20,
    },
    '& .labels': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: 200,
      '& p': {
        fontSize: 12,
      },
    },
    '& .progress': {
      display: 'flex',
      width: 200,
      height: 5,
      borderRadius: 5,
      background: '#000',
      ovderFlow: 'hidden',
      '& .progressBar0': {
        background: '#29ed89',
        height: 5,
      },
      '& .progressBar1': {
        background: '#c5aa00',
        height: 5,
      },
      '& .progressBar2': {
        background: '#E4C3FF',
        height: 5,
      },
      '& .progressBar3': {
        background: '#c3faff',
        height: 5,
      },
      '& .progressBar4': {
        background: '#f500d7',
        height: 5,
      },
      '& .progressBar5': {
        background: '#8b00f5',
        height: 5,
      },
      '& .progressBar6': {
        background: '#00dff5',
        height: 5,
      },
      '& .progressBar7': {
        background: '#00f54b',
        height: 5,
      },
      '& .progressBar8': {
        background: '#f56600',
        height: 5,
      },
      '& .progressBar9': {
        background: '#ff8800',
        height: 5,
      },
    },
  },

  cardFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderTop: '1px #AFB6E5 solid',
    paddingTop: 10,
    '& img': {
      width: '100%',
    },
  },
  panel: {
    width: '100%',
    background: '#6864F9',
    padding: 30,
    marginBottom: 30,
    '& span': {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      '& p': {
        color: '#fff',
        textAlign: 'left',
        '@media screen and (max-width: 450px) and (orientation: portrait)': {
          fontSize: 12,
        },
      },
      '& a': {
        color: '#32F99C',
        textAlign: 'left',
        '@media screen and (max-width: 450px) and (orientation: portrait)': {},
      },
    },
  },
  viewBtn: {
    color: '#000',
    width: 400,
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      width: '100%',
    },
  },
}));

export default useStyles;
