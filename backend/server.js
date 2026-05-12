import express from 'express';
import cors from 'cors';

import taskrouter from './routes/tasks.js';
import { connectDB } from './config/db.js';


const app = express();

const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskrouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });