import Router from 'express';

import usersRouter from "./usersRouter";
import authsRouter from "./authRoutes";
import filialsRouter from './filialsRoutes';
import platformsRouter from './platformsRoutes';
import queuesRoutes from './queuesRoutes'
import validationRoutes from './validationRoutes'

const bodyParser = require('body-parser');

const routes = Router();

routes.use(bodyParser.urlencoded({extended:true}))

routes.use('/api/users', usersRouter);

routes.use('/api/auth', authsRouter);

routes.use('/api/filials', filialsRouter);

routes.use('/api/platforms', platformsRouter);

routes.use('/api/queues', queuesRoutes)

routes.use('/api/validation', validationRoutes)

export default routes;







