import { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TypographyPropsTypes } from 'utils/type';

const useStyles = makeStyles<Theme, TypographyPropsTypes>((theme: Theme) => ({
  root: {
    color: '#000',
  },
  secondary: {
    color: '#fff',
  },
}));

const SubTitle1 = forwardRef<Ref<any>, TypographyPropsTypes>(({ color = 'secondary', className, ...rest }, ref) => {
  const classes = useStyles({ color });

  return <Typography className={clsx(classes.root, className)} variant="subtitle1" innerRef={ref} {...rest} />;
});

export default SubTitle1;
