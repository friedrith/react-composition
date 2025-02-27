import React, { useState, createContext, useContext, Children, ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react'
import { XCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export interface InputProps extends React.PropsWithChildren {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
}

const InputContext = createContext<Omit<InputProps, 'endDecorator'>>({
  value: '',
  onChange: () => {},
  
})

const useSlots = (children: React.ReactNode): Record<string, React.ReactNode> => {
  return Children.toArray(children).reduce((acc, child) => {
    return {
      ...acc,
      [(child as any).type.displayName]: (child as any).props.children
    }
  }, {})
}

function Input({ value, onChange, children }: InputProps) {
  
  const { InputEndDecorator, InputStartDecorator } = useSlots(children)

  return (
    <div className='input-container'>
      <InputContext.Provider value={{ value, onChange }}>
        {InputStartDecorator}
      </InputContext.Provider>
      <input
        className='input'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
      <InputContext.Provider value={{ value, onChange }}>
        {InputEndDecorator}
      </InputContext.Provider>
    </div>
  )
}

function InputEndDecorator({ children }: React.PropsWithChildren) {
  return <>{children}</>
} 

InputEndDecorator.displayName = 'InputEndDecorator'

function InputStartDecorator({ children }: React.PropsWithChildren) {
  return <>{children}</>
} 

InputStartDecorator.displayName = 'InputStartDecorator'


function StartIcon({ icon: Icon }: { icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string; } & RefAttributes<SVGSVGElement>>; }) {
  return (
    <div className="start-decorator pl-6">
      <Icon className='h-8 w-8' />
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

export default function Example() {
  const [value, setValue] = useState('')

  return (
    <Input value={value} onChange={setValue}>
      <InputStartDecorator>
        <StartIcon icon={EnvelopeIcon} />
      </InputStartDecorator>
      <InputEndDecorator>
        <ClearButton />
      </InputEndDecorator>
    </Input>
  )
}
