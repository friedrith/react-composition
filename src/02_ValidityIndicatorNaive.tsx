import { useState } from 'react'
import { XCircleIcon, CheckIcon } from '@heroicons/react/24/outline'
import minLengthRegex from './utils/minLengthRegex'

export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  clearable?: boolean
  validityRegex?: RegExp
}

function Input({ value, onChange, clearable, validityRegex }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input'
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
      {validityRegex?.test(`${value}`) && (
        <div className='end-decorator'>
          <CheckIcon className='h-6 w-6 indicator' />
        </div>
      )}
    </div>
  )
}

export default function Example() {
  const [value, setValue] = useState('')

  return (
    <Input value={value} onChange={setValue} validityRegex={minLengthRegex} />
  )
}
