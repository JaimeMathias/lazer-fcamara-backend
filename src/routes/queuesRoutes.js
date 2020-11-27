import { Router } from 'express';
const QueueController = require('../controllers/QueueController');
const AuthController = require('../controllers/AuthController')
const MiddlewareController = require('../controllers/MiddlewareController')

const queuesRoutes = Router();

// Criar as rotas abaixo

queuesRoutes.get('/' ,QueueController.queueData)
queuesRoutes.get('/polling', AuthController.Auth, QueueController.polling, MiddlewareController.notification)
queuesRoutes.put('/', AuthController.Auth ,QueueController.store)
queuesRoutes.put('/sair', AuthController.Auth ,QueueController.quit)

export default queuesRoutes;
