import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.getHomeMatches);
router.get('/away', leaderboardController.getAwayMatches);

export default router;
