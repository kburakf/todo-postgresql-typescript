import express, { json } from 'express';
import cors from 'cors';

const app = express();

import indexRouters from './routes/';

app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouters);

app.listen(3000, () => console.log('running on port: 3000'));