import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getTeams);

export default router;
