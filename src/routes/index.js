import Router from 'express';

import usersRouter from "./usersRouter";
import authsRouter from "./authRoutes";
import filialsRouter from './filialsRoutes';
import rowsRouter from './rowsRoutes';
import platformsRouter from './platformsRoutes';

const bodyParser = require('body-parser');

const routes = Router();

routes.use(bodyParser.urlencoded({extended:true}))

routes.use('/api/users', usersRouter);

routes.use('/api/auth', authsRouter);

routes.use('/api/filials', filialsRouter);

routes.use('/api/platforms', platformsRouter);

export default routes;
