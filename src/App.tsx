import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom'

import Initial from './00_Initial'
import ClearButtonNaive from './01_ClearButtonNaive'
import ValidityIndicatorNative from './02_ValidityIndicatorNaive'
import * as BasicComposition from './03_BasicComposition'
import RenderFunctionProps from './05_RenderFunctionProps'
import CloneElement from './08_CloneElement'
import CompositionContext from './04_CompositionContext'
import CompoundPattern from './07_CompoundPattern'
import * as MoreFeatures from './08_MoreFeatures'

import Navigation from './utils/Navigation'
import Layout from './utils/Layout'
import Footer from './utils/Footer'
import Github from './utils/Github'
import Page from './utils/Page'

const routes = [
  {
    title: 'Text Input',
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
    title: 'Composition Context',
    component: CompositionContext,
  },
  {
    title: 'RenderFunctionProps',
    component: RenderFunctionProps,
  },
  {
    title: 'Clone Element',
    component: CloneElement,
  },
  {
    title: 'Compound Pattern',
    component: CompoundPattern,
  },
  {
    title: 'More Features',
    component: MoreFeatures,
  },
]

const App = () => {
  return (
    <div className='container'>
      <HashRouter>
        <Page routes={routes}>
          <Routes>
            {routes.map(({ title, component }, index) => (
              <Route
                key={title}
                path={`/${index}`}
                element={<Layout title={title} component={component} />}
              />
            ))}
            {routes.map(({ title, component }, index) => (
              <Route
                key={title}
                path={`/${title.toLowerCase().replace(/ /g, '-')}`}
                element={<Layout title={title} component={component} />}
              />
            ))}
            <Route path='*' element={<Navigate to='/0' replace={true} />} />
          </Routes>
        </Page>
      </HashRouter>
    </div>
  )
}

export default App
