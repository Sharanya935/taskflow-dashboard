import { useState, useEffect, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import TaskDetail from './pages/TaskDetail.jsx'
import { fetchTasks } from './api/tasksApi.js'

function App() {
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const loadTasks = useCallback(async () => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const data = await fetchTasks(10)
      setTasks(data)
      setStatus('success')
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong.')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            tasks={tasks}
            setTasks={setTasks}
            status={status}
            errorMessage={errorMessage}
            onRetry={loadTasks}
          />
        }
      />
      <Route
        path="/tasks/:id"
        element={<TaskDetail tasks={tasks} setTasks={setTasks} />}
      />
    </Routes>
  )
}

export default App
