import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Caption from '../Typography/Caption';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useState } from 'react';

interface MakeStylesPropsType {
  iconBorder: boolean;
}

interface SelectFieldPropsType {
  className?: string;
  label?: string;
  name?: string;
  iconBorder?: boolean;
  value?: string | number;
  options?: Array<any>;
  register?: UseFormRegister<FieldValues> | null;
  required?: boolean;
  onChangeHandler?: Function;
}

const useStyles = makeStyles<Theme, MakeStylesPropsType>(theme => ({
  root: {
    background: theme.palette.surface[1],
    borderRadius: theme.shape.borderRadius,
    minWidth: 100,

    '& .MuiSelect-root': {
      padding: '12.5px 26px 12.5px 15px',
    },

    '& .MuiSelect-icon': {
      // width: 21,
      // height: 20,
      border: props => props.iconBorder && `2px solid ${theme.palette.surface[2]}`,
      borderRadius: '50%',
      padding: 5,
      right: 3,
      // top: 'calc(50% - 17px)',
      color: theme.palette.text.primary,
      fontWeight: 'bolder',
    },
  },
  label: {
    marginBottom: 10,
  },
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    backgroundColor: theme.palette.surface[2],
    border: `2px solid ${theme.palette.surface[2]}`,
    fontSize: 15,
    padding: '11px 26px 14px 15px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.surface[2],
    },
  },
}))(InputBase);

const SelectField = ({
  className = '',
  label = '',
  name = '',
  iconBorder = true,
  options = [],
  value = '',
  register = null,
  required = false,
  onChangeHandler,
}: SelectFieldPropsType) => {
  const classes = useStyles({ iconBorder });

  const [val, setval] = useState(value);

  const handleChange = event => {
    setval(event.target.value);
    onChangeHandler && onChangeHandler(event);
  };

  return (
    <FormControl className={className}>
      {Boolean(label) && <Caption className={classes.label}>{label}</Caption>}
      <Select
        className={classes.root}
        value={val}
        onChange={e => handleChange(e)}
        input={<BootstrapInput {...(register && register(name, { required: required }))} />}
        IconComponent={KeyboardArrowDownIcon}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options?.map(option => (
          <MenuItem key={option.key} value={option.key}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
