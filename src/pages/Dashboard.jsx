import { useState } from 'react'
import AddTaskForm from '../components/AddTaskForm.jsx'
import TaskItem from '../components/TaskItem.jsx'
import { LoadingState, ErrorState, EmptyState } from '../components/StatusStates.jsx'
import { createTask, updateTask, deleteTask } from '../api/tasksApi.js'

function Dashboard({ tasks, setTasks, status, errorMessage, onRetry }) {
  const [updatingIds, setUpdatingIds] = useState(new Set())
  const [deletingIds, setDeletingIds] = useState(new Set())

  const completedCount = tasks.filter((t) => t.completed).length

  const startUpdating = (id) => {
    setUpdatingIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const stopUpdating = (id) => {
    setUpdatingIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const startDeleting = (id) => {
    setDeletingIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const stopDeleting = (id) => {
    setDeletingIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const handleAdd = async (title) => {
    try {
      const newTask = await createTask(title)
      // JSONPlaceholder always returns id: 201 for new todos, which would
      // collide across multiple adds. We generate a unique local id instead
      // so React state (our source of truth) stays consistent.
      const localTask = {
        ...newTask,
        id: Date.now(),
      }
      setTasks((prev) => [localTask, ...prev])
    } catch (err) {
      alert(err.message || 'Failed to add task.')
    }
  }

  const handleToggle = async (task) => {
    if (updatingIds.has(task.id) || deletingIds.has(task.id)) return
    startUpdating(task.id)
    const updated = { ...task, completed: !task.completed }
    // Optimistically update local state first
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)))
    try {
      await updateTask(task.id, { completed: updated.completed })
    } catch (err) {
      // Roll back on failure
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))
      alert(err.message || 'Failed to update task.')
    } finally {
      stopUpdating(task.id)
    }
  }

  const handleDelete = async (task) => {
    if (deletingIds.has(task.id) || updatingIds.has(task.id)) return
    startDeleting(task.id)
    const previousTasks = tasks
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
    try {
      await deleteTask(task.id)
    } catch (err) {
      setTasks(previousTasks)
      stopDeleting(task.id)
      alert(err.message || 'Failed to delete task.')
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
         <h1>📋 TaskFlow Dashboard</h1>
        <span className="completed-counter">
          {completedCount}/{tasks.length} completed
        </span>
      </header>

      <AddTaskForm onAdd={handleAdd} />

      <main className="dashboard-main">
        {status === 'loading' && <LoadingState />}
        {status === 'error' && (
          <ErrorState message={errorMessage} onRetry={onRetry} />
        )}
        {status === 'success' && tasks.length === 0 && <EmptyState />}
        {status === 'success' && tasks.length > 0 && (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
                isUpdating={updatingIds.has(task.id)}
                isDeleting={deletingIds.has(task.id)}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default Dashboard
