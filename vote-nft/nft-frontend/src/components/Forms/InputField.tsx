import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Caption from '../Typography/Caption';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MakeStylesPropType {
  size: string;
}

interface InputPropsType {
  icon?: any;
  placeholder?: string;
  className?: string;
  wrapperClass?: string;
  label?: string;
  name?: string;
  size?: 'small' | 'medium';
  isMulti?: boolean;
  error?: boolean;
  row?: number;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChangeData?: (val: string) => void;
  register?: UseFormRegister<FieldValues> | null;
}

const useStyles = makeStyles<Theme, MakeStylesPropType>(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    borderBottom: `1px solid #00D9AC `,
    // padding: '0',
    // paddingBottom: '5px',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    fontSize: props => (props.size === 'small' ? 13 : 14),
    minHeight: props => (props.size === 'small' ? 41 : 48),
    borderRadius: '0px',
    '&.Mui-error': {
      borderColor: 'red',
    },
    '& input::placeholder, & textarea::placeholder,': {
      // color: '#959595',
      opacity: 1,
    },
    background: 'transparent',
  },
  icon: {
    color: '#777e90',
  },
  label: {
    marginBottom: 9,
  },
}));
const InputField = ({
  icon = <span />,
  placeholder = '',
  className = '',
  wrapperClass = '',
  name = '',
  label = '',
  size = 'medium',
  isMulti = false,
  row = 3,
  value = '',
  onChangeData,
  error = null,
  register = null,
  type = 'text',
  disabled = false,
}: InputPropsType) => {
  const classes = useStyles({ size });
  const [val, setVal] = useState<string>(value);

  const changeHandler = (data: string) => {
    setVal(data);
    onChangeData && onChangeData(data);
  };

  return (
    <div className={clsx(classes.wrapper, wrapperClass)}>
      {Boolean(label) && <Caption className={classes.label}>{label}</Caption>}
      <OutlinedInput
        className={clsx(classes.root, className)}
        placeholder={placeholder}
        defaultValue={val}
        onChange={e => {
          changeHandler(e.currentTarget.value);
        }}
        error={error}
        rows={row}
        {...(register && register(name, { required: false }))}
        multiline={isMulti}
        type={type}
        notched={false}
        endAdornment={
          <InputAdornment position="end" className={classes.icon}>
            {icon || null}
          </InputAdornment>
        }
        disabled={disabled}
      />
    </div>
  );
};

export default InputField;
