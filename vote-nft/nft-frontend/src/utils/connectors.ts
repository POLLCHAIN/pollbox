import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkParams } from "utils";

import metamaskIcon from "../assets/icons/connectors/metamask.svg";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: NetworkParams.chainList,
});


export function getConnector(connectorId: any) {
  switch (connectorId) {
    case "injectedConnector":
      return injectedConnector; 
    default:
      return injectedConnector;
  }
}

export const connectorsByName = {
  'Injected': injectedConnector  
}

export const connectors = [
  {
    title: "Metamask",
    detail: "Connect using browser wallet",
    icon: metamaskIcon,
    connectorId: injectedConnector,
    key: "injectedConnector",
  },  
]

export const connectorLocalStorageKey = "connectorId";

