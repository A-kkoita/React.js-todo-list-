import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../data/tasks.json');

const router = express.Router();

// READ TASKS
function readTasks() {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
}

// WRITE TASKS
function writeTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}


//  GET ALL TASKS
router.get('/', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});


// CREATE TASK

router.post('/', (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
    };

    const tasks = readTasks();
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});


//    DELETE TASK

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const tasks = readTasks();

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(index, 1);
    writeTasks(tasks);

    res.status(200).json({ message: 'Task deleted successfully' });
});


// TOGGLE TASK (PATCH)

router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const tasks = readTasks();

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;

    writeTasks(tasks);

    res.json(task);
});


//UPDATE TASK (PUT)

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const tasks = readTasks();

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    if (title !== undefined) {
        tasks[index].title = title.trim();
    }
    if (completed !== undefined) {
        tasks[index].completed = completed;
    }
    writeTasks(tasks);
    res.json(tasks[index]);
});

export default router;