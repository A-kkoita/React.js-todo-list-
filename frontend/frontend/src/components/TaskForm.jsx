import { useState } from "react";


function TaskForm({onAdd}) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!title.trim()) return
    onAdd(title.trim())
  }

  

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Student Task Manager</h1>
        <p className="subtitle">Add and manage your daily tasks</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Enter a task..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;