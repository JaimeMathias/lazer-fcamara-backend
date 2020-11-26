
import { Router } from 'express';

const validationController = require('../controllers/validationController')
const validationRoutes = Router();

validationRoutes.post('/', validationController);

export default validationController;





