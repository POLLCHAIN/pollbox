import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    paddingTop: theme.spacing(0),
    paddingBottom: '1px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 76,
      textAlign: 'center',
    },
  },
  conBtn: {
    marginTop: 30,
  },

  topSection: {
    position: 'relative',
    paddingTop: '80px',
  },    
  wrapper: {
    padding: '60px 10px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '& h1': {
      fontSize: '2.5rem',
      fontWeight: 900,
    },
    '& p': {
      color: '#333',
      fontSize: 20,
      lineHeight: 1.8,
    },
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
      marginLeft: 10,
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
  spaceLists: {
    width: '100%',
    maxWidth: 1440,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px 15px',
    '& h1': {
      color: '#000',
      fontSize: 30,
      fontWeight: 900,
      marginBottom: 10,      
    },
    '& .full': {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      borderRadius: '3px',
      justifyContent: 'flex-start',
      '& .root': {
        cursor: 'pointer',
        margin: '10px',
        display: 'flex',
        padding: '16px 24px',
        position: 'relative',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: '1px',
        '& .container': {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& .avataWrapper': {
            position: 'relative',
            '& img': {              
              width: 80,
              height: 80,  
              borderRadius: '50%'   
            },
          },
          '& .infoWrapper': {
            width:'150px',
            padding: '5px',
            '& .name': {
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontWeight: 'bold'
            }
          },
          '& .join': {
            margin: '15px 0px',
            border: '1px solid #e0e0e0',
            backgroundColor: 'transparent',
            color: '#444444',
            borderRadius: '23px',
            padding: '7px 35px',
            cursor: 'pointer',
          }
        }
      }
    }
  }
}));

export default useStyles;
