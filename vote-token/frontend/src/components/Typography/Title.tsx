import { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TypographyPropsTypes } from 'utils/type';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#00D9AC !important',
    // textShadow: '1px 1px 0px #000, -1px -1px 0px #fff, -1px 1px 0px #000, 1px -1px 0px #000, 3px 3px 5px #000'
  },
}));

const Title = forwardRef<Ref<any>, TypographyPropsTypes>(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return <Typography className={clsx(classes.root, className)} variant="h2" innerRef={ref} {...rest} />;
});

export default Title;
