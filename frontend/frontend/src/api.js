const BASE = 'http://localhost:5000/api/tasks';

// FETCH TASKS
export async function getTasks() {
  const res = await fetch(BASE);
  return res.json();
}

// CREATE TASK
export async function createTask(title) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
}

// TOGGLE TASK
export async function toggle(id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
  });

  return res.json();
}

// UPDATE TASK
export async function UpdateTask(id, title) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
}

// DELETE TASK
export async function deleteTask(id) {
  await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
  });
}