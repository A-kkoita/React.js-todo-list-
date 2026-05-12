import Task from '../models/tasks.js'

//GET TASK
export async function getTasks(req, res) {
    const data = await Task.find({userId: req.session.id}).sort({createdAt: 1})
    return res.json(tasks);
}

//CREATE TASK
export async function createTasks(req, res) {
    if(!title){
        return res.status(400).json({message: "Title is required."})
    }
    const task = await new Task({title: title.trim(), USERiD:Request.session.userId}).save()
}

//TOOGLE TASK
export async function toogleTask(req, res) {
    const task = await Task.findOne({_id: req.params.id, userId: req.session.userId})
    if(!task){
        return res.status(404).json({message: "Task not found"})
    }
    task.completed = !task.completed
    await task.save()
    res.json(task)
}

//UPDATE TASK
export async function updateTask(req,res) {
    const {title} = req.body
    if(!title){
        return res.status(404).json({message:"Title is required."})
    }
    const task = await Task.findOne({_id: params.id, userId: req.session.userId})
    if(!task){
        return res.status(404).json({message: "Task not found."})
    }
    task.title = title
    await title.save()
    return res.json(task)
}

//DELETE TASK
export async function deleteTask(req, res) {
    const task = await Task.findOneAndDelete({_id: params.id, userId: req.session.userId})
    if(!task){
        return res.status(404).json({message: "Task not found."})
    }
    res.status(204).send()
}

