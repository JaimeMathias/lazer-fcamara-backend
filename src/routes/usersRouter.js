import { Router } from 'express';
const UsersController = require('../controllers/UsersController')
const AuthController = require('../controllers/AuthController')

const usersRouter = Router();

usersRouter.post('/', UsersController.store);
usersRouter.get('/', AuthController.Auth ,UsersController.indexAll);
usersRouter.get('/:id', AuthController.Auth , UsersController.index);
usersRouter.put('/:id', AuthController.Auth, UsersController.update);
usersRouter.delete('/:id', AuthController.Auth, UsersController.remove);

export default usersRouter;
