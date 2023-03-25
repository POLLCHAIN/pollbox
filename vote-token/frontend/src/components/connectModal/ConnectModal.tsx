import './connectModal.scss';
import { useEffect } from 'react';
interface Props {
  showConnectModal: boolean;
  setShowConnectModal?: any;
  connectors: any;
  connectToProvider: any;
  connectorLocalStorageKey: any;
}
const ConnectModal: React.FC<Props> = ({ showConnectModal, setShowConnectModal, connectors, connectToProvider, connectorLocalStorageKey }) => {
  // const [isStart, setIsStart] = useState(false)
  useEffect(() => {
    if (showConnectModal) {
      setTimeout(() => {
        // setIsStart(true)
      }, 100);
    }
  }, [showConnectModal]);
  const onClose = () => {
    // setIsStart(false)
    setTimeout(() => {
      setShowConnectModal(false);
    }, 0);
  };
  return (
    <div className={showConnectModal === true ? 'connectModal active' : 'connectModal'}>
      {/* <Bounce opposite when={isStart}> */}
      <div className="modelContent">
        <div className="connectWalletHeader">
          <h1 className="connectWalletTitle">Connect Wallet</h1>
          <button className="connectModalCloseButton" onClick={onClose}>
            <i className="fas fa-window-close"></i>
          </button>
        </div>
        <div className="connectWalletWrapper">
          {
            connectors.map((entry: any, index: any) => (
              <div className="metaMask" key={index}
                onClick={() => {
                  connectToProvider(entry.connectorId);
                  window.localStorage.setItem(connectorLocalStorageKey, entry.key);
                  setShowConnectModal(false);
                }}>
                <div className="left">
                  <div className="icon">
                    <img src={entry.icon} alt="" />
                  </div>
                </div>
                <div className="middle">
                  <h2>{entry.title}</h2>
                  <p>{entry.detail}</p>
                </div>
                <div className="right">
                  <button>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>      
    </div>
  );
};
export default ConnectModal;
