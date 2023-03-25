import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    paddingTop: '56px',
    paddingBottom: theme.spacing(5)    
  },
  conBtn: {
    marginTop: 30,
  },

  section: {
    position: 'relative',
    paddingTop: theme.spacing(0),
  },

  rootContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fdfdfd',
    paddingTop: 50,
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: 1440,
    paddingBottom: 50,
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
    padding: '0px 20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    maxWidth: 1440,
    '& span': {
      marginRight: 10,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {},
    },
    '& .network': {
      color: '#6440fe',
      fontSize: '1.4rem',
      fontWeight: 600,
    },
  },
  contentBody: {
    padding: '2%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: '30px',
    width: '100%'    
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
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      width: '100%',
    },
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
    '& span': {
      fontSize: 14,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginRight: 10,
      width: '100%',
      '& .fas': {
        color: '#32F99C',
        marginRight: 7,
      },
    },

    '& p': {
      fontSize: 14,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        fontSize: 10,
      },
    },
    '& h3': {
      fontSize: 20,
      color: '#6864F9',
      marginBottom: 10,
      marginTop: 10,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        fontSize: 18,
      },
    },
  },

  cardState: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
    width: '100%',
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      justifyContent: 'center',

      width: '100%',
    },
    '& .myTable': {
      width: '100%',
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        overflowX: 'scroll',
      },
      '& span': {        
        margin: 0,        
      },
    },
    '& h1': {
      fontSize: 30,
      color: '#000',
      textAlign: 'left',
      marginBottom: 20,
      width: '100%',
    },
    '& span': {
      fontSize: 14,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginRight: 10,
      marginBottom: 20,
      width: '100%',
      '& p': {
        fontSize: 14,
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

    '& .Mytab': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '& .tabList': {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottom: '1px #777 solid',
        '& .tab': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: '10px 20px',
          '@media screen and (max-width: 450px) and (orientation: portrait)': {
            fontSize: 14,
            padding: '10px 10px',
          },
        },
      },
      '& .tabContent': {        
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        borderBottom: '1px #777 solid',
        maxHeight: '500px',
        overflowY: "auto",
      },
    },
  },
  progressState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      marginTop: 20,
    },
    '& .labels': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      marginBottom: 10,
      '& p': {
        fontSize: 12,
      },
    },
    '& .progress': {
      display: 'flex',
      width: '100%',
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

  panel: {
    width: '100%',
    background: '#6864F9',
    padding: 30,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& span': {
      width: '50%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      '& img': {
        width: '60px',
        height: '60px',
        marginBottom: 10,
        '@media screen and (max-width: 450px) and (orientation: portrait)': {
          fontSize: 12,
        },
      },
      '& p': {
        color: '#000',
        textAlign: 'left',
        marginBottom: 10,
        '@media screen and (max-width: 450px) and (orientation: portrait)': {
          fontSize: 12,
        },
      },
      '& h5': {
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

  blackBtn: {
    color: '#000',
    padding: '8px 10px !important',
    borderColor: '#000',
    margin: 10,
    '@media screen and (max-width: 450px) and (orientation: portrait)': {},
  },
}));

export default useStyles;
