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
    5: [
        'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://goerli.infura.io/v3/5dbcc66077224259aae5e8dd7cdc15ac',
        'https://goerli.infura.io/v3/8efa29d25b59410b98e8b8215b659800',     
    ],
    137: [
        'https://rpc-mainnet.matic.quiknode.pro', // 10000
        'https://polygon-rpc.com', // 10000
        'https://poly-rpc.gateway.pokt.network', // 100000
    ],
    250: [
        'https://rpc.ftm.tools', 
        'https://rpcapi.fantom.network', 
        'https://rpc.fantom.network',        
    ],
    43114: [
        'https://avalanche-evm.publicnode.com', 
        'https://1rpc.io/avax/c',
        'https://avalancheapi.terminet.io/ext/bc/C/rpc',        
    ],
    100: [
        'https://gnosischain-rpc.gateway.pokt.network', 
        'https://xdai-rpc.gateway.pokt.network',
        'https://rpc.ap-southeast-1.gateway.fm/v1/gnosis/non-archival/mainnet',
        'https://rpc.gnosischain.com',            
    ]    
}

const getNodeUrl = (chainId) => {
    const rpcNodes = nodes?.[chainId];
    const randomIndex = random(0, rpcNodes.length - 1)
    return rpcNodes[randomIndex]
}

module.exports = getNodeUrl;