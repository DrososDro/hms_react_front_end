import PropTypes from 'prop-types'
import { cloneElement, createContext, useContext, useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'
import { createPortal } from 'react-dom'

const ModalContext = createContext()

export default function Modal({ children }) {
  const [openName, setOpenName] = useState('')
  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}
function Open({ children, opensWindow }) {
  const { open } = useContext(ModalContext)
  return (
    <button className='text-sky-500' onClick={() => open(opensWindow)}>
      {children}
    </button>
  )
}
function Window({ children, windowName }) {
  const { openName, close } = useContext(ModalContext)
  const ref = useClickOutside(close)
  if (windowName !== openName) return null
  return createPortal(
    <div className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-slate-900/30 backdrop-blur-sm'>
      <div ref={ref} className=''>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  )
}

Modal.Open = Open
Modal.Window = Window

Open.propTypes = {
  children: PropTypes.any,
  opensWindow: PropTypes.string,
}
Modal.propTypes = {
  children: PropTypes.any,
}

Window.propTypes = {
  children: PropTypes.any,
  windowName: PropTypes.any,
}
