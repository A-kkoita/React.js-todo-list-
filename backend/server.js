import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import taskrouter from './routes/tasks.js';
import { connectDB } from './config/db.js';


const app = express();

const PORT = 4000;

app.use(express.json());
app.use(cors({origin:' http://localhost:5173', credentials: true}));

app.use(
  session({
    secret: 'task-manager-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://aishakhaitoukoita_db_user:XjXL0njpdUayI6Ep@cluster0.5ywiv4i.mongodb.net/task-manager'}),
    cookie:{httpOnly: true, maxAge: 1000 * 60 * 60 *24}
  })
)

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