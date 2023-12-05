import { useState } from 'react'
import useUser from '../features/users/useUser'
import { deleteItemLocalStorage } from '../helpers/localStorage'
import { useQueryClient } from '@tanstack/react-query'

export default function User() {
  const queryclient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { userData, isLoading } = useUser()
  function handleLogout() {
    console.log('called')
    deleteItemLocalStorage('actb')
    deleteItemLocalStorage('rftb')
    queryclient.invalidateQueries('user')
  }
  if (isLoading) return null
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className='relative flex items-center justify-center gap-2'
      >
        <img src='/avatar.jpg' className='w-10 rounded-full' />
        <p>{userData.email}</p>
        {isOpen && (
          <div className='absolute left-0 top-10 z-10 w-40 rounded-sm bg-slate-100 px-1 py-2 '>
            <button
              onClick={() => handleLogout()}
              className='w-full rounded-sm hover:bg-slate-500'
            >
              Logout
            </button>
          </div>
        )}
      </button>
    </div>
  )
}
