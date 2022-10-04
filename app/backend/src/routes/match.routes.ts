import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import tokenAuth from '../middlewares/tokenAuth';
import Validation from '../middlewares/validation';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getMatches);
router.post('/', tokenAuth, Validation.matchValidation, matchController.createMatch);
router.patch('/:id/finish', tokenAuth, matchController.finishMatch);
router.patch('/:id', tokenAuth, matchController.updateMatch);

export default router;
