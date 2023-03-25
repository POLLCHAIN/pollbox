import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { verify } from 'jsonwebtoken';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider } from '@material-ui/core/styles';
import lightTheme from '../../theme/light';
import Routes from '../../routes';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from 'utils/scrollToTop';
import '../../assets/css/tailwind.output.css';

import { useAxios } from 'hooks/useAxios';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useInactiveListener } from 'hooks/useInactiveListener';
import { connectors, connectorLocalStorageKey } from 'utils/connectors';
import { getErrorMessage } from 'utils/ethereum';
import ConnectModal from 'components/connectModal/ConnectModal';
import NetworkErrorDialog from 'components/NetworkErrorDialog';
import { useAuthDispatch, useAuthState, loginUser, getUser, logout } from 'hooks/authContext';

function App() {
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [networkError, setNetworkError] = useState('');

  useAxios();

  const { account, activate, active, library, connector } = useWeb3React();
  const connectAccount = () => {
    setConnectModalOpen(true)
  }
  const connectToProvider = (connector: any) => {
    console.log('connecting...');
    console.log('connector', JSON.stringify(connector));
    activate(connector)
  }

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // mount only once or face issues :P
  const [triedEager, triedEagerError] = useEagerConnect()
  const { activateError } = useInactiveListener(!triedEager || !!activatingConnector)

  // handling connection error
  if ((triedEagerError || activateError) && !errorModalOpen) {
    const errorMsg = getErrorMessage(triedEagerError || activateError);
    console.log('errorMsg : ', errorMsg);
    setNetworkError(errorMsg);
    setErrorModalOpen(true);
  } 


  const closeErrorModal = () => {
    window.localStorage.setItem(connectorLocalStorageKey, connectors[0].key);
    window.location.reload();
  }

  const dispatch = useAuthDispatch();
  const { user, token } = useAuthState();

  const login = async () => {
    if (!account || !library) {
      console.log('not connected to wallet')
      return;
    }
    if (!user || (user && user.address.toLowerCase() !== account.toLowerCase())) {
      console.log('fetching user')
      await getUser(dispatch, account);
      return;
    }
    if (token) {
      verify(token, '!@#456QWErty', (err: any, payload: any) => {
        if (err) {
          logout(dispatch);
          return;
        }
        let address = payload.data;
        if (address.toLowerCase() !== account.toLowerCase()) {
          loginUser(dispatch, account, user?.nonce, library.getSigner());
          return;
        }
      })
    } else {
      loginUser(dispatch, account, user?.nonce, library.getSigner());
      return;
    }
  }

  return (
    <MuiThemeProvider theme={lightTheme}>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 }, error: { duration: 3000 } }} />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Router basename={process.env.PUBLIC_URL}>
          <ScrollToTop />
          <Routes connectAccount={connectAccount} login={login} user={user}/>
        </Router >
      </SnackbarProvider>

      <NetworkErrorDialog
        open={!!errorModalOpen && !active}
        onClose={() => {
          setErrorModalOpen(false)
        }}
        handleClose={closeErrorModal}
        message={networkError}
      />
      <ConnectModal
        showConnectModal={connectModalOpen}
        setShowConnectModal = {setConnectModalOpen}
        connectors={connectors}
        connectToProvider={connectToProvider}
        connectorLocalStorageKey={connectorLocalStorageKey}
      />
    </MuiThemeProvider>
  );
}

export default App;
