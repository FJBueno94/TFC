import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Validation from '../middlewares/validation';
import tokenAuth from '../middlewares/tokenAuth';

const router = Router();

const userController = new UserController();

router.post(
  '/',
  Validation.loginValidation,
  userController.login,
);
router.get('/validate', tokenAuth, userController.getUser);

export default router;
