import { Router } from 'express';
const Services = require('../services/users')
const Delete = require('../services/delete')
const Update = require('../services/update')
const Create = require('../services/create')

const usersRouter = Router();

usersRouter.get('/', Services.UsersGetAll);
usersRouter.delete('/delete/:id', Delete.DeleteById);
usersRouter.put('/update/:id', Update.UpdateById);
usersRouter.post('/create', Create.Create);


export default usersRouter;
