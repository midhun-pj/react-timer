import { useRef } from 'react'
import { useTimerContext } from '../../store/timers.context'
import Form, { FormHandle } from '../UI/Form'
import Input from '../UI/Input'
import Button from '../UI/Button'

const AddTimer = () => {
  const form = useRef<FormHandle>(null)
  const { addTimer } = useTimerContext()

  const handleSaveTimer = (data: unknown) => {
    const { name, duration } = data as { name: string; duration: string }

    addTimer({
      name,
      duration: +duration,
    })

    form.current?.clear()
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
        <Input type="text" label="Name" id="name" />
        <Input type="number" label="Duration" id="duration" />
        <p>
            <Button>Add Timer</Button>
        </p>
    </Form>
  )
}

export default AddTimer
