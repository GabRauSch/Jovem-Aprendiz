const { Router } = require("express");

import { loadPage, listChallenges} from "../controllers/ChallengesController";
import { modelConsult } from "../controllers/WMSController";

const router = Router();

router.get('/challenge/:id', loadPage);
router.get('/listChallenges', listChallenges);
router.get('/WMSController', modelConsult);

export default router;