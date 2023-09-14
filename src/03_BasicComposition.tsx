import { useState } from 'react'
import { XCircleIcon, CheckIcon } from '@heroicons/react/24/outline'
import minLengthRegex from './utils/minLengthRegex'

export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  endDecorator?: React.ReactNode
}

function Input({ value, onChange, endDecorator }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
      {endDecorator}
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

export function Example1() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={setValue}
      endDecorator={<ClearButton value={value} onChange={setValue} />}
    />
  )
}

function ValidityIndicator({ value, validityRegex }) {
  return (
    `${value}`.match(validityRegex) && (
      <div className='end-decorator'>
        <CheckIcon className='h-6 w-6 indicator' />
      </div>
    )
  )
}

export function Example2() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={setValue}
      endDecorator={
        <ValidityIndicator value={value} validityRegex={minLengthRegex} />
      }
    />
  )
}
