import { useSearchParams } from "react-router-dom";

export default function Layout({ title, component: Component }) {

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      {searchParams.get('demo') !== '1' && <h1 className='pb-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
        {title}
      </h1>}
      <div className='flex flex-col space-y-6'>
        {typeof Component === 'function' ? (
          <Component />
        ) : (
          Object.values(Component).map((Compo: React.FC, index) => (
            <Compo key={index} />
          ))
        )}
      </div>
    </div>
  )
}
