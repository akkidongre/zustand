import './App.css'
import Column from './components/Column'

function App() {
  return (
    <div className='App'>
      <Column state="planned" />
      <Column state="ongoing" />
      <Column state="done" />
    </div>
  )
}

export default App
