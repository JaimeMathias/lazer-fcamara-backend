import { Router } from 'express';


const AuthController = require('../controllers/AuthController')

const authRouter = Router();

authRouter.get('/login', AuthController.login);


export default authRouter;
