import { ethers } from "ethers";
import { Contract } from '@ethersproject/contracts'

import SingleNFTABI from '../contracts/SingleNFT.json'
import SpaceFactoryABI from '../contracts/SpaceFactory.json'

export const NetworkParams = {
  defaultChainID : 1,
  // chainList : [1,137,250,43114,100],
  chainList : [1,250,43114,100],
  1: {
    chainId: '0x01',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://etherscan.io'],
    subgraph: 'https://api.studio.thegraph.com/query/37548/erc1155-balance-mainnet/v1'
  },  
  5: {
    chainId: '0x05',
    chainName: 'Goerli',
    nativeCurrency: {
      name: 'Goerli',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
    subgraph: 'https://api.studio.thegraph.com/query/37548/erc1155-balance-goerli/v1'       
  },  
  137: {
    chainId: '0x89',
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com'],
    subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-polygon' 
  },
  250: {
    chainId: '0xFA',
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ftm.tools'],
    blockExplorerUrls: ['https://ftmscan.com'],
    subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-fantom' 
  },
  43114: {
    chainId: '0xA86A',
    chainName: 'Avalanche',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://avalanche-evm.publicnode.com'],
    blockExplorerUrls: ['https://snowtrace.io'],
    subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-avalanche' 
  }, 
  100: {
    chainId: '0x64',
    chainName: 'Gnosis',
    nativeCurrency: {
      name: 'xDAI',
      symbol: 'xDAI',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.gnosischain.com'],
    blockExplorerUrls: ['https://gnosisscan.io'],
    subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-gnosis' 
  },
}

export const spaceFactory = {
  1: "0x05a7ecb5b85acb6e3004e22e69ecca365e104927",
  5: "0x4328476ad9301b0d11a4e3de291be004fc6b436c",
  137: "0x7f9d0108864e222237200931cbca1dd156599a10",
  250: "0xc8dd8eaebc6c36f124c946c6a433e5f0ceab14e6",
  43114: "0xc8dd8eaebc6c36f124c946c6a433e5f0ceab14e6",
  100: "0x0ba792a8f54143DC8b5E5852a93f9b79cB150D31"
}

export function getSpaceFactoryContract(chainId:any, provider: any) {
  if (!!provider) {
    return new Contract(spaceFactory?.[chainId], SpaceFactoryABI, provider);
  } else {   
    const rpcProvider = new ethers.providers.JsonRpcProvider(NetworkParams?.[chainId]?.rpcUrls[0]);
    return new Contract(spaceFactory?.[chainId], SpaceFactoryABI, rpcProvider);
  }
  
}

export function getNFTContract(address: any, chainId:any, provider: any) {
  if (!!provider) {
    return new Contract(address, SingleNFTABI, provider);
  } else {   
    const rpcProvider = new ethers.providers.JsonRpcProvider(NetworkParams?.[chainId]?.rpcUrls[0]);
    return new Contract(address, SingleNFTABI, rpcProvider);
  }
  
}

export function truncateWalletString(walletAddress: string) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 4);
  const endStr = walletAddress.substring(lengthStr - 4, lengthStr);
  return startStr + '...' + endStr;
}

export function shortString(originalStr: string, length: number) {
  if (!originalStr) return originalStr;
  const lengthStr = originalStr.length;
  if (lengthStr <= length) {
    return originalStr;
  } else {
    return originalStr.substring(0, length) + '...';
  }  
}

export function formatNum(value: any) {  
  let intValue = Math.floor(value)
  if (intValue < 0) {
    let absValue = Math.abs(intValue);
    if (absValue < 10) {
      return '-'+ parseFloat(value).toPrecision(2)
    } else if (absValue < 1000){
      return '-' + absValue
    } else if (absValue < 1000000) {
      return '-' + parseFloat(String(absValue/1000.0)).toFixed(1) + 'K'
    } else if (absValue < 1000000000) {
      return '-' + parseFloat(String(absValue/1000000.0)).toFixed(1) + 'M'
    } else if (absValue < 1000000000000) {
      return '-' + parseFloat(String(absValue/1000000000.0)).toFixed(1) + 'B'
    } else {
      return '-' + parseFloat(String(absValue/1000000000000.0)).toFixed(1) + 'T'
    }
  }else if (intValue < 10) {
    return ''+ parseFloat(value).toPrecision(2)
  } else if (intValue < 1000){
    return '' + intValue
  } else if (intValue < 1000000) {
    return parseFloat(String(intValue/1000.0)).toFixed(1) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(String(intValue/1000000.0)).toFixed(1) + 'M'
  } else if (intValue < 1000000000000) {
    return parseFloat(String(intValue/1000000000.0)).toFixed(1) + 'B'
  } else {
    return parseFloat(String(intValue/1000000000000.0)).toFixed(1) + 'T'
  }
}


