import { ethers } from "ethers";
import axios from 'axios';
import { getSpaceFactoryContract, getNFTContract, NetworkParams } from "utils";
export function isAddress(address: any) {
    try {
        ethers.utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}
export function toEth(amount: any, decimal: any) {
    return ethers.utils.formatUnits(String(amount), decimal);
}


export async function getNFTBalance(account: any, nftAddr: any, nftType: any, chainId: any, provider: any) {
    try {
        if (Number(nftType) === 0) {
            // erc721
            var nftContract = getNFTContract(nftAddr, chainId, provider);
            if (nftContract) {
                const balance = await nftContract.balanceOf(account);
                return Number(balance);
            } else {
                return 0;
            }
        } else {
            // erc1155
            // get balance from subgraph
            const subgraph_link = NetworkParams?.[chainId]?.subgraph;
            const balanceID = `${nftAddr.toLowerCase()}-${account.toLowerCase()}`;
            const result = await axios.post(subgraph_link, {
                query: `{
                    balance(
                      id: "${balanceID}"
                    ) {
                      account
                      collection
                      id
                      timestamp
                      value
                    }
                }`,
                variables: {}
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(result);
            if (result.data.data && result.data.data.balance) {
                return Number(result.data.data.balance.value);
            } else {
                return 0;
            }
        }

    } catch (error) {
        return 0;
    }


}

export async function isNFTAddress(address: any, chainId: any, provider: any) {
    const nftContract = getNFTContract(address, chainId, provider);
    if (!nftContract) return false;
    try {
        const result = await nftContract.supportsInterface('0x01ffc9a7')
        return result;
    } catch (e) { return false; }
}


export async function getCreatePrice(chainId: any, provider: any) {
    const factoryContract = getSpaceFactoryContract(chainId, provider);
    if (!factoryContract) return null;
    try {
        const createFee = await factoryContract.createFee();
        return {
            price: toEth(createFee, 18),
            symbol: NetworkParams?.[chainId]?.nativeCurrency?.symbol
        }
    } catch (e) {
        console.log(e)
        return null;
    }
}

export async function createSpace(account: any, logo: any, name: any, about: any, category: any, nftAddr: any, createLimit: any, socialMetadata: any, chainId: any, provider: any) {
    const factoryContract = getSpaceFactoryContract(chainId, provider);
    if (!factoryContract) return false;
    const createFee = await factoryContract.createFee();

    try {
        const tx = await factoryContract.createSpace(logo, name, about, category, nftAddr, createLimit, socialMetadata, {
            value: createFee
        });
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

