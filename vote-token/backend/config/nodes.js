const random = require('lodash/random')

const nodes = {
    1: [
        'https://eth-mainnet.g.alchemy.com/v2/demo',
        'https://rpc.flashbots.net',
        'https://eth-mainnet-public.unifra.io',
        'https://api.securerpc.com/v1',
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://mainnet-eth.compound.finance',
        'https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79', // 100000 blocks
        'https://eth-rpc.gateway.pokt.network', // 100000
        'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7', // 50000        
    ],
    56: [
        'https://binance.nodereal.io', // 50000
        'https://bsc-dataseed.binance.org', // 50000
        'https://bsc-dataseed1.binance.org', // 50000
        'https://bsc-dataseed2.binance.org', // 50000
        'https://bsc-dataseed3.binance.org', // 50000
        'https://bsc-dataseed4.binance.org', // 50000
        'https://bsc-dataseed1.defibit.io', // 50000
        'https://bsc-dataseed2.defibit.io', // 50000
        'https://bsc-dataseed3.defibit.io', // 50000
        'https://bsc-dataseed4.defibit.io', // 50000
        'https://bsc-dataseed1.ninicoin.io', // 50000
        'https://bsc-dataseed2.ninicoin.io', // 50000
        'https://bsc-dataseed3.ninicoin.io', // 50000
        'https://bscrpc.com', // 100000
    ],
    137: [
        'https://rpc-mainnet.matic.quiknode.pro', // 10000
        'https://polygon-rpc.com', // 10000
        'https://poly-rpc.gateway.pokt.network', // 100000
    ],
    8217: [
        'https://public-node-api.klaytnapi.com/v1/cypress', // 10000 
        'https://klaytn01.fandom.finance', // 10000 
        'https://klaytn02.fandom.finance', // 10000 
        'https://klaytn03.fandom.finance', // 10000 
        'https://klaytn04.fandom.finance', // 10000 
        'https://klaytn05.fandom.finance', // 10000 
        'https://cypress.fandom.finance/archive', // 10000        
    ]
}

const getNodeUrl = (chainId) => {
    const rpcNodes = nodes?.[chainId];
    const randomIndex = random(0, rpcNodes.length - 1)
    return rpcNodes[randomIndex]
}

module.exports = getNodeUrl;