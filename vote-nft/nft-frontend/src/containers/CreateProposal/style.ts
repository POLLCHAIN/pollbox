import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 100,
      textAlign: 'center',
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
    '& .input-picker': {
      width: '100%',
      marginTop: '12px',
      borderRadius: '8px',
      padding: '8px',
      borderWidth: '1px',
    }
  },
}));

export default useStyles;
