import { Router } from 'express';

const AuthController = require('../controllers/AuthController')
const authRouter = Router();

authRouter.post('/', AuthController.login);
authRouter.delete('/', AuthController.Destroy);


export default authRouter;
