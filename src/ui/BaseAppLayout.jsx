import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import { mainNavbarLinks } from '../linkData/mainNavbar'
import User from './User'

export default function BaseAppLayout() {
  return (
    <div className=' grid h-screen grid-rows-[auto_1fr_auto]'>
      <NavBar render={mainNavbarLinks} logo={true} user={<User />} />

      <div className='mx-auto mt-4 grid w-3/4 grid-rows-[auto_1fr] overflow-hidden '>
        <Outlet />
      </div>
      <footer className='bg-slate-100 text-center'>
        Created and maintaited by Drosos
      </footer>
    </div>
  )
}
