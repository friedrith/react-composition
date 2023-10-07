---
theme: default
highlighter: shiki
lineNumbers: false
fonts:
  sans: 'Inter var, sans-serif'
info: |
  ## React Composition
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

<h1 class="line-height-tight!">Composition Pattern<br/>in React</h1>

<h2 class="font-700">How to keep components clean</h2>

<div class="font-700 pt-4 text-gray-600">
    Thibault FRIEDRICH - 2023/11/02
</div>

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

# Introducing myself: Thibault Friedrich

- Frontend developer for 8 years
- Using _React_ for 6+ years and vove it
- Strong focus on Ux, Agile and Code craftsmanship
  - how to create usable products
  - how to keep flexibility
  - how to write **Clean Code**
- Working at Plusgrade:
  - supporting other frontend developers to improve their code quality
- Available for freelance missions

<div class="abs-br m-6 flex gap-2">
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

# Organizer of Hackathon DEV & DESIGN

<div class="flex flex-col items-center">
  <img src="/hackathon.png" width="800" alt="Hackathon website" />
</div>

---

# Agenda

- Clean Code
- One Common mistake while writing React components
  - Simulate process of development 
    - First version of a simple feature
    - New requirements
    - Implementation  
- How to solve it with Composition pattern in React
  - Big dive to enhance the readibility of the code
  - [Compound pattern](https://www.patterns.dev/posts/compound-pattern)

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

<p class="text-center italic py-10 text-xl">
  Working software over comprehensive documentation
</p>

- keep your code clean
  - make your code more readable
  - ensure the code is scalable
- maintain velocity over time

> Craftsmanship: no absolute rule, but principles to adapt and make compromises.

::right::

<img alt="complexity" src="/complexity.png" />

<style>
  blockquote {
    margin-top: 2rem!important;
  }

</style>

---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/0?demo=1
---

# Input Text

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
url: https://friedrith.github.io/react-composition/#/1?demo=1
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
url: https://friedrith.github.io/react-composition/#/2?demo=1
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

For each new feature:

- one property 
- condition in the main function

Impact on the development:

- code spaghetti
- one file: one bottleneck
- harder to read
- harder to maintain

> Flag Argument: a common code smell in all languages (not only React)

::right::

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
  margin-top: 2rem!important;
}
</style>

---

# How to do better? 

<h2 class="text-center font-700">SOLID Open-Close Principle</h2>

<ul class="text-center mt-4 text-xl">
  <ol class="py-1">1. Open to extension</ol>
  <ol class="py-1">2. Close to modification</ol>
</ul>

> **Why Close to modification? Less modification, more stability, less bugs**

Often we use polymorphism to extend capabilities, with inheritance & composition patterns.

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
layout: two-cols
---


# Basic Composition 

- React component becomes lighter
- `endDecorator` children is isolated
- only one more property `endDecorator`
- won't require modification for next extension
- more scalable

::right::

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
```

---
layout: two-cols
---

# Component `ClearButton`

- Feature isolated in separated React Component
- Extension, not modification

::right::

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
```

---
layout: two-cols
---

# Component `ValidityIndicator`

- no more spaghetti code
- less combination of conditions
- removing code is faster
- debugging is straightforward
- but require more boilerplate


::right::

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
```

---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/3?demo=1
---

# React composition demo

```tsx
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

# How to reduce boilerplate

Increase the level of coupling.

3 options:

- low: `cloneElement`
- low: `renderProps`
- high: `Context`

<style>

h1 + p {
  opacity: 1!important;
  margin-top: 1rem!important;
}

</style>

---
layout: two-cols
---

# `cloneElement`

- modify props of the child
- loose coupling
- smooth code
- may lead to misunderstanding


[React Documentation](https://react.dev/reference/react/cloneElement) warns against this practice:

<img src="/react-warning.png" alt="React warning">

> But still useful sometimes

::right::

```tsx {16}
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

---
layout: two-cols
---

# `renderEndDecorator`

- mix with `renderProps` Pattern (second way to extend components in React)
- loose coupling
- props require to match
- mixing function and component that seems weird for junior developers

::right::

```tsx
export interface InputProps {
  value: string | number
  onChange: (value: string, event?: React.SyntheticEvent) => void
  renderEndDecorator?: ({ value, onChange }) => React.ReactNode
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
      {renderEndDecorator({ value, onChange })}
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
    <Input value={value} onChange={setValue} renderEndDecorator={ClearButton} />
  )
}
```

---
layout: two-cols
---

# `Context`

- strong coupling
- cleaner
- works even with several levels of components

But now:

- multiple components strongly coupled
- no easy way to read the coupling

**Can we even do better?**

::right::

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

--- 
layout: two-cols
---

# React Compound Pattern

- make the coupling between `Input` and `ClearButton` visible for all the developers

> works also with `Reac.FC` but requires some tricks in Typescript

::right::

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


<style>
  blockquote {
    margin-top: 2rem!important;
  }
</style>

---
layout: cool-demo
url: https://friedrith.github.io/react-composition/#/8?demo=1
---

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
layout: center
---

# Questions?

---
layout: two-cols
---

# Stay in contact


- [https://www.linkedin.com/in/thibault-friedrich/](https://www.linkedin.com/in/thibault-friedrich/)
- [https://github.com/friedrith](https://github.com/friedrith)
- [https://medium.com/@thibault-friedrich](https://medium.com/@thibault-friedrich)
- [thibault.friedrich@interaction-dynamics.io](mailto:thibault.friedrich@interaction-dynamics.io)
- [https://interaction-dynamics.io](https://interaction-dynamics.io)


::right::

<div class="text-center flex flex-col items-center">

<img width="300" height="300" src="/qrcode.svg" alt="QrCode Repository">

[https://bit.ly/react-composition](https://bit.ly/react-composition)

</div>