import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#ddd',
  },
  icon: {
    borderRadius: '50%',
    width: 20,
    height: 20,
    backgroundColor: theme.palette.surface[2],
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.surface[3],
    },
  },
  checkedIcon: {
    backgroundColor: '#00D9AC',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const StyledRadio = props => {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

const RadioButtonGroup = ({ className, value, options, onChange }) => {
  const classes = useStyles();

  return (
    <RadioGroup
      value={value}
      name="customized-radios"
      className={clsx(classes.radioGroup, className)}
      onChange={onChange}
    >
      {options.map((option, i) => (
        <FormControlLabel
          key={i}
          className={classes.label}
          id={option.id}
          value={option.value}
          control={<StyledRadio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

RadioButtonGroup.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

RadioButtonGroup.defaultProps = {
  className: '',
  value: '',
};

export default RadioButtonGroup;
