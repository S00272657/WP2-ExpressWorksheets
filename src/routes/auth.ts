import { Router } from 'express';
import { AuthController } from '../controllers/auth';

import { validate } from '../middleware/validate.middleware';

import { registerZSchema, loginZSchema } from '../models/users';
 
const router = Router();
const authController = new AuthController();

//REGISTER ROUTE
router.post('/register', validate(registerZSchema), authController.register);

//LOGIN ROUTE
router.post('/login', validate(loginZSchema), authController.login);

export default router;
