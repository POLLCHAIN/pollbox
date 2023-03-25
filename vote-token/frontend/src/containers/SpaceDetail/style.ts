import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 76,
      textAlign: 'center',
    },
  },
  conBtn: {
    marginTop: 30,
  },

  section: {
    position: 'relative',
    paddingTop: theme.spacing(0),
  },
  topSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing(0),
  },
  video: {
    width: '100%',
  },
  wrapper: {
    height: '100%',
    width: '100%',
    maxWidth: 1440,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    padding: 50,
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      flexDirection: 'column',
      paddingTop: 100,
    },
    '& .left': {
      flex: 0.6,
    },
    '& .right': {
      flex: 0.4,
      '& img': {
        width: '100%',
      },
    },
    '& h1': {
      color: '#000',
      fontSize: '3.5rem',
      fontWeight: 900,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        fontSize: 30,
      },
      '& span': {
        position: 'relative',
        zIndex: 1,
        '&:before': {
          content: '""',
          height: '1rem',
          width: '100%',
          position: 'absolute',
          backgroundImage: `url("/assets/images/title_line_02.png")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          left: 0,
          bottom: 0,
          zIndex: -1,
        },
      },
    },
    '& p': {
      color: '#bbbad5',
      fontSize: 18,
      lineHeight: 1.8,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        fontSize: 14,
      },
    },
    '& .btns': {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        flexDirection: 'column',
        marginTop: 10,
      },
      '& button': {
        marginRight: 20,
        '@media screen and (max-width: 450px) and (orientation: portrait)': {
          fontSize: 14,
          padding: '8px 10px',
          margin: 10,
        },
      },
    },
  },

  stateRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fdfdfd',
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: '#000',
  },
  content: {
    width: '100%',
    display: 'flex',
    maxWidth: 1440,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
  rightLine: {
    borderRight: '1px #AFB6E5 solid',
    '@media screen and (max-width: 450px) and (orientation: portrait)': {
      border: 'none',
    },
  },

  item: {
    cursor: 'pointer',
    justifyContent: 'center',
    margin: 20,
    width: '25%',
    alignItems: 'flex-start',
    display: 'flex',
    maxWidth: 360,
    flexDirection: 'column',
    textAlign: 'left',
    padding: theme.spacing(2, 1),
    position: 'relative',
    '@media (max-width: 768px)': {
      width: '200px',
      padding: 0,
    },
    '& h3': {
      color: '#32F99C',
      fontSize: 30,
      marginBottom: 10,
      '@media screen and (max-width: 450px) and (orientation: portrait)': {
        fontSize: 20,
      },
    },

    '& p': {
      color: '#AFB6E5',
    },
  },
}));

export default useStyles;
