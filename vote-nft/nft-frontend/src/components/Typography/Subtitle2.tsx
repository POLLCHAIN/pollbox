import { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TypographyPropsTypes } from 'utils/type';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

const SubTitle2 = forwardRef<Ref<any>, TypographyPropsTypes>(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return <Typography className={clsx(classes.root, className)} variant="subtitle2" innerRef={ref} {...rest} />;
});

export default SubTitle2;
