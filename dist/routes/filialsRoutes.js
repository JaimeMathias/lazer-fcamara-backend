"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

const FiliaisController = require('../controllers/FiliaisController')
const filialsRouter = _express.Router.call(void 0, );

filialsRouter.post('/', FiliaisController.store);

exports. default = filialsRouter;
