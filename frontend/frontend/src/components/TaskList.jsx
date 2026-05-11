import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <div className="page">
    <ul className="task-list">
      {tasks.map((tasks) => (
        <TaskItem key={tasks.id} task={tasks} onToggle={onToggle} onDelete={onDelete}  onEdit={onEdit}/>
      ))}
    </ul>
    </div>
  );
}

export default TaskList;