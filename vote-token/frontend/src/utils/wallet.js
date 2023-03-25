// Set of helper functions to facilitate wallet setup

import { NetworkParams } from "./index"

/**
 * Prompt the user to add MATIC as a network on Metamask, or switch to MATIC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainId) => {
  
  const provider = window.ethereum;
  if (provider) {    
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          NetworkParams?.[chainId],        
        ],
      });
      return true;
    } catch (error) {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,            
          },
        ],
      });
      return true;
    }
  } else {
    console.error("Can't setup Network on metamask because window.ethereum is undefined");
    return false;
  }
}
