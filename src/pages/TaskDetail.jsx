import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchTaskById, deleteTask } from '../api/tasksApi.js'
import { LoadingState, ErrorState } from '../components/StatusStates.jsx'

function TaskDetail({ tasks, setTasks }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState(null)
  const [status, setStatus] = useState('loading') // loading | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const loadTask = useCallback(async () => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const data = await fetchTaskById(id)
      setTask(data)
      setStatus('success')
    } catch (err) {
      setErrorMessage(err.message || 'Failed to load task.')
      setStatus('error')
    }
  }, [id])

  useEffect(() => {
    // Prefer the task already in local state (source of truth), since it
    // reflects any local edits. Fall back to the API only if it's not
    // present locally (e.g. page was refreshed / linked to directly).
    const existing = tasks.find((t) => String(t.id) === id)
    if (existing) {
      setTask(existing)
      setStatus('success')
      return
    }

    loadTask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, loadTask])

  const handleDelete = async () => {
    if (!task || isDeleting) return
    setIsDeleting(true)
    try {
      await deleteTask(task.id)
      setTasks((prev) => prev.filter((t) => t.id !== task.id))
      navigate('/')
    } catch (err) {
      alert(err.message || 'Failed to delete task.')
      setIsDeleting(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="task-detail">
        <LoadingState />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="task-detail">
        <ErrorState
          message={errorMessage}
          onRetry={loadTask}
        />
        <button
          className="back-button"
          onClick={() => navigate('/')}
          disabled={isDeleting}
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="task-detail">
      <div className="task-detail-card">
        <h1>Task Details</h1>
        <div className="task-detail-row">
          <span className="task-detail-label">Task ID</span>
          <span>{task.id}</span>
        </div>
        <div className="task-detail-row">
          <span className="task-detail-label">User ID</span>
          <span>{task.userId}</span>
        </div>
        <div className="task-detail-row">
          <span className="task-detail-label">Title</span>
          <span>{task.title}</span>
        </div>
        <div className="task-detail-row">
          <span className="task-detail-label">Status</span>
          <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <div className="task-detail-row">
          <span className="task-detail-label">Description</span>
          <span>No description available for this task.</span>
        </div>

        <div className="task-detail-actions">
          <button
            className="back-button"
            onClick={() => navigate('/')}
            disabled={isDeleting}
          >
            Back
          </button>
          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetail
