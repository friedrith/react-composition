import { useParams, useSearchParams } from 'react-router-dom'
import Footer from './Footer'
import Github from './Github'
import Navigation from './Navigation'

export default function Page({ children, routes }) {
  const [urlSearchParams] = useSearchParams()

  if (urlSearchParams.get('demo')) return <>{children}</>

  return (
    <>
      <Navigation count={routes.length} />
      <Github />
      {children}
      <Footer />
    </>
  )
}
