import { Router } from 'express';

const FiliaisController = require('../controllers/FiliaisController')
const filialsRouter = Router();

filialsRouter.post('/', FiliaisController.store);

export default filialsRouter;
