//SERVER.JS
import express from 'express';
import cors from 'cors';
import taskrouter from './routes/tasks.js';

const PORT =  5000
const app = express();

app.use(express.json());

app.use(cors());


app.use('/api/tasks', taskrouter)



app.listen(PORT, ()=> console.log(`server running on ${PORT}`))

