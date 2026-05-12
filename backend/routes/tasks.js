import express from 'express';
import { getTasks, createTasks, toogleTask, updateTask, deleteTask } from "../controllers/taskController.js"
const router = express.Router();

//READ TASKS
router.get('/', getTasks)

// CREATE TASKS
router.post('/', createTasks)

//TOOGLE TASK
router.patch('/:id', toogleTask)

//UPDATE TASK
router.put('/:id', updateTask)

//    DELETE TASK
router.delete("/:id", deleteTask)

export default router;