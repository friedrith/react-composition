import { useState, createContext, useContext, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { useEventListener } from 'usehooks-ts'

import {
  XCircleIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline'
import minLengthRegex from './utils/minLengthRegex'

export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  endDecorator?: React.ReactNode
  type?: string
}

const InputContext = createContext<
  Omit<InputProps, 'endDecorator'> & {
    setDynamicProps: (newProps: object) => void
    ref: React.MutableRefObject<HTMLInputElement>
  }
>({
  value: '',
  type: '',
  onChange: () => {},
  setDynamicProps: () => {},
  ref: undefined,
})

function Input({ type = 'text', value, onChange, endDecorator }: InputProps) {
  const [dynamicProps, setDynamicProps] = useState({})
  const ref = useRef<HTMLInputElement>()

  return (
    <div className='input-container'>
      <input
        className='input'
        value={value}
        type={type}
        {...dynamicProps}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
        ref={ref}
      />
      <InputContext.Provider
        value={{ type, value, onChange, setDynamicProps, ref }}
      >
        {endDecorator}
      </InputContext.Provider>
    </div>
  )
}

Input.ClearButton = function () {
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

export function Example1() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={setValue}
      endDecorator={<Input.ClearButton />}
    />
  )
}

Input.ValidityIndicator = function ({ regex }) {
  const { value, onChange } = useContext(InputContext)

  return (
    regex.test(`${value}`) && (
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
      endDecorator={<Input.ValidityIndicator regex={minLengthRegex} />}
    />
  )
}

Input.PasswordToggleButton = function () {
  const { setDynamicProps } = useContext(InputContext)
  const [dynamicType, setDynamicType] = useState('password')

  return (
    <div className='end-decorator'>
      <button
        className='button'
        onClick={() => {
          const newType = dynamicType === 'text' ? 'password' : 'text'
          setDynamicProps({ type: newType })
          setDynamicType(newType)
        }}
      >
        {dynamicType === 'password' ? (
          <EyeIcon className='h-8 w-8' />
        ) : (
          <EyeSlashIcon className='h-8 w-8' />
        )}
      </button>
    </div>
  )
}

export function Example3() {
  const [value, setValue] = useState('')

  return (
    <Input
      type='password'
      value={value}
      onChange={setValue}
      endDecorator={<Input.PasswordToggleButton />}
    />
  )
}

Input.CopyToClipboard = function () {
  const { ref } = useContext(InputContext)
  const [isCopying, setCopying] = useState(false)

  return (
    <div className='end-decorator'>
      <Transition
        show={isCopying}
        enter='transition-opacity duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='mr-2 bg-[#e0e0e0] relative z-50'>Copied</div>
      </Transition>
      <button
        className='button !rounded-md'
        onClick={() => {
          ref?.current.focus()
          ref?.current.setSelectionRange(0, 99999)
          navigator.clipboard.writeText(ref?.current.value)
          setCopying(true)

          setTimeout(() => {
            setCopying(false)
          }, 3000)
        }}
      >
        <ClipboardDocumentIcon className='h-8 w-8' />
      </button>
    </div>
  )
}

export function Example4() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={setValue}
      endDecorator={<Input.CopyToClipboard />}
    />
  )
}

Input.KeyBinding = function ({ keyBinding }) {
  const { ref } = useContext(InputContext)

  useEventListener('keydown', event => {
    if (event.key === 'k' && event.metaKey) {
      ref?.current.focus()
    }
  })

  return (
    <div className='end-decorator'>
      <button className='keybinding !rounded-md'>{keyBinding}</button>
    </div>
  )
}

export function Example5() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={setValue}
      endDecorator={<Input.KeyBinding keyBinding='⌘+K' />}
    />
  )
}
