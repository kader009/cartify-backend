import express from 'express';
import { UserController } from './user.controllers';
import validateRequest from '../../middleware/validationRequest';
import userValidation from './user.validation';

const router = express.Router();

router.post(
  '/sign-up',
  validateRequest(userValidation),
  UserController.registerUser as express.RequestHandler,
);
router.post(
  '/sign-in',
  validateRequest(userValidation),
  UserController.loginUser as express.RequestHandler,
);

export const UserRouter = router;
