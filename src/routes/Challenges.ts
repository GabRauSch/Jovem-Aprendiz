const { Router } = require("express");
const ChallengeController = require('../controllers/ChallengesController');

const router = Router();

router.get('/pages/:id', ChallengeController.loadPage);

export default router;