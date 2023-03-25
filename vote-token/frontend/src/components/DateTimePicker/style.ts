import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,

    '& label': {
      color: theme.palette.text.hint,
      transform: 'translate(0, -6px) scale(0.75)  !important',
      fontSize: 15,
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      fontWeight: 700,
      lineHeight: 1.66,
      letterSpacing: 0.8,
      textTransform: 'uppercase',

      '&.Mui-focused': {
        color: theme.palette.text.hint,
      },
    },
    '& input': {
      marginTop: 18,
      // border: `2px solid ${theme.palette.surface[2]}`,
      borderRadius: theme.shape.borderRadius,
      // color: theme.palette.text.primary,
      cursor: 'pointer',
      // background: theme.palette.surface[2],
      minWidth: '191px',
      background: '#00D9AC55',
      border: 'none',
      color: '#ddd',
      boxShadow: '0px 0px 3px #00D9AC',
    },
  },
}));

export default useStyles;
