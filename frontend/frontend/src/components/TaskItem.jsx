import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.title);

  const handleSave = () => {
    if (!text.trim()) return;
    onEdit(task.id, text);
    setEditing(false);
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSave();

    if (e.key === "Escape") {
      setText(task.title);   // reset text
      setEditing(false);
    }
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {editing ? (
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}   
          autoFocus                   
        />
      ) : (
        <span className="task-text">{task.title}</span>
      )}

      {editing ? (
        <button onClick={handleSave} className="save-btn">Save</button>
      ) : (
        <button onClick={() => setEditing(true)} className="update-btn">Edit</button>
      )}

      <button
        onClick={() => onDelete(task.id)}
        className="delete-btn"

      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;