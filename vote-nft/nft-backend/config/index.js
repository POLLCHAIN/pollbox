const config = {
    secret: '!@#456QWErty',
    zeroAddress: "0x0000000000000000000000000000000000000000",
    contracts: {
        1: {
            network: 'Ethereum',
            symbol: 'ETH',
            SpaceFactory: {
                address: '0x05a7ecb5b85acb6e3004e22e69ecca365e104927',
                startBlock: 16067237
            },
            subgraph: 'https://api.studio.thegraph.com/query/37548/erc1155-balance-mainnet/v1'
        },
        5: {
            network: 'Goerli',
            symbol: 'ETH',
            SpaceFactory: {
                address: '0x4328476ad9301b0d11a4e3de291be004fc6b436c',
                startBlock: 7968826
            },
            subgraph: 'https://api.studio.thegraph.com/query/37548/erc1155-balance-goerli/v1'
        },
        137: {
            network: 'Polygon',
            symbol: 'MATIC',
            SpaceFactory: {
                address: '0x7f9d0108864e222237200931cbca1dd156599a10',
                startBlock: 36166620
            },
            subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-polygon'                   
        },
        250: {
            network: 'Fantom',
            symbol: 'FTM',
            SpaceFactory: {
                address: '0xc8dd8eaebc6c36f124c946c6a433e5f0ceab14e6',
                startBlock: 51544647
            },
            subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-fantom'                   
        },  
        43114: {
            network: 'Avalanche',
            symbol: 'AVAX',
            SpaceFactory: {
                address: '0xc8dd8eaebc6c36f124c946c6a433e5f0ceab14e6',
                startBlock: 22944011
            },
            subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-avalanche'                   
        }, 
        100: {
            network: 'Gnosis',
            symbol: 'xDAI',
            SpaceFactory: {
                address: '0x0ba792a8f54143DC8b5E5852a93f9b79cB150D31',
                startBlock: 25199310
            },
            subgraph: 'https://api.thegraph.com/subgraphs/name/bin0316/erc1155-balance-gnosis'                   
        },        
    }    
};

module.exports = config;
