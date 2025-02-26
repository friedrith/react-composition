import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  endDecorator?: ({ value, onChange }) => React.ReactNode
}

function Input({ value, onChange, endDecorator: EndDecorator }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
      <EndDecorator value={value} onChange={onChange} />
    </div>
  )
}

function ClearButton({ value, onChange }) {
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
    <Input value={value} onChange={setValue} endDecorator={ClearButton} />
  )
}
