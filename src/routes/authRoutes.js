import { Router } from 'express';

import QueueController from '../controllers/QueueController';

const AuthController = require('../controllers/AuthController')

const authRouter = Router();

authRouter.get('/' ,AuthController.validate);
authRouter.post('/', AuthController.login);
authRouter.delete('/', AuthController.Destroy);


export default authRouter;
