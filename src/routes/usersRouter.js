import { Router } from 'express';
const Services = require('../services/users')
const usersRouter = Router();

usersRouter.get('/', Services.UsersGetAll);


export default usersRouter;
