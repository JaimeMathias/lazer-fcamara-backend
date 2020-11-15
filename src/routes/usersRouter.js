import { Router } from 'express';

const UsersController = require('../controllers/UsersController')

const AuthController = require('../controllers/AuthController')

const usersRouter = Router();

usersRouter.get('/', AuthController.Auth ,UsersController.indexAll);
usersRouter.get('/:id', AuthController.Auth , UsersController.index);
usersRouter.delete('/delete/:id', AuthController.Auth, UsersController.remove);
usersRouter.put('/update/:id', AuthController.Auth, UsersController.update);
usersRouter.post('/create', UsersController.store);



export default usersRouter;

