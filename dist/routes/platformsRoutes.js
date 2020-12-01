"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
const PlatformsController = require('../controllers/PlatformsController');

const platformsRouter = _express.Router.call(void 0, );

platformsRouter.post('/', PlatformsController.store);
platformsRouter.get('/', PlatformsController.indexAll);
platformsRouter.get('/:id', PlatformsController.index);
platformsRouter.put('/:id', PlatformsController.update);
platformsRouter.delete('/:id', PlatformsController.remove);

exports. default = platformsRouter;
