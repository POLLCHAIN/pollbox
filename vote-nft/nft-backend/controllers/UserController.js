var jwt = require('jsonwebtoken');
var ethSignUtil = require('eth-sig-util');
var ethereumjsUtil = require('ethereumjs-util');

const config = require('../config')
const BaseController = require('./BaseController');
const User = require("../models/user.model");

module.exports = BaseController.extend({
    name: 'UserController',

    login: async function (req, res, next) {
        let { address, signature } = req.body;
        if (!address || !signature) {
            return res.status(400).send({ error: 'invalid params' })
        }

        address = address.toLowerCase().trim();

        var user = await User.findOne({ address: address });
        if (!user) {
            return res
                .status(401)
                .send({ error: 'Signature verification failed' });
        }

        const msg = `I am signing my one-time nonce: ${user.nonce}`;

        const msgBufferHex = ethereumjsUtil.bufferToHex(Buffer.from(msg, 'utf8'));
        const publicAddress = ethSignUtil.recoverPersonalSignature({
            data: msgBufferHex,
            sig: signature,
        });

        // The signature verification is successful if the address found with
        // ecrecover matches the initial publicAddress
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            user.nonce = Math.floor(Math.random() * 1000000);
            user.last_login = new Date();
            await user.save();

            var token = jwt.sign({ data: user.address }, config.secret, { expiresIn: '43200m' }); // expireIn 1month
            return res
                .status(200)
                .send({ token: token });
        } else {
            return res
                .status(401)
                .send({ error: 'Signature verification failed' });
        }

    },

    get: async function (req, res, next) {
        if (!req.params.address) return res.status(400).send("No address")
        let userAddress = req.params.address.toLowerCase();
        User.findOne(
            { address: userAddress },
            { _id: 0, __v: 0 }
        ).lean().exec(async function (err, user) {
            if (err) return res.status(500).send({ message: err.message });
            if (!user) {
                const newUser = new User({
                    address: userAddress,
                    nonce: Math.floor(Math.random() * 1000000)
                })
                await newUser.save();                
                return res.status(200).send({ user: newUser })
            }
            return res.status(200).send({ user: user })
        })
    },
});
