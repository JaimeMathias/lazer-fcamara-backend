import { Router } from 'express';
const PlatformsController = require('../controllers/PlatformsController');

const platformsRouter = Router();

platformsRouter.post('/', PlatformsController.store);
platformsRouter.get('/', PlatformsController.indexAll);
platformsRouter.get('/:id', PlatformsController.index);
platformsRouter.put('/:id', PlatformsController.update);
platformsRouter.delete('/:id', PlatformsController.remove);

export default platformsRouter;
