import express from 'express';
import cors from 'cors'

import routes from './routes';

const app = express();

app.use(express.json());

cors({credentials: true, origin: true})

// app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
    next();
});

app.use(routes);

export default app;
