// @ts-ignore
// @ts-nocheck
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const CustomChip = withStyles(theme => ({
  root: {
    color: theme.palette.primary.contrastText,
    height: theme.spacing(5),
    marginLeft: 11,
    '& .MuiChip-avatar': {
      width: 32,
      height: 32,
      marginLeft: 2,
      marginRight: 3,
    },
  },
  outlined: {
    borderWidth: 0,
    padding: '0.5rem 0.5rem',
    border: 'none',
    boxShadow: '0px 0px 3px #00d9ac',
    borderRadius: '10px',
    backgroundColor: 'rgba(57, 87, 255, 0.116)',
    '&:hover': {
      boxShadow: '0px 0px 10px #00d9ac',
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary.dark + ' !important',
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}))(Chip);

const UserChip = ({ avatarUrl, displayName }) => {

  return (
    <CustomChip
      avatar={<Avatar src={avatarUrl || '/assets/images/users/default-profile.png'} />}
      label={
        <span>
          {displayName}          
        </span>
      }
      variant="outlined"
      clickable
    />
  );
};

UserChip.propTypes = {};

UserChip.defaultProps = {};

export default UserChip;
