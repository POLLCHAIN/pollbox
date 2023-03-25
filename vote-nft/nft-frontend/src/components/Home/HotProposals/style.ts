import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fdfdfd',
    paddingTop: 50,
    // backgroundColor: '#000',
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 1440,
    paddingBottom: 50,
    [theme.breakpoints.only('sm')]: {
      paddingLeft: theme.spacing(1.75),
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingTop: 10,
    },
    '& .MuiOutlinedInput-root': {
      background: '#00D9AC00',
      border: 'none',
      boxShadow: '0px 0px 3px #00D9AC',
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '30px',
  },

  header: {
    fontSize: '3rem',
    color: '#000',
    textAlign: 'center',
    lineHeight: '50px',
    position: 'relative',
    marginBottom: 20,
    '@media (max-width: 768px)': {
      fontSize: '1.5em',
    },
    '&:after': {
      content: '""',
      height: 23,
      width: 34,
      position: 'absolute',
      backgroundImage: `url("/assets/images/title_img_01.svg")`,
      backgroundRepeat: 'no-repeat',
      top: '-.75rem',
      left: '-1rem',
    },
    '& span': {
      position: 'relative',
      '&:after': {
        content: '""',
        height: '.5rem',
        width: '100%',
        position: 'absolute',
        backgroundImage: `url("/assets/images/title_line.svg")`,
        backgroundRepeat: 'no-repeat',
        left: 0,
        bottom: 0,
      },
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
    width: '100%',
    display: 'flex',
    margin: theme.spacing(5, 0),
  },
  gridColumn: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0),
    },
    // '@media screen and (max-width: 450px) and (orientation: portrait)': {
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }
  },
  productWrapper: {
    marginBottom: theme.spacing(4),
    maxWidth: 1440,
    margin: 'auto',
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
}));

export default useStyles;
