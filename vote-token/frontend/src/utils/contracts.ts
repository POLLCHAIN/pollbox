import { BigNumber, ethers } from "ethers";
import { getSpaceFactoryContract, getTokenContract, spaceFactory, NetworkParams } from "utils";
export function isAddress(address: any) {
    try {
        ethers.utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}
export function toEth(amount: any, decimal: any) {
    return ethers.utils.formatUnits(String(amount), decimal);
}

export function toWei(amount: any, decimal: any) {
    return ethers.utils.parseUnits(String(amount), decimal);
}


export async function getTokenBalance(account: any, tokenAdr: any, chainId: any, provider: any) {
    var tokenContract = getTokenContract(tokenAdr, chainId, provider);
    if (tokenContract) {
        const balance = await tokenContract.balanceOf(account);
        var decimal = await tokenContract.decimals();
        return parseFloat(toEth(balance, decimal));
    }
    return 0;
}

export async function isTokenContract(address: any, chainId: any, provider: any) {
    if (address === '0x0000000000000000000000000000000000000000') {
        return true;
    } else {
        try {
            var tokenContract = getTokenContract(address, chainId, provider);
            if (tokenContract) {
                const symbol = await tokenContract.symbol();
                const decimal = await tokenContract.decimals();
                if (!!symbol && decimal) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (e) { 
            return false; 
        }
    }
}

/**
 * isTokenApproved(account, tokenAddr, amount, to, provider)
 * account : user address
 * tokenAddr : Payment token address
 * amount : approving amount
 * toAddr : address
 */
export async function isTokenApproved(account: any, tokenAddr: any, toAddr: any, chainId: any, provider: any) {
    const tokenContract = getTokenContract(tokenAddr, chainId, provider);
    if (!tokenContract) return false;

    const decimal = await tokenContract.decimals();
    const allowance = await tokenContract.allowance(account, toAddr);
    if (BigNumber.from(toWei(1, decimal)).gt(allowance)) {
        return false;
    }
    return true;
}

/**
 * approveToken(tokenAddr, to, provider)
 * tokenAddr : Payment token address
 * toAddr : address
 */
export async function approveToken(tokenAddr: any, toAddr: any, chainId: any, provider: any) {
    const tokenContract = getTokenContract(tokenAddr, chainId, provider);
    if (!tokenContract) return false;

    const approveAmount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
    try {
        const approve_tx = await tokenContract.approve(toAddr, approveAmount);
        await approve_tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export async function getCreatePrice(chainId: any, provider: any) {
    const factoryContract = getSpaceFactoryContract(chainId, provider);
    if (!factoryContract) return null;
    try {
        const paymentTokenAddress = await factoryContract.paymentTokenAddress();
        const createFee = await factoryContract.createFee();
        if (paymentTokenAddress !== '0x0000000000000000000000000000000000000000') {
            const Token = getTokenContract(paymentTokenAddress, chainId, provider);
            var decimal = await Token.decimals();
            var symbol = await Token.symbol();
            return {
                price: toEth(createFee, decimal),
                tokenAddr: paymentTokenAddress,
                symbol: symbol
            }
        } else {
            return {
                price: toEth(createFee, 18),
                tokenAddr: paymentTokenAddress,
                symbol: NetworkParams?.[chainId]?.nativeCurrency?.symbol
            }
        }
    } catch (e) {
        console.log(e)
        return null;
    }
}

export async function createSpace(account: any, logo: any, name: any, about: any, category: any, powerToken: any, createLimit: any, socialMetadata: any, chainId: any, provider: any) {
    const factoryContract = getSpaceFactoryContract(chainId, provider);
    if (!factoryContract) return false;

    const paymentTokenAddress = await factoryContract.paymentTokenAddress();
    const createFee = await factoryContract.createFee();
    const spaceAddress = spaceFactory?.[chainId];

    try {
        if (paymentTokenAddress === '0x0000000000000000000000000000000000000000') {
            const tx = await factoryContract.createSpace(logo, name, about, category, powerToken, toWei(createLimit, 18), socialMetadata, {
                value: createFee
            });
            await tx.wait(2);
            return true;
        } else {
            const tokenContract = getTokenContract(paymentTokenAddress, chainId, provider);
            if (!tokenContract) return false;
            let tokenApproveStatus = await isTokenApproved(account, paymentTokenAddress, spaceAddress, chainId, provider);
            if (!tokenApproveStatus) {
                tokenApproveStatus = await approveToken(paymentTokenAddress, spaceAddress, chainId, provider);
            }
            if (tokenApproveStatus) {
                const powerTokenContract = getTokenContract(powerToken, chainId, provider);
                var decimal = await powerTokenContract.decimals();
                const tx = await factoryContract.createSpace(logo, name, about, category, powerToken, toWei(createLimit, decimal), socialMetadata, {
                    value: BigNumber.from(0)
                })
                await tx.wait(2);
                return true;
            }
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

