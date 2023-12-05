import { useEffect, useRef } from 'react'

export default function useClickOutside(handle) {
  const ref = useRef()
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handle()
        }
      }
      document.addEventListener('click', handleClick, true)
      return () => document.removeEventListener('click', handleClick, true)
    },
    [handle],
  )
  return ref
}
