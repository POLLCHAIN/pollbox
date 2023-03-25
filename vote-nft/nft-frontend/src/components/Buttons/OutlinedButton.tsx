import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid #6440fe`,
    color: '#fff',
    fontSize: 16,
    height: '45px',
    '&:hover': {
      background: '#6440fe',
    },
  },
  rectBtn: {
    border: `1px solid #6440fe`,
    borderRadius: 7,
    color: '#6440fe',
    '&:hover': {
      background: '#eee',
    },
  },

  viewDetail: {
    border: `1px solid #6DE2BB`,
    color: '#000',
    '&:hover': {
      background: '#eee',
    },
  },

  black: {
    border: `1px solid #6440fe`,
    color: '#000',
    '&:hover': {
      background: '#eee',
    },
  },

  icon: {
    '& svg': {
      fontSize: 16,
      marginTop: 4,
    },
    '& img': {
      height: 30,
      marginTop: 10,
    },
  },

  iconEnd: {
    marginLeft: theme.spacing(1),
  },
  iconStart: {
    marginRight: theme.spacing(1),
  },
}));

const OutlinedButton = ({ className, label, icon, size, iconPosition, color, handleClick }) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, classes[color], className)}
      variant="outlined"
      size={size}
      onClick={handleClick}
    >
      {iconPosition === 'start' && Boolean(icon) && (
        <span className={clsx(classes.icon, classes.iconStart)}>{icon}</span>
      )}
      {label}
      {iconPosition === 'end' && Boolean(icon) && <span className={clsx(classes.icon, classes.iconEnd)}>{icon}</span>}
    </Button>
  );
};

OutlinedButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  iconPosition: PropTypes.oneOf(['start', 'end']),
  handleClick: PropTypes.func,
  color: PropTypes.oneOf(['viewDetail', 'rectBtn', 'black', '']),
};

OutlinedButton.defaultProps = {
  className: '',
  icon: '',
  size: 'medium',
  iconPosition: 'end',
  handleClick: () => {},
};

export default OutlinedButton;
