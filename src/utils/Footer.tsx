import { HeartIcon } from '@heroicons/react/20/solid'

export default function Footer() {
  return (
    <footer className='fixed inset-x-0 bottom-0 py-1 text-center text-gray-500'>
      Made with <HeartIcon className='h-5 w-5 inline mb-1' /> in Montreal
    </footer>
  )
}
