import { useNavigate } from 'react-router-dom'

function TaskItem({ task, onToggle, onDelete, isUpdating, isDeleting }) {
  const navigate = useNavigate()

  const handleRowClick = () => {
    if (isUpdating || isDeleting) return
    navigate(`/tasks/${task.id}`)
  }

  const stop = (e) => e.stopPropagation()

  return (
    <li
      className={`task-item ${isUpdating || isDeleting ? 'mutating' : ''}`}
      onClick={handleRowClick}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        disabled={isUpdating || isDeleting}
        onClick={stop}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${
          task.completed ? 'incomplete' : 'complete'
        }`}
      />
      <span className={`task-title ${task.completed ? 'completed' : ''}`}>
        {task.title}
      </span>
      <button
        type="button"
        className="task-delete-button"
        disabled={isUpdating || isDeleting}
        onClick={(e) => {
          stop(e)
          onDelete(task)
        }}
        aria-label={`Delete "${task.title}"`}
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem
