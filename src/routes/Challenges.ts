const { Router } = require("express");
const ChallengeController = require('../controllers/ChallengesController');


const router = Router();

router.get('/challenge/:id', ChallengeController.loadPage);
router.get('/listChallenges', ChallengeController.listChallenges);

export default router;