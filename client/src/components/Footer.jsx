import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full h-[2.5rem] flex items-center justify-center font-serif bg-white dark:bg-gray-700'>
      <p className='text-center text-sm text-gray-800 dark:text-white'>
        Copyright &copy; 2026, All Rights Reserved{' '}
        <NavLink
          to="https://krguddu.netlify.app"
          target="_blank"
          className='text-teal-600 dark:text-teal-400 hover:underline'
        >
          KrGuddu
        </NavLink>
      </p>
    </footer>
  )
}

export default Footer
