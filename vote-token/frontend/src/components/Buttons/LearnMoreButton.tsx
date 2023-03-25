import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
  root: {
    border: `2px solid #44E5AD`,
    background: '#44E5AD',
    borderRadius: 7,

    '& span': {
      textTransform: 'uppercase',
      fontWeight: 500,
      color: '#000',
    },
  },
}));

const LearnMoreButton = ({ learndMore }) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="outlined" onClick={learndMore}>
      {'Learn more'}
    </Button>
  );
};

export default LearnMoreButton;
