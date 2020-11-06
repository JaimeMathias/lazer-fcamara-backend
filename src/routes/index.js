import Router from 'express';

import usersRouter from "./usersRouter";

const bodyParser = require('body-parser');

const routes = Router();

routes.use(bodyParser.urlencoded({extended:true}))

routes.use('/api/users', usersRouter);

export default routes;
