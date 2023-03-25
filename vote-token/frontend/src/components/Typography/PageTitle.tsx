import { forwardRef, Ref } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TypographyPropsTypes } from 'utils/type';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#00D9AC !important',
    fontSize: 45,
  },
}));

const PageTitle = forwardRef<Ref<any>, TypographyPropsTypes>(({ className, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <Typography
      className={clsx(classes.root, className)}
      style={{ marginBottom: '20px' }}
      variant="h2"
      innerRef={ref}
      {...rest}
    />
  );
});

export default PageTitle;
