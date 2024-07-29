import { useTimerContext } from '../../store/timers.context'
import Timer from './Timer'

const Timers = () => {
  const { timers } = useTimerContext()

  return (
    <ul>
      {timers.map((timer, index) => (
        <li key={timer.name + index}>
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  )
}
export default Timers
