import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    // padding: '10px 20px',
    height: '45px',
    fontSize: 16,
    '@media screen and (max-width: 540px)': {
      height: '35px',
      fontSize: 13,
    }
  },
  icon: {
    marginLeft: 16,
    '& svg': {
      fontSize: 17,
    },
  },
  primary: {
    background: '#6440fe',
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: '#6440fe',
    },
  },
  rectBtn: {
    background: '#6440fe',
    color: theme.palette.primary.contrastText,
    borderRadius: 7,
    '&:hover': {
      background: '#6440fe',
    },
  },
  bid: {
    background: '#44E5AD',
    color: '#000',
    borderRadius: 7,
    '&:hover': {
      background: '#09B87B',
    },
  },
  deal: {
    background: '#6864F9',
    color: '#000',
    '&:hover': {
      background: '#6440fe',
    },
  },
  error: {
    background: theme.palette.error.main,
    color: '#000',
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  success: {
    background: '#F9D679',
    color: '#000',
    '&:hover': {
      background: '#F9D679',
    },
  },
}));

const FilledButton = ({ className, label, icon, size, handleClick, color, disabled }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className, classes[color], disabled ? classes.disabled : '')}
      variant="contained"
      size={size}
      onClick={handleClick}
      type="submit"
    >
      {label}
      {Boolean(icon) && <span className={clsx(classes.icon, classes.root)}>{icon}</span>}
    </Button>
  );
};

FilledButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.any.isRequired,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  handleClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'error', 'success', 'deal', 'bid']),
  disabled: PropTypes.bool,
};

FilledButton.defaultProps = {
  className: '',
  icon: '',
  size: 'medium',
  handleClick: () => {},
  color: 'primary',
  disabled: false,
};

export default FilledButton;
