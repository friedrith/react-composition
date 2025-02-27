import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  renderEndDecorator?: ( value: string, onChange: (value: string, event?: React.SyntheticEvent) => void ) => React.ReactNode
}

function Input({ value, onChange, renderEndDecorator = () => <></> }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
      {renderEndDecorator({ value, onChange })}
    </div>
  )
}

function renderClearButton(value: string, onChange: (value: string, event?: React.SyntheticEvent) => void) {
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

export default function Example() {
  const [value, setValue] = useState('')

  return (
    <Input value={value} onChange={setValue} renderEndDecorator={renderClearButton} />
  )
}
