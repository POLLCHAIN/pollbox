const fs = require('fs');
const ethers = require('ethers');
const BaseController = require("./BaseController");
const Space = require("../models/space.model");
const Proposal = require("../models/proposal.model");
const Vote = require("../models/vote.model");
const Comment = require("../models/comment.model");
const Category = require("../models/category.model");

const getNodeUrl = require('../config/nodes');
const TokenAbi = JSON.parse(fs.readFileSync(`./abis/Token.json`));

module.exports = BaseController.extend({
  name: "ApiController",

  getSpaces: async function (req, res, next) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 20;
    delete req.query.limit;

    const page = req.query.page && parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    delete req.query.page;

    let skip = (page - 1) * limit;

    let chainId = req.query.chainId;
    if (chainId) {
      req.query.chainId = Number(chainId);
    }

    let searchTxt = req.query.searchTxt;
    delete req.query.searchTxt;

    if (searchTxt) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(searchTxt);
      req.query.name = { $regex: searchRgx, $options: "i" };
    }

    let creator = req.query.creator;
    if (creator) {
      req.query.creator = creator.toLowerCase();
    }

    let category = req.query.category;
    if (category && category === 'All') {
      delete req.query.category;      
    }

    const sortBy = req.query.sortBy;
    delete req.query.sortBy;
    let sort;
    if (sortBy === "timestamp") {
      sort = { timestamp: -1 };
    } else {
      sort = { name: 1 };
    }

    Space.find(req.query, { __v: 0, _id: 0 })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec(async function (err, spaces) {
        if (err) return res.status(500).send({ message: err.message });
        if (spaces && spaces.length > 0) {
          for (let i = 0; i < spaces.length; i++) {
            let space = spaces[i];

            // total members
            const totalQuery = [
              {
                $match: {
                  'spaceId': space.id
                }
              },
              {
                $group: {
                  _id: `$address`,
                  power: {
                    $sum: '$power'
                  },
                  vote: {
                    $sum: 1
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  totalVoter: {
                    $sum: 1
                  },
                  totalPower: {
                    $sum: '$power'
                  },
                  totalVoteNum: {
                    $sum: '$vote'
                  }
                }
              }
            ];
            space.totalVoters = 0;
            space.totalPower = 0;
            space.totalVoteNum = 0;
            const votes = await Vote.aggregate(totalQuery);
            if (votes.length > 0) {
              space.totalVoters = votes[0].totalVoter;
              space.totalPower = votes[0].totalPower;
              space.totalVoteNum = votes[0].totalVoteNum;
            }
          }
        }
        Space.countDocuments(req.query, function (err2, count) {
          if (err2) return res.status(500).send({ message: err2.message });
          return res.status(200).send({ spaces: spaces ? spaces : [], count: count });
        });
      });
  },

  getProposals: async function (req, res, next) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 20;
    delete req.query.limit;

    const page = req.query.page && parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    delete req.query.page;

    let skip = (page - 1) * limit;

    let creator = req.query.creator;
    if (creator) {
      req.query.creator = creator.toLowerCase();
    }

    let searchTxt = req.query.searchTxt;
    delete req.query.searchTxt;

    if (searchTxt) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(searchTxt);
      req.query.title = { $regex: searchRgx, $options: "i" };
    }

    const sortBy = req.query.sortBy;
    delete req.query.sortBy;
    let sort;
    if (sortBy === "end") {
      sort = { endTime: 1 };
    } else if (sortBy === "timestamp") {
      sort = { timestamp: -1 };
    } else if (sortBy === "power") {
      sort = { totalPower: -1 };
    } else {
      sort = { title: 1 };
    }

    var type = req.query.type;
    delete req.query.type;

    const currentTimeStamp = Math.floor(Date.now() / 1000);

    if (type == "active") {
      req.query.endTime = { $gt: currentTimeStamp };
    } else if (type == "ended") {
      req.query.endTime = { $lt: currentTimeStamp };
    }

    Proposal.find(req.query, { __v: 0, _id: 0 })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec(async function (err, proposals) {
        if (err) return res.status(500).send({ message: err.message });
        if (proposals && proposals.length > 0) {
          for (let i = 0; i < proposals.length; i++) {
            let proposal = proposals[i];
            let voteSummary = [];
            const choices = proposal.choices;
            for (let index = 0; index < choices.length; index++) {
              const choice = choices[index];
              const voteQuery = [
                {
                  $match: {
                    'proposalId': proposal.id,
                    'choice': choice
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalPower: {
                      $sum: '$power'
                    },
                    totalCount: {
                      $sum: 1
                    }
                  }
                }
              ];
              const voteResult = await Vote.aggregate(voteQuery);
              let totalPower = 0.0;
              if (voteResult && voteResult?.length > 0) {
                totalPower = voteResult[0].totalPower;
              }
              voteSummary.push({
                choice: choice,
                totalPower: totalPower
              });
            }
            proposal.voteSummary = voteSummary;

            // total comments
            const commentQuery = [
              {
                $match: {
                  'proposalId': proposal.id
                }
              },
              {
                $group: {
                  _id: null,
                  totalCount: {
                    $sum: 1
                  }
                }
              }
            ];
            const commentResult = await Comment.aggregate(commentQuery);
            let totalComments = 0;
            if (commentResult && commentResult?.length > 0) {
              totalComments = commentResult[0].totalCount;
            }
            proposal.totalComments = totalComments;
          }
        }
        Proposal.countDocuments(req.query, function (err2, count) {
          if (err2) return res.status(500).send({ message: err2.message });
          return res.status(200).send({ proposals: proposals ? proposals : [], count: count });
        });
      });
  },

  hotProposals: async function (req, res, next) {  
    const hotQuery = [
      {
        $group: {
          _id: `$proposalId`,
          totalVoters: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          sum: -1
        }
      },
      {
        $limit: 3
      }
    ];
    let ret = [];
    const hots = await Vote.aggregate(hotQuery);
    if (hots && hots?.length > 0) {
      for (let index = 0; index < hots.length; index++) {
        let hot = hots[index];
        var proposal = await Proposal.findOne({ id: hot._id }, { __v: 0, _id: 0 }).lean();
        let voteSummary = [];
        const choices = proposal.choices;
        for (let index = 0; index < choices.length; index++) {
          const choice = choices[index];
          const voteQuery = [
            {
              $match: {
                'proposalId': proposal.id,
                'choice': choice
              }
            },
            {
              $group: {
                _id: null,
                totalPower: {
                  $sum: '$power'
                },
                totalCount: {
                  $sum: 1
                }
              }
            }
          ];
          const voteResult = await Vote.aggregate(voteQuery);
          let totalPower = 0.0;
          if (voteResult && voteResult?.length > 0) {
            totalPower = voteResult[0].totalPower;
          }
          voteSummary.push({
            choice: choice,
            totalPower: totalPower
          });
        }
        proposal.voteSummary = voteSummary;

        // total comments
        const commentQuery = [
          {
            $match: {
              'proposalId': proposal.id
            }
          },
          {
            $group: {
              _id: null,
              totalCount: {
                $sum: 1
              }
            }
          }
        ];
        const commentResult = await Comment.aggregate(commentQuery);
        let totalComments = 0;
        if (commentResult && commentResult?.length > 0) {
          totalComments = commentResult[0].totalCount;
        }
        proposal.totalComments = totalComments;

        // set spaceInfo
        var spaceEntity = await Space.findOne({ id: proposal.spaceId });
        proposal.spaceInfo = spaceEntity;
        ret.push(proposal)
      }
    }
    return res.status(200).send({ proposals: ret });
  },

  getVotes: async function (req, res, next) {

    let limit = req.query.limit ? parseInt(req.query.limit) : 20;
    delete req.query.limit;

    const page = req.query.page && parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    delete req.query.page;

    let skip = (page - 1) * limit;

    if (req.query.address) {
      req.query.address = req.query.address.toLowerCase();
    }

    let sort = { timestamp: -1 };
    if (req.query.proposalId) {
      sort = { power: -1 };
    }

    Vote.find(req.query, { __v: 0, _id: 0 })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec(async function (err, votes) {
        if (err) return res.status(500).send({ message: err.message });
        Vote.countDocuments(req.query, function (err2, count) {
          if (err2) return res.status(500).send({ message: err2.message });
          return res.status(200).send({ votes: votes ? votes : [], count: count });
        });
      });
  },

  getComments: async function (req, res, next) {

    let limit = req.query.limit ? parseInt(req.query.limit) : 20;
    delete req.query.limit;

    const page = req.query.page && parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    delete req.query.page;

    let skip = (page - 1) * limit;

    if (req.query.address) {
      req.query.address = req.query.address.toLowerCase();
    }

    Comment.find(req.query, { __v: 0, _id: 0 })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec(async function (err, comments) {
        if (err) return res.status(500).send({ message: err.message });
        Comment.countDocuments(req.query, function (err2, count) {
          if (err2) return res.status(500).send({ message: err2.message });
          return res.status(200).send({ comments: comments ? comments : [], count: count });
        });
      });
  },

  getCategories: async function(req, res, next) {
    Category.find({}, {_id: 0, __v: 0}, async (err, items) => {
      if (err) return res.status(500).send({message: err.message});
      if (!items) return res.status(404).send({message: "No item found"})

      res.status(200).send({categories: items})
    })
  },

  spaceDetail: async function (req, res) {
    if (!req.params.id)
      return res.status(400).send("missing params");

    Space.findOne(
      { id: req.params.id },
      { __v: 0, _id: 0 }
    )
      .lean()
      .exec(async function (err, space) {
        if (err) return res.status(500).send({ message: err.message });
        if (!space) return res.status(404).send({ message: "No Space found" });

        const currentTimeStamp = Math.floor(Date.now() / 1000);

        const totalActiveProposals = await Proposal.countDocuments({
          spaceId: space.id,
          endTime: { $gt: currentTimeStamp }
        });

        const totalEndProposals = await Proposal.countDocuments({
          spaceId: space.id,
          endTime: { $lt: currentTimeStamp }
        });

        const totalQuery = [
          {
            $match: {
              'spaceId': space.id
            }
          },          
          {
            $group: {
              _id: '$address',
              power: {
                $sum: '$power'
              }
            }
          },
          {
            $group: {
              _id: null,
              totalVoter: {
                $sum: 1
              },
              totalPower: {
                $sum: '$power'
              }
            }
          }
        ];

        var totalVoter = 0;
        var totalPower = 0;
        const votes = await Vote.aggregate(totalQuery);
        if (votes.length > 0) {
          totalVoter = votes[0].totalVoter;
          totalPower = votes[0].totalPower;
        }
        const overview = {
          totalActiveProposals: totalActiveProposals,
          totalEndProposals: totalEndProposals,
          totalVoter: totalVoter,
          totalPower: totalPower
        }
        space.overview = overview;
        return res.status(200).send({ space: space });
      });
  },

  proposalDetail: async function (req, res) {
    if (!req.params.id)
      return res.status(400).send("missing params");

    Proposal.findOne(
      { id: req.params.id },
      { __v: 0, _id: 0 }
    )
      .lean()
      .exec(async function (err, proposal) {
        if (err) return res.status(500).send({ message: err.message });
        if (!proposal) return res.status(404).send({ message: "No Proposal found" });
        
        var spaceEntity = await Space.findOne({ id: proposal.spaceId });
        proposal.spaceInfo = spaceEntity;

        let voteSummary = [];
        const choices = proposal.choices;
        for (let index = 0; index < choices.length; index++) {
          const choice = choices[index];
          const voteQuery = [
            {
              $match: {
                'proposalId': proposal.id,
                'choice': choice
              }
            },
            {
              $group: {
                _id: null,
                totalPower: {
                  $sum: '$power'
                },
                totalCount: {
                  $sum: 1
                }
              }
            }
          ];
          const voteResult = await Vote.aggregate(voteQuery);
          let totalPower = 0.0;
          if (voteResult && voteResult?.length > 0) {
            totalPower = voteResult[0].totalPower;
          }
          voteSummary.push({
            choice: choice,
            totalPower: totalPower
          });
        }
        proposal.voteSummary = voteSummary;

        // total comments
        const commentQuery = [
          {
            $match: {
              'proposalId': proposal.id
            }
          },
          {
            $group: {
              _id: null,
              totalCount: {
                $sum: 1
              }
            }
          }
        ];
        const commentResult = await Comment.aggregate(commentQuery);
        let totalComments = 0;
        if (commentResult && commentResult?.length > 0) {
          totalComments = commentResult[0].totalCount;
        }
        proposal.totalComments = totalComments;

        // total voters
        const voterQuery = [
          {
            $match: {
              'proposalId': proposal.id
            }
          },
          {
            $group: {
              _id: `$address`
            }
          },
          {
            $group: {
              _id: null,
              totalCount: {
                $sum: 1
              }
            }
          }
        ];
        const voterResult = await Vote.aggregate(voterQuery);
        let totalVoters = 0;
        if (voterResult && voterResult?.length > 0) {
          totalVoters = voterResult[0].totalCount;
        }
        proposal.totalVoters = totalVoters;
        return res.status(200).send({ proposal: proposal });
      });
  },

  createProposal: async function (req, res, next) {
    if (!req.body.spaceId || !req.body.address || !req.body.title || !req.body.description || !req.body.choices || !req.body.endTime)
      return res.status(400).send("missing param");

    const spaceId = req.body.spaceId;
    const address = req.body.address.toLowerCase();
    const title = req.body.title;
    const description = req.body.description;
    const endTime = req.body.endTime;
    const choices = JSON.parse(req.body.choices);
    const overview = req.body.overview || "";

    if (req.user.address !== address) {
      return res.status(404).send({ message: "invalid address!" });
    }

    var spaceEntity = await Space.findOne({ id: spaceId });
    if (!spaceEntity) {
      return res.status(404).send({ message: "invalid space id" });
    }

    if (choices.length < 2 ) {
      return res.status(404).send({ message: "invalid choices" });
    }

    const rpc = getNodeUrl(spaceEntity.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rpc);

    const tokenContract = new ethers.Contract(spaceEntity.powerToken.address, TokenAbi, provider);
    const balance = await tokenContract.balanceOf(address);    
    const balanceUnits = ethers.utils.formatUnits(balance, spaceEntity.powerToken.decimals);
    if (Number(balanceUnits) < spaceEntity.createLimit) {
      return res.status(404).send({ message: `You need to have a minimum of ${spaceEntity.createLimit} ${spaceEntity.powerToken.symbol} in order to submit a proposal.` });
    }
 
    const currentTimeStamp = Math.floor(Date.now() / 1000);

    const newProposalEntity = new Proposal({
      id: `${spaceId}-${currentTimeStamp}`,
      timestamp: currentTimeStamp,
      spaceId: spaceId,
      creator: address,
      title: title,
      description: description,
      overview: overview,
      choices: choices,
      endTime: endTime,
      totalPower: 0
    })
    await newProposalEntity.save();
    return res.status(200).send({ message: 'Success!' });
  },

  createVote: async function (req, res, next) {
    console.log('body:', req.body);
    if (!req.body.proposalId || !req.body.choice || !req.body.address)
      return res.status(400).send("missing param");

    const proposalId = req.body.proposalId;
    const choice = req.body.choice;
    const address = req.body.address.toLowerCase();
    const message = req.body.message || '';

    if (req.user.address !== address) {
      return res.status(404).send({ message: "invalid address!" });
    }

    var proposalEntity = await Proposal.findOne({ id: proposalId });
    if (!proposalEntity) {
      return res.status(404).send({ message: "invalid Proposal id" });
    }

    const currentDate = Date.now() / 1000;
    if (currentDate > proposalEntity.endTime) {
      return res.status(404).send({ message: "Proposal is ended!" });
    }

    const choices = proposalEntity.choices;
    if (!choices.includes(choice)) {
      return res.status(404).send({ message: "invalid choice" });
    }

    var voteEntity = await Vote.findOne({ proposalId: proposalId, address: address });
    if (voteEntity) {
      return res.status(400).send({ message: "already voted" });
    }

    var spaceEntity = await Space.findOne({ id: proposalEntity.spaceId });

    const rpc = getNodeUrl(spaceEntity.chainId);
    const provider = new ethers.providers.JsonRpcProvider(rpc);

    const tokenContract = new ethers.Contract(spaceEntity.powerToken.address, TokenAbi, provider);
    const balance = await tokenContract.balanceOf(address);
    const power = ethers.utils.formatUnits(balance, spaceEntity.powerToken.decimals);

    if (Number(power) <= 0) {
      return res.status(404).send({ message: `You do not own ${spaceEntity.powerToken.symbol} token` });
    }
    proposalEntity.totalPower = proposalEntity.totalPower + Number(power);
    await proposalEntity.save();

    const currentTimeStamp = Math.floor(Date.now() / 1000);

    const newVoteEntity = new Vote({
      id: `${proposalId}-${address}`,
      timestamp: currentTimeStamp,
      spaceId: proposalEntity.spaceId,
      proposalId: proposalId,
      address: address,
      power: power,
      choice: choice
    })
    await newVoteEntity.save();

    if (message) {
      const newCommentEntity = new Comment({
        id: `${proposalId}-${address}`,
        timestamp: currentTimeStamp,
        spaceId: proposalEntity.spaceId,
        proposalId: proposalId,
        address: address,
        message: message
      })
      await newCommentEntity.save();
    }
    return res.status(200).send({ message: "Success!" });
  },
});

