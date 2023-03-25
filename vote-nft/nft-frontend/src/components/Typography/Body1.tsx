import { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TypographyPropsTypes } from 'utils/type';

const useStyles = makeStyles<Theme, TypographyPropsTypes>(theme => ({
  root: {
    color: props => theme.palette.text[props.color],
    width : '100%'
  },
}));

const Body1 = forwardRef<Ref<any>, TypographyPropsTypes>(({ color = 'primary', className, ...rest }, ref) => {
  const classes = useStyles({ color });

  return <Typography className={clsx(classes.root, className)} variant="body1" innerRef={ref} {...rest} />;
});

export default Body1;
