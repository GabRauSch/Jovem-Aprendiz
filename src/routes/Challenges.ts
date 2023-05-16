const { Router } = require("express");


import { loadPage, listChallenges} from "../controllers/ChallengesController";

const router = Router();

router.get('/challenge/:id', loadPage);

router.get('/listChallenges', listChallenges);

export default router;