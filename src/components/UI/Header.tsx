import { useTimerContext } from '../../store/timers.context'
import Button from './Button'

export default function Header() {
  const { isRunning, startTimer, stopTimer } = useTimerContext()
  return (
    <header>
      <h1>React timer</h1>

      <Button onClick={isRunning ? stopTimer : startTimer} className='primary'>
        {isRunning ? 'Stop' : 'Start'} Timers
      </Button>
    </header>
  )
}
