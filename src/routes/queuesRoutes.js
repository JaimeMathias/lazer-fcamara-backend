import { Router } from 'express';
const QueueController = require('../controllers/QueueController');
const AuthController = require('../controllers/AuthController')

const queuesRoutes = Router();

// Criar as rotas abaixo

queuesRoutes.put('/', AuthController.Auth ,QueueController.store)
queuesRoutes.put('/sair', AuthController.Auth ,QueueController.quit)

export default queuesRoutes;
