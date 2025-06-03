import express from 'express';
import { UserController } from './user.controllers';

const router = express.Router();

router.post('/sign-up', UserController.registerUser as express.RequestHandler);
router.post('/sign-in', UserController.loginUser as express.RequestHandler);

export const UserRouter = router;
