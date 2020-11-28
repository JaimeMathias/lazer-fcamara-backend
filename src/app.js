import express from 'express';
import cors from 'cors'

import routes from './routes';

const app = express();

app.use(express.json());

cors({credentials: true, origin: true})

app.use(cors())

app.use(routes);

export default app;
