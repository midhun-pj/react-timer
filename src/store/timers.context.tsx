import {
  act,
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react'

export type Timer = {
  name: string
  duration: number
}

type TimerState = {
  isRunning: boolean
  timers: Timer[]
}

type TimerContextValue = TimerState & {
  addTimer: (timerData: Timer) => void
  startTimer: () => void
  stopTimer: () => void
}

type TimerContextProviderProps = {
  children: ReactNode
}

type StartAction = {
  type: 'START_TIMER'
}

type StopAction = {
  type: 'STOP_TIMER'
}

type AddAction = {
  type: 'ADD_TIMER'
  payload: Timer
}

type Action = StartAction | StopAction | AddAction

export const TimerContext = createContext<TimerContextValue | null>(null)

const initState: TimerState = {
  isRunning: false,
  timers: [],
}

function timersReducer(state: TimerState, action: Action): TimerState {
  const { type } = action

  if (type === 'ADD_TIMER') {
    const {
      payload: { name, duration },
    } = action
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: name,
          duration: duration,
        },
      ],
    }
  } else {
    return {
      ...state,
      isRunning: type === 'START_TIMER' ? true : false,
    }
  }
}

export default function TimersContextProvider({
  children,
}: TimerContextProviderProps) {
  const [timerState, dispatch] = useReducer(timersReducer, initState)

  const ctx: TimerContextValue = {
    timers: timerState.timers,
    isRunning: timerState.isRunning,
    addTimer(timerData) {
      dispatch({
        type: 'ADD_TIMER',
        payload: timerData,
      })
    },
    startTimer() {
      dispatch({ type: 'START_TIMER' })
    },
    stopTimer() {
      dispatch({ type: 'STOP_TIMER' })
    },
  }

  return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>
}

export function useTimerContext() {
  const ctx = useContext(TimerContext)

  if (ctx === null) {
    throw new Error('It should not be happening')
  }

  return ctx
}
