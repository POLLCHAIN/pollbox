import { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TypographyPropsTypes } from 'utils/type';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.hint,
    marginBottom: 9,
  },
}));

const Caption = forwardRef<Ref<any>, TypographyPropsTypes>(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return <Typography className={clsx(classes.root, className)} variant="caption" innerRef={ref} {...rest} />;
});

export default Caption;
