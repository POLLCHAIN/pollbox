const ethers = require('ethers');
const fs = require('fs');

const config = require('./config');
const getNodeUrl = require('./config/nodes');

const SettingModel = require('./models/setting.model');
const Category = require('./models/category.model');
const Space = require('./models/space.model');

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getContractABI = (name) => {
    return JSON.parse(fs.readFileSync(`${__dirname}/abis/${name}.json`));
}

const sync = {

    initCategory: async function () {
        let categories = await Category.find({}).lean();
        if (!categories || categories.length == 0) {
            const default_categories = ["All", "Social", "Protocol", "Investment", "Service", "Media", "Utiity", "Worlds"];
            let categories_to_save = [];
            for (let index = 0; index < default_categories.length; index++) {
                const category = default_categories[index];
                categories_to_save.push({
                    value: index,
                    label: category
                })
            }
            await Category.insertMany(categories_to_save)
        }
    },

    initSetting: async function (chainId) {
        let setting = await SettingModel.findOne({ chainId: chainId });

        if (!setting) {
            setting = {
                blockNumber: config.contracts[chainId]?.SpaceFactory?.startBlock,
                chainId: chainId
            };
            await SettingModel.create(setting);
        }
    },

    syncData: async function (chainId) {
        var that = this;
        try {

            const setting = await SettingModel.findOne({ chainId: chainId });
            let lastBlockNumber = setting?.blockNumber || config.contracts[chainId]?.SpaceFactory?.startBlock;

            const rpc = getNodeUrl(chainId);
            const provider = new ethers.providers.JsonRpcProvider(rpc);
            var currentBlockNumber = await provider.getBlockNumber();
            currentBlockNumber = Math.min(lastBlockNumber+10000, currentBlockNumber);
            if (currentBlockNumber > lastBlockNumber) {
                console.log(`--(${config.contracts[chainId]?.network})--  *** Syncing Block ***  ${lastBlockNumber} - ${currentBlockNumber - 1}`);

                const spaceFactoryContract = new ethers.Contract(config.contracts[chainId]?.SpaceFactory?.address, getContractABI('SpaceFactory'), provider);
                const create_events = await spaceFactoryContract.queryFilter(spaceFactoryContract.filters.SpaceCreated(), lastBlockNumber, currentBlockNumber - 1);
                const events = that.sortByBlockNumber(create_events);
                for (let index = 0; index < events.length; index++) {
                    const event = events[index];
                    const args = event.args;
                    if (event.removed) {
                    } else {
                        if (event.event == 'SpaceCreated') {
                            const spaceId = args.spaceId;
                            const id = `${chainId}-${spaceId}`
                            const powerToken = args.powerToken.toString().toLowerCase();

                            var symbol = config.contracts[chainId]?.symbol;
                            var decimals = 18;
                            if (powerToken !== '0x0000000000000000000000000000000000000000') {
                                const powerTokenContract = new ethers.Contract(powerToken, getContractABI('Token'), provider);
                                symbol = await powerTokenContract.symbol();
                                decimals = await powerTokenContract.decimals();
                            }

                            const blockNumber = event.blockNumber;
                            const blockData = await provider.getBlock(blockNumber);

                            console.log(`--(${config.contracts[chainId]?.network})--  *** New Space Created ***  ${blockNumber}`);

                            await Space.findOneAndUpdate({ id: id }, {
                                id: id,
                                spaceId: spaceId,
                                chainId: chainId,
                                timestamp: blockData.timestamp,
                                logo: args.logo,
                                name: args.name,
                                about: args.about,
                                category: args.category,
                                creator: args.creator.toString().toLowerCase(),
                                socialMetadata: args.socialMetadata,
                                powerToken: {
                                    address: powerToken,
                                    symbol: symbol,
                                    decimals: decimals
                                },
                                createLimit: ethers.utils.formatUnits(args.createLimit, decimals)
                            }, { new: true, upsert: true })

                            setting.blockNumber = blockNumber;
                            await setting.save();
                        }
                    }
                }

                setting.blockNumber = currentBlockNumber;
                await setting.save();
            }

        }
        catch (ex) {
            console.log(ex);
        }
    },

    sortByBlockNumber: function (events) {
        return (events || []).sort((a, b) => a.blockNumber - b.blockNumber);
    },

    init: async function (chainArray) {
        await this.initCategory();
        for (let index = 0; index < chainArray.length; index++) {
            const chainId = chainArray[index];
            await this.initSetting(chainId);
        }       
    },

    sync_data: async function (chainId, timeInterval) {
        while (1) {
            await this.syncData(chainId);
            await sleep(timeInterval);
        }
    },
}

module.exports = sync;
