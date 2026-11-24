import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { validate } from '../middleware/validate.middleware';
import { registerZSchema, loginZSchema } from '../models/users';
import { authenticateJWT } from '../middleware/auth.middleware';
 

const router = Router();
const authController = new AuthController();

//REGISTER ROUTE
router.post('/register', validate(registerZSchema), authController.register);

//LOGIN ROUTE
router.post('/login', validate(loginZSchema), authController.login);

router.get('/me', authenticateJWT, authController.me);


export default router;
