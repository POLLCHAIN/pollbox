import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import UserChip from '../AvatarInfoItems/UserChip';
import PopoverMenu from '../PopoverMenu';
import TinyBold from '../Typography/TinyBold';

import { useAuthDispatch, logout } from "hooks/authContext";
import { connectorLocalStorageKey } from 'utils/connectors';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(3.875),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    '& .MuiPopover-paper': {
      background: '#151c36',
      boxShadow: '0 0 26px 10px #1111',
      '&::before': {
        content: "''",
        width: 50,
        height: 50,
        borderRadius: theme.shape.borderRadius,
        background: '#151c36',
        position: 'absolute',
        top: -7,
        left: 'calc(50% - 25px)',
        transform: 'rotate(45deg)',
        zIndex: -1,
        // boxShadow: theme.shadows[10],
      },
      [theme.breakpoints.down('xs')]: {
        '&::before, &::after': {
          display: 'none',
        },
      },
    },
  },
  menuContent: {
    minWidth: 256,
    padding: '10px 15px 20px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '90vw',
    },
  },
  label: {
    flex: 1,
    fontWeight: 700,
    color: '#aaa',
  },
  menus: {
    paddingTop: theme.spacing(0.75),
  },
  icon: {
    color: '#00d9ac !important',
    fontSize: 25 + 'px !important',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.75, 0),
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& svg': {
      fontSize: 27,
      color: '#00d9ac',
      marginRight: theme.spacing(1),
    },
    '&:hover': {
      cursor: 'pointer',
      color: '#fff',
    },
  },
}));

const UserDropDown = ({ avatarUrl, displayName, walletAddress }) => {
  const classes = useStyles();
  const history = useHistory();
  
  const { deactivate } = useWeb3React(); 
  const dispatch = useAuthDispatch(); 
  function signOut() {
    deactivate();
    logout(dispatch);
    window.localStorage.setItem(connectorLocalStorageKey, "");
  }


  return (
    <PopoverMenu
      className={classes.paper}
      anchor={<UserChip avatarUrl={avatarUrl} displayName={displayName} />}
      anchorOrigin={{
        vertical: 60,
        horizontal: 30,
      }}
      
    >
      <div className={classes.menuContent}>
        <div className={classes.menus}>
          <div className={classes.menuItem} onClick={() => history.push(`/profile/${walletAddress}?tab=0`)}>
            <PersonIcon className={classes.icon} />
            <TinyBold className={classes.label}>My Profile</TinyBold>
          </div>

          <div className={classes.menuItem} onClick={() => history.push(`/edit-profile`)}>
            <WallpaperIcon className={classes.icon} />
            <TinyBold className={classes.label}>Edit Profile</TinyBold>
          </div>

          <div className={classes.menuItem} onClick={() => signOut()}>
            <ExitToAppIcon />
            <TinyBold className={classes.label}>Logout</TinyBold>
          </div>
        </div>
      </div>
    </PopoverMenu>
  );
};

export default UserDropDown;
