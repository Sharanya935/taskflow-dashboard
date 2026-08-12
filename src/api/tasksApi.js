const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * NOTE: JSONPlaceholder is a mock API. POST/PATCH/DELETE requests
 * return a "successful" response but nothing is actually persisted
 * on the server. We still call the endpoints (per the assignment
 * requirements) but the React state in the components is treated
 * as the real source of truth.
 */

export async function fetchTasks(limit = 10) {
  const res = await fetch(`${BASE_URL}/todos?_limit=${limit}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch tasks (status ${res.status})`)
  }
  return res.json()
}

export async function fetchTaskById(id) {
  const res = await fetch(`${BASE_URL}/todos/${id}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch task ${id} (status ${res.status})`)
  }
  return res.json()
}

export async function createTask(title) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      completed: false,
      userId: 1,
    }),
  })
  if (!res.ok) {
    throw new Error(`Failed to create task (status ${res.status})`)
  }
  return res.json()
}

export async function updateTask(id, updates) {
  if (Number(id) > 200) {
    return { id: Number(id), ...updates }
  }
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) {
    throw new Error(`Failed to update task ${id} (status ${res.status})`)
  }
  return res.json()
}

export async function deleteTask(id) {
  if (Number(id) > 200) {
    return true
  }
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error(`Failed to delete task ${id} (status ${res.status})`)
  }
  return true
}
