"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
const UsersController = require('../controllers/UsersController')
const AuthController = require('../controllers/AuthController')

const usersRouter = _express.Router.call(void 0, );

usersRouter.post('/', UsersController.store);
usersRouter.get('/' ,UsersController.indexAll);
usersRouter.get('/:id', AuthController.Auth , UsersController.index);
usersRouter.put('/:id', AuthController.Auth, UsersController.update);
usersRouter.delete('/:id', AuthController.Auth, UsersController.remove);


exports. default = usersRouter;
