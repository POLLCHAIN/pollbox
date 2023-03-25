import { ethers } from "ethers";
import { Contract } from '@ethersproject/contracts'

import TokenABI from '../contracts/Token.json'
import SpaceFactoryABI from '../contracts/SpaceFactory.json'

export const NetworkParams = {
  defaultChainID : 1,
  chainList : [1,56,137,8217],
  1: {
    chainId: '0x01',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://etherscan.io']       
  },  
  56: {
    chainId: '0x38',
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com']       
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
    blockExplorerUrls: ['https://polygonscan.com']       
  }, 
  8217: {
    chainId: '0x2019',
    chainName: 'Klaytn',
    nativeCurrency: {
      name: 'KLAY',
      symbol: 'KLAY',
      decimals: 18,
    },
    rpcUrls: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    blockExplorerUrls: ['https://scope.klaytn.com']       
  },  
}

export const spaceFactory = {
  1: "0x1a2f235f50e94e142918474e83473bd3cad6466b",
  56: "0xcc439735b969b83b861fabefdbd612c26d2ee401",
  137: "0x8560c0d7b9f9bb507050aaccc43699fb4f7fecb0",
  8217: "0x0cf3a5f7c25f1d69838f34b1a0e0700415fdb8ac"
}

export function getSpaceFactoryContract(chainId:any, provider: any) {
  if (!!provider) {
    return new Contract(spaceFactory?.[chainId], SpaceFactoryABI, provider);
  } else {   
    const rpcProvider = new ethers.providers.JsonRpcProvider(NetworkParams?.[chainId]?.rpcUrls[0]);
    return new Contract(spaceFactory?.[chainId], SpaceFactoryABI, rpcProvider);
  }
  
}

export function getTokenContract(address: any, chainId:any, provider: any) {
  if (!!provider) {
    return new Contract(address, TokenABI, provider);
  } else {   
    const rpcProvider = new ethers.providers.JsonRpcProvider(NetworkParams?.[chainId]?.rpcUrls[0]);
    return new Contract(address, TokenABI, rpcProvider);
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


