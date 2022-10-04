import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import tokenAuth from '../middlewares/tokenAuth';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getMatches);
router.post('/', tokenAuth, matchController.createMatch);

export default router;
