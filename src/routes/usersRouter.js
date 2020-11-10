import { Router } from 'express';
const Find = require('../services/find')
const Delete = require('../services/delete')
const Update = require('../services/update')
const Create = require('../services/create')

const usersRouter = Router();

uusersRouter.get('/', Find.FindAll);
usersRouter.get('/:id', Find.FindUnique);
usersRouter.delete('/delete/:id', Delete.DeleteById);
usersRouter.put('/update/:id', Update.UpdateById);
usersRouter.post('/create', Create.Create);


export default usersRouter;
