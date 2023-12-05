import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsList } from 'react-icons/bs'
import Svg from './Svg'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Logo = styled(Svg)`
  color: var(--slate-900);
  width: 3rem;
  margin: 0 1rem 0 0;
`
const Link = styled(NavLink)`
  color: var(--sky-600);
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: var(--round-2xl);
  &:hover {
    color: var(--sky-700);
  }
  &.active {
    background-color: var(--slate-600);
    color: var(--slate-200);
  }
`
export default function NavBar({ logo = false, render, user }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header
      className={`relative flex bg-slate-200 px-4 py-3  ${
        isOpen ? 'justify-between' : 'justify-end'
      } md:justify-between`}
    >
      <nav
        className={`flex flex-col gap-2 hover:text-sky-500  ${
          isOpen ? 'block' : 'hidden'
        } md:flex-row md:flex`}
      >
        {logo && <Logo />}
        {render.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.name}
          </Link>
        ))}
      </nav>

      <div className='flex items-center justify-center gap-4'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-4xl md:hidden'
        >
          {isOpen ? 'X' : <BsList />}
        </button>
        {user}
      </div>
    </header>
  )
}

NavBar.propTypes = {
  render: PropTypes.arrayOf(Object),
  logo: PropTypes.bool,
  user: PropTypes.any,
}
