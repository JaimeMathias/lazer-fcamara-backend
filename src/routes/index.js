import Router from 'express';

import usersRouter from "./usersRouter";

const routes = Router();

routes.use('/api/users', usersRouter);

export default routes;
