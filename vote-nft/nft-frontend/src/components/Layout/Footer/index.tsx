import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '../Container';
import TinyBold from '../../Typography/TinyBold';
import ExpandableColumn from './ExpandableColumn';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: '1px solid #aaa',
    padding: theme.spacing(2)    
  },

  center: {
    padding: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1440,
  },

  mail: {
    fontWeight: 300,
    marginBottom: 12,
    fontSize: 16,
    color: `#555555 !important`,
    fontFamily: "'Space Grotesk', sans-serif",
    '& span': {
      fontWeight: 500,
      color: '#fff',
      textDecoration: 'underline',
    },
  },
  link: {
    fontWeight: 500,
    marginBottom: 12,
    fontSize: 16,
    color: `#555555 !important`,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  icon: {
    fontWeight: 300,
    margin: 12,
    fontSize: 30,
    color: `#555555 !important`,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  column: {
    '& .MuiSvgIcon-root': { color: theme.palette.primary.contrastText },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0 !important',
      paddingTop: 30,
      borderTop: `1px solid ${theme.palette.surface[2]}`,
    },

    '& p': {
      color: theme.palette.type === 'dark' ? theme.palette.text.primary : theme.palette.primary.contrastText,
    },
  },
  socials: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container className={classes.container}>
        <Grid container className={classes.center}>
          <Grid item md={12} container spacing={3}>
            <Grid item md={4} sm={4} xs={12}>
              <div className={classes.column}>
                <ExpandableColumn title="PollBox">
                  <a href="/" target="_blank" rel="noreferrer">
                    <TinyBold className={classes.link}>Home</TinyBold>
                  </a>
                  <a href="/" target="_blank" rel="noreferrer">
                    <TinyBold className={classes.link}>About</TinyBold>
                  </a>
                  <a href="/" target="_blank" rel="noreferrer">
                    <TinyBold className={classes.link}>Terms Of Service</TinyBold>
                  </a>                  
                </ExpandableColumn>
              </div>
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              <div className={classes.column}>
                <ExpandableColumn title="Resources">
                  <a href="/" target="_blank" rel="noreferrer">
                    <TinyBold className={classes.link}>Blog</TinyBold>
                  </a>
                  <a href="/" target="_blank" rel="noreferrer">
                    <TinyBold className={classes.link}>Github</TinyBold>
                  </a>                  
                </ExpandableColumn>
              </div>
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              <div className={classes.column}>
                <ExpandableColumn title="Stay connected">
                  <div className={classes.socials}>
                    <a href="/" target="_blank" rel="noreferrer">
                      <TinyBold className={classes.icon}>
                        <i className="fab fa-telegram"></i>
                      </TinyBold>
                    </a>
                    <a href="/" target="_blank" rel="noreferrer">
                      <TinyBold className={classes.icon}>
                        <i className="fab fa-twitter"></i>
                      </TinyBold>
                    </a>
                    <a href="/" target="_blank" rel="noreferrer">
                      <TinyBold className={classes.icon}>
                        <i className="fab fa-instagram"></i>
                      </TinyBold>
                    </a>
                    <a href="/" target="_blank" rel="noreferrer">
                      <TinyBold className={classes.icon}>
                        <i className="fab fa-discord"></i>
                      </TinyBold>
                    </a>
                    <a href="/" target="_blank" rel="noreferrer">
                      <TinyBold className={classes.icon}>
                        <i className="fab fa-medium-m"></i>
                      </TinyBold>
                    </a>
                  </div>
                </ExpandableColumn>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
