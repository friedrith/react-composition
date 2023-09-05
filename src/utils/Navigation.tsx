import { Link, useLocation } from 'react-router-dom'

export default function Navigation({ count }) {
  const location = useLocation()

  return (
    <div className='absolute inset-y-0 left-0 flex items-center'>
      <div className='flex flex-col gap-2 pl-4'>
        {Array.from({ length: count }).map((_, index) => (
          <Link
            key={index}
            className={`navigation-button w-5 h-5 rounded-full ${
              location.pathname === `/${index}` ? 'active' : ''
            }`}
            to={`/${index}`}
          />
        ))}
      </div>
    </div>
  )
}
