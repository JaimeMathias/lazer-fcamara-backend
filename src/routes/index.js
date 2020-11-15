import Router from 'express';

import usersRouter from "./usersRouter";
import authsRouter from "./authRoutes";

const bodyParser = require('body-parser');

const routes = Router();

routes.use(bodyParser.urlencoded({extended:true}))

routes.use('/api/users', usersRouter);

routes.use('/api/auth', authsRouter);

export default routes;
