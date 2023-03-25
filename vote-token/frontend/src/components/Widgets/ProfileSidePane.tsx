import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Pane from '../Pane';
import SubTitle1 from '../Typography/Subtitle1';
import Body1 from '../Typography/Body1';
import { truncateWalletString } from 'utils';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.mdBorderRadius,
    padding: '30px 27px',
    textAlign: 'center',
    background: 'transparent',
    border: 'none',
  },
  avatar: {
    width: 200,
    height: 200,
    background: theme.palette.surface[0],
    '@media screen and (max-width: 768px)': {
      width: 80,
      height: 80,
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 47,
    marginBottom: 50,
    width: 171,
  },
  name: {
    color: theme.palette.primary.main,
    marginTop: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  description: {
    color: theme.palette.text.secondary,
    marginTop: 17,
    marginBottom: 18,
  },
  icon: {
    fontSize: 16,
    color: theme.palette.text.secondary,
  },
  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    '& svg': {
      marginRight: 5,
    },
    '& a': {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },
  },
  sites: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 46,
    width: 103,
  },
  bottom: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: '52px 0 5px',
  },
  avatarWrapper: {
    position: 'relative',
    '& svg.verified-icon': {
      position: 'absolute',
      bottom: 2,
      right: 20,
    },
  },
}));

const ProfileSidePane = ({ userProfile }) => {
  const classes = useStyles();

  return (
    <Pane className={classes.root}>
      <div className={classes.avatarWrapper}>
        <Avatar className={classes.avatar} src={userProfile?.profilePic} />
      </div>
      <SubTitle1 className={classes.name}>{userProfile?.name}</SubTitle1>
      <Body1>{userProfile?.email}</Body1>
      <Body1>{truncateWalletString(userProfile?.address)}</Body1>

      <div className={classes.sites}>
        {
          userProfile?.twitter &&
          <a href={userProfile?.twitter} target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        }
        {
          userProfile?.instagram &&
          <a href={userProfile?.instagram} target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        }
        {
          userProfile?.facebook &&
          <a href={userProfile?.facebook} target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        }
        {
          userProfile?.discord &&
          <a href={userProfile?.discord} target="_blank" rel="noreferrer">
            <i className="fab fa-discord"></i>
          </a>
        }
      </div>
    </Pane>
  );
};

ProfileSidePane.propTypes = {};

ProfileSidePane.defaultProps = {};

export default ProfileSidePane;
