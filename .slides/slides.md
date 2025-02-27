---
theme: default
highlighter: shiki
lineNumbers: false
fonts:
  sans: 'Inter var, sans-serif'
info: |
  ## SOLID Principles in React
  Presentation slides for the [React & React Native MTL Monthly Meetup](https://www.meetup.com/react-mtl/events/294497412/]
transition: slide-left
title: Composition Pattern in React
layout: cover
image: https://images.unsplash.com/photo-1633356122102-3fe601e05bd2
navigation: true
colorSchema: light
routerMode: hash
favicon: https://secure.meetupstatic.com/next/images/general/favicon.ico

---

<h1 class="line-height-tight!">SOLID Principles<br/>in React</h1>

<h2 class="font-700">How to keep your React components clean</h2>

<div class="font-700 pt-4 text-gray-600">
    Thibault FRIEDRICH - 2025/02/27
</div>

<!-- <div class="absolute right-20 bottom-20 text-center" v-mark="{ at: 1, color: 'orange', type: 'circle' }">
<img src="/qrcode.svg" class="w-30" />
Feedback form
</div> -->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
layout: image-right
image: /portrait.png
backgroundSize: cover

---

# Introducing myself: Thibault Friedrich

- Frontend developer for 10 years
- Using _React_ for 6+ years and love it
- Strong focus on Ux, Agile and Code craftsmanship
  - how to create usable products
  - how to keep flexibility
  - how to write **Clean Code**
- Implementing design systems for 3 years
- Maintainer of [DesignSystemHub](https://design-system-hub.com)

<div class="abs-bl m-6 flex gap-2">
  <!-- <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button> -->
  <a href="https://www.linkedin.com/in/thibault-friedrich/" target="_blank" alt="Linkedin"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-black">
    <carbon-logo-linkedin />
  </a>
  <a href="https://github.com/friedrith" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-black">
    <carbon-logo-github />
  </a>
  <a href="https://medium.com/@thibault-friedrich" target="_blank" alt="Medium"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-black">
    <carbon-logo-medium />
  </a>
</div>

---

# Agenda

- Why SOLID? 
  - Clean Code
  - Simulate process of development 
    - One Common mistake while writing React components
- How to increase readability and maintainability of your components
  - Multiple patterns available

> ⚠️ A lot of code incoming ⚠️

<style>
blockquote { 
  margin-top: 2rem!important;
}

</style>

---
layout: two-cols
image: complexity.webp
---

# Agile, Code Craftsmanship & Clean Code

- keep your code clean
  - make your code more readable
  - ensure the code is scalable
- maintain velocity over time

<p class="text-center italic py-8 text-xl">
  Working software over comprehensive documentation
</p>

> Craftsmanship: no absolute rule, but principles to adapt and make compromises.

::right::

<img alt="complexity" src="/complexity.png" />

<style>
  blockquote {
    margin-top: 2rem!important;
  }

</style>

---

# Developer life

<div class="flex flex-col items-center">
  <img src="/developer-life.svg" width="400" alt="Developer life" />
</div>

<style>
  li {
    font-size: 2rem;
  }
</style>

---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/text-input?demo=1
---

# Text Input

```tsx
export interface InputProps {
  value: string | number
  onChange: 
    (value: string, event: React.SyntheticEvent) => void
}

function Input({ value, onChange }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
    </div>
  )
}

export default function Example() {
  const [value, setValue] = useState('')
  return <Input value={value} onChange={setValue} />
}
```

---

# Requirement n°1: Clear button

<div class="flex justify-center pt-30">
  <img width="500" src="/requirement-clear-button.png" >
</div>

---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/clear-button?demo=1
---

# Clear Button

```tsx
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
```

---

# Requirement n°2: Validity indicator

<div class="flex justify-center pt-30">
  <img width="500" src="/requirement-validity-indicator.png" >
</div>


---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/validity-indicator?demo=1
---

# Validity Indicator

```tsx
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
      {validityRegex.test(`${value}`) && (
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
```

---
layout: two-cols
---

# Code Not scalable

```tsx
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
```

<style>
h1 + p {
  opacity: 1!important;
  margin-top: 1rem!important;
}

blockquote { 
  margin-top: 1rem!important;
}

</style>

::right::

<div v-click class="pl-4 pt-20">

For each new feature:
- one property 
- condition in the main function

</div>

<div v-click class="pl-4">

Impact on the development:
- spaghetti code 
- one file: one bottleneck
- harder to read
- harder to maintain

</div>

<div v-click class="pl-4">

> Flag Argument is often a code smell

</div>


---

# How to do better? SOLID

- <span v-mark.highlight.orange>**S**ingle Responsibility Principle</span><span v-click="1">: each component is responsible for one feature</span>
- <span v-mark.highlight.orange>**O**pen-Close Principle</span><span v-click="2">: open to extension, close to modification ➡️ less bugs</span>
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- <span v-mark.highlight.orange>**D**ependency Inversion Principle</span><span v-click="3">: inversion of control, give the control to your parent component</span>



<!-- - Single Responsibility Principle
  - each component is responsible for one feature 
- Open-Close Principle
  - open to extension, close to modification: Less modification, more stability, less bugs
   -->


<span v-click> **Are you sure you apply them in React?** </span>

  <div v-click class="mt-2">➡️ Small components</div>
  <div v-click class="mt-2">➡️ Add features without touching the components</div>


<div v-click>

> Seems obvious. But hard in reality.
> Use the following patterns to help you


</div>

<style>
h1 + p {
  opacity: 1!important;
  margin-top: 1rem!important;
}

blockquote {
  margin-top: 2rem!important;
  margin-bottom: 2rem!important;
}
</style>

---

# Composition Pattern in React

 In React 18, __Composition__ is the most common way to extend a Component.

Popular with `children` property:

```tsx
<Parent>
  <Children />
</Parent>
```

But also work with any property:

```tsx
<Parent property={ <Children />} />
```

- named property: express the purpose of the extension
- allow multiple extension points

> **Composition is the most underrated pattern in React**

<style>
h1 + p {
  opacity: 1!important;
  margin-top: 1rem!important;
}

blockquote {
  margin-top: 2rem!important;
  margin-bottom: 2rem!important;
}
</style>



---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/3?demo=1
---

# Basic composition

```tsx
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

export function WithClearButton() {
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

export function WithValidityIndicator() {
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
```


---
layout: two-cols
url: https://friedrith.github.io/react-composition/#/3?demo=1
---

# Basic composition

```tsx
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

export function WithClearButton() {
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

export function WithValidityIndicator() {
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
```

::right::


<div v-click class="pl-4 pt-20">

- each feature isolated in separated Component
- extension, not modification
- no more spaghetti code
- less combination of conditions
- removing code is faster
- debugging is straightforward
- BUT: a lot of boilerplate when calling this pattern

</div>



---

# How to reduce the boilerplate?

- Composition + Context
- render function pattern
- slots and slotProps pattern
- `cloneElement`

> Each of these solutions has its own pros and cons

<style>

h1 + p {
  opacity: 1!important;
  margin-top: 1rem!important;
}

</style>

---
layout: two-cols
---

# Composition + Context

```tsx
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

export default function Example() {
  const [value, setValue] = useState('')

  return (
    <Input value={value} onChange={setValue} endDecorator={<ClearButton />} />
  )
}
```

::right::

<div v-click class="pl-4 pt-20">

- less boilerplate
- works even with several levels of components
- ❌ high level of coupling

</div>

--- 
layout: two-cols
---

# Composition + Context + Compound Pattern

```tsx
// ... declaring Input and ClearButton

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
```

::right::

<div v-click class="pl-4 pt-20">

- make the coupling between `Input` and `ClearButton` visible for all the developers
- used a lot but some libraries start to move away from this pattern (headlessui for example)

</div>

<style>
  blockquote {
    margin-top: 2rem!important;
  }
</style>

---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/more-features?demo=1
---

# More examples

```tsx
// ... declarations before

<Input value={value} onChange={setValue}
  endDecorator={<Input.ClearButton />}
/>

<Input value={value} onChange={setValue}
  endDecorator={<Input.ValidityIndicator regex={minLengthRegex} />}
/>

<Input value={value} onChange={setValue}
  type='password'
  endDecorator={<Input.PasswordToggleButton />}
/>

<Input value={value} onChange={setValue}
  endDecorator={<Input.CopyToClipboard />}
/>

<Input value={value} onChange={setValue}
  endDecorator={<Input.KeyBinding keyBinding='⌘+K' />}
/>
```
---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/named-children?demo=1
---

# Named children/slots

```tsx
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
```


---
layout: two-cols
---

# render function

```tsx
export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  renderEndDecorator?: ( value: string, onChange: (value: string, event?: React.SyntheticEvent) => void) => React.ReactNode
}

function Input({ value, onChange, renderEndDecorator }: InputProps) {
  return (
    <div className='input-container'>
      <input
        className='input'
        value={value}
        onChange={event => onChange(event.target.value, event)}
        placeholder='Type something...'
      />
      {renderEndDecorator(value, onChange)}
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
```

::right::

<div v-click class="pl-4 pt-20">

- less coupling than context
- easy to create
- power to mix function and components
- ❌ lose component lifecycle 

</div>



---
layout: two-cols
---

# slots pattern

```tsx
export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  EndDecorator?: ({ value, onChange }) => React.ReactNode
}

function Input({ value, onChange, EndDecorator }: InputProps) {
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
    <Input value={value} onChange={setValue} EndDecorator={ClearButton} />
  )
}
```

::right::

<div v-click class="pl-4 pt-20">

- keep loose coupling
- easy to create
- better than `render` function
- access to lifecycle
- harder for junior developers
- MUI uses this pattern in the `slots` prop

</div>

---
layout: two-cols
---

# `cloneElement`

```tsx {all|16}{at:1}
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
      {cloneElement(endDecorator as ReactElement, { value, onChange })}
    </div>
  )
}

function ClearButton({ value, onChange }: any) {
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
    <Input value={value} onChange={setValue} endDecorator={<ClearButton />} />
  )
}
```

::right::

<div v-click="2" class="pl-4 pt-20">

- modify props of the child
- loose coupling
- smooth code
- may lead to misunderstanding


[React Documentation](https://react.dev/reference/react/cloneElement) warns against this practice:

<img src="/react-warning.png" alt="React warning">

> But still useful sometimes when you cannot update the endDecorator component

</div>


---

# Conclusion

- For high level of coupling: 
  - **Composition + Context**
- For low level of coupling: 
  - **slots pattern, render function, cloneElement**
- Every time you have a new feature:
  1. find how to not modify existing components
  2. if you have to: use one of the patterns to respect the principles:
    - Open-Close Principle
    - Single Responsibility Principle
    - Control Inversion: key to see the code from another perspective


<style>
  blockquote {
    margin-top: 2rem!important;
  }

</style>


---
layout: two-cols
---

# Questions ?

<div class="h-30"></div>

# Stay in contact


- [https://thibaultfriedrich.io](https://thibaultfriedrich.io)
- [https://github.com/friedrith/react-composition](https://github.com/friedrith/react-composition)

::right::

<div class="text-center flex flex-col items-center">

<img src="/qrcode-repo.svg" class="h-60 w-60" alt="repository" />

Repository

</div>
