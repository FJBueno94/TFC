import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeamById);

export default router;
