"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _QueueController = require('../controllers/QueueController'); var _QueueController2 = _interopRequireDefault(_QueueController);

const AuthController = require('../controllers/AuthController')

const authRouter = _express.Router.call(void 0, );

authRouter.get('/' ,AuthController.validate);
authRouter.post('/', AuthController.login);
authRouter.delete('/', AuthController.Destroy);


exports. default = authRouter;
