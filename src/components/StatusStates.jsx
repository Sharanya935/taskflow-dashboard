export function LoadingState() {
  return (
    <div className="status-state">
      <div className="spinner" />
      <p>Loading tasks...</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="status-state">
      <p className="error-text">{message || 'Something went wrong.'}</p>
      <button type="button" className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="status-state">
      <p>No tasks yet. Add your first task above!</p>
    </div>
  )
}
