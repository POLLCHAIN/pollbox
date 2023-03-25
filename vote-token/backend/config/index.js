const config = {
    secret: '!@#456QWErty',
    zeroAddress: "0x0000000000000000000000000000000000000000",
    contracts: {
        1: {
            network: 'Ethereum',
            symbol: 'ETH',
            SpaceFactory: {
                address: '0x1a2f235f50e94e142918474e83473bd3cad6466b',
                startBlock: 15895538
            }
        },
        56: {
            network: 'BSC',
            symbol: 'BNB',
            SpaceFactory: {
                address: '0xcc439735b969b83b861fabefdbd612c26d2ee401',
                startBlock: 22867270
            }                   
        },
        137: {
            network: 'Polygon',
            symbol: 'MATIC',
            SpaceFactory: {
                address: '0x8560c0d7b9f9bb507050aaccc43699fb4f7fecb0',
                startBlock: 34992356
            }                   
        },
        8217: {
            network: 'Klaytn',
            symbol: 'KLAY',
            SpaceFactory: {
                address: '0x0cf3a5f7c25f1d69838f34b1a0e0700415fdb8ac',
                startBlock: 106225189
            }                   
        },
    }    
};

module.exports = config;
