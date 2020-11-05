import { Router } from 'express';
const Services = require('../services/users')
const Delete = require('../services/delete')
const usersRouter = Router();

usersRouter.get('/', Services.UsersGetAll);
usersRouter.get('/delete/:id', Delete.DeleteById);


export default usersRouter;
