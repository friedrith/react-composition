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

<h1 class="line-height-tight!">SOLID Principle<br/>in React</h1>

<h2 class="font-700">How to keep components clean</h2>

<div class="font-700 pt-4 text-gray-600">
    Thibault FRIEDRICH - 2025/02/27
</div>

<div class="absolute right-20 bottom-20 text-center" v-mark="{ at: 1, color: 'orange', type: 'circle' }">
<img src="/qrcode.svg" class="w-30" />
Feedback form
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

- SOLID Principle
- Why SOLID? 
  - Clean Code
  - Simulate process of development 
    - One Common mistake while writing React components
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

# SOLID Principle: Some theory

- <span v-mark.highlight.orange>**S**ingle Responsibility Principle</span>
- <span v-mark.highlight.orange>**O**pen-Close Principle</span>
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- <span v-mark.highlight.orange>**D**ependency Inversion Principle</span>



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

- spaghetti code 
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

# How to do better? SOLID

- Single Responsibility Principle
  - each component is responsible for one feature 
- Open-Close Principle
  - open to extension, close to modification: Less modification, more stability, less bugs
  


<span v-click> **How to apply it in React?** </span>

  <div v-click class="mt-2">➡️ Smaller components</div>
  <div v-click class="mt-2">➡️ Add features without touching the components</div>


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

# Context + React Compound Pattern

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

# Conclusion

- New patterns: `cloneElement`, `render` function, `Compound` pattern
- But more important: React composition
- Composition is the most underrated pattern in React
- every time you have a new feature: React composition first

> Craftsmanship: no absolute rule, exception always exist

<style>
  blockquote {
    margin-top: 2rem!important;
  }

</style>

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
- [https://hackathon-dev-design.vercel.app](https://hackathon-dev-design.vercel.app)


::right::

<div class="text-center flex flex-col items-center">

<img src="/qrcode.svg" class="h-60 w-60" alt="feedback form" />

Feedback form

</div>
