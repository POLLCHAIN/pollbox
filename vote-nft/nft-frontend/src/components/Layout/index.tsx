import PropTypes from 'prop-types';
import { useState } from 'react';

import Topbar from './topbar/Topbar';
import Menu from 'components/menu/Menu';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  layout: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  layoutContent: {
    flex: 1,
    marginzTop: '5rem',
    zIndex: 1,
  },
}));
const Layout = (props: any) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} connectAccount={props.connectAccount}/>
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={classes.layoutContent}>{props.children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
