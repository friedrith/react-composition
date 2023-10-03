import { useState, createContext, useContext } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  endDecorator?: React.ReactNode
}

const InputContext = createContext<Omit<InputProps, 'endDecorator'>>({
  value: '',
  onChange: () => {},
})

function Input({ value, onChange, endDecorator }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
      <InputContext.Provider value={{ value, onChange }}>
        {endDecorator}
      </InputContext.Provider>
    </div>
  )
}

function ClearButton() {
  const { value, onChange } = useContext(InputContext)

  return (
    value && (
      <div className='end-decorator'>
        <button className='button' onClick={() => onChange('')}>
          <XCircleIcon className='h-8 w-8' />
        </button>
      </div>
    )
  )
}

Input.ClearButton = ClearButton

export default function Example() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={setValue}
      endDecorator={<Input.ClearButton />}
    />
  )
}
