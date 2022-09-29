import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Validation from '../middlewares/validation';

const router = Router();

const userController = new UserController();

router.post(
  '/',
  Validation.loginValidation,
  userController.login,
);

export default router;
