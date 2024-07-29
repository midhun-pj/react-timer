import { FC, useEffect, useRef, useState } from 'react'
import {
  Timer as TimerProps,
  useTimerContext,
} from '../../store/timers.context'
import Container from '../UI/Container'

const Timer: FC<TimerProps> = ({ name, duration }) => {
  const interval = useRef<number | null>(null)

  const [remainingTime, setRemainingTime] = useState(duration * 1000)

  const { isRunning } = useTimerContext()

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current)
  }

  useEffect(() => {
    let timer: number

    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 0) {
            return prev
          }
          return prev - 50
        })
      }, 50)

      interval.current = timer
    } else if (interval.current) {
      clearInterval(interval.current)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isRunning])

  const formattedTime = (remainingTime / 1000).toFixed(2)
  return (
    <Container as='article'>
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime}></progress>
      </p>
      <p>{formattedTime}</p>
    </Container>
  )
}

export default Timer
