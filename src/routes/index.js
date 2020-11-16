import Router from 'express';

import usersRouter from "./usersRouter";
import authsRouter from "./authRoutes";
import filialsRouter from './filialsRoutes';

const bodyParser = require('body-parser');

const routes = Router();

routes.use(bodyParser.urlencoded({extended:true}))

routes.use('/api/users', usersRouter);

routes.use('/api/auth', authsRouter);

routes.use ('/api/filials', filialsRouter);

export default routes;
