import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  clearable?: boolean
}

function Input({ value, onChange, clearable }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input pr-20'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
      {clearable && value && (
        <div className='end-decorator'>
          <button className='button' onClick={() => onChange('')}>
            <XCircleIcon className='h-8 w-8' />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Example() {
  const [value, setValue] = useState('')

  return <Input value={value} onChange={setValue} clearable />
}
