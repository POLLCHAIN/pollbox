const express = require('express');
const router = express.Router();

const user_controller = require('./controllers/UserController');
const api_controller = require('./controllers/ApiController');


/**
 *  User Management
 */

router.post('/api/login', (req, res, next) => {
    user_controller.login(req, res, next);
});
router.get("/api/user_info/:address", (req, res, next) => {
    user_controller.get(req, res, next);
});


/**
 *  Voting Management
 */
router.get("/api/spaces", (req, res, next) => {
  api_controller.getSpaces(req, res, next);
});

router.get("/api/proposals", (req, res, next) => {
  api_controller.getProposals(req, res, next);
});

router.get("/api/hot-proposals", (req, res, next) => {
  api_controller.hotProposals(req, res, next);
});

router.get("/api/votes", (req, res, next) => {
  api_controller.getVotes(req, res, next);
});

router.get("/api/comments", (req, res, next) => {
  api_controller.getComments(req, res, next);
});

router.get("/api/categories", async (req, res, next) => {
  api_controller.getCategories(req, res, next)
})


router.get("/api/space/detail/:id", async (req, res, next) => {
  api_controller.spaceDetail(req, res, next)
});

router.get("/api/proposal/detail/:id", async (req, res, next) => {
  api_controller.proposalDetail(req, res, next)
});


router.post("/api/proposal/create", [api_controller.authenticateToken], (req, res, next) => {
  api_controller.createProposal(req, res, next)
});
router.post("/api/vote/create", [api_controller.authenticateToken], (req, res, next) => {
  api_controller.createVote(req, res, next)
});



module.exports = router;
