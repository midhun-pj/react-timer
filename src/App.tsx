import './App.css'
import AddTimer from './components/Timer/AddTimer'
import Timers from './components/Timer/Timers'
import Header from './components/UI/Header'
import TimersContextProvider from './store/timers.context'

function App() {
  return (
    <TimersContextProvider>
      <Header></Header>
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimersContextProvider>
  )
}

export default App
