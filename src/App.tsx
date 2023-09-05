import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom'

import Initial from './00_Initial'
import ClearButtonNaive from './01_ClearButtonNaive'
import ValidityIndicatorNative from './02_ValidityIndicatorNaive'
import * as BasicComposition from './03_BasicComposition'
import RenderProps from './04_RenderProps'
import CloneElement from './05_CloneElement'
import CompositionContext from './06_CompositionContext'
import SubComponentPattern from './07_SubComponent'
import * as MoreFeatures from './08_MoreFeatures'

import Navigation from './utils/Navigation'
import Layout from './utils/Layout'

const routes = [
  {
    title: 'Initial',
    component: Initial,
  },
  {
    title: 'Clear Button',
    component: ClearButtonNaive,
  },
  {
    title: 'Validity Indicator',
    component: ValidityIndicatorNative,
  },
  {
    title: 'Basic Composition',
    component: BasicComposition,
  },
  {
    title: 'RenderProps',
    component: RenderProps,
  },
  {
    title: 'Clone Element',
    component: CloneElement,
  },
  {
    title: 'Composition Context',
    component: CompositionContext,
  },
  {
    title: 'SubComponent Pattern',
    component: SubComponentPattern,
  },
  {
    title: 'More Features',
    component: MoreFeatures,
  },
]

const App = () => {
  return (
    <div className='container'>
      <HashRouter basename={process.env.BASE_URL ?? '/'}>
        <Navigation count={routes.length} />
        <Routes>
          {routes.map(({ title, component }, index) => (
            <Route
              key={title}
              path={`/${index}`}
              element={<Layout title={title} component={component} />}
            />
          ))}
          <Route path='*' element={<Navigate to='/0' replace={true} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
