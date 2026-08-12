import { useState } from 'react'

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed || submitting) return

    setSubmitting(true)
    try {
      await onAdd(trimmed)
      setTitle('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
        aria-label="New task title"
      />
      <button
        type="submit"
        className="add-task-button"
        disabled={submitting || !title.trim()}
      >
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default AddTaskForm
