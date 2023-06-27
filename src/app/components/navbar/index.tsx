'use client'

import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '../../types'
import Categories from './Categories'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div
      className="
      navbar-wrapper
      w-full h-auto 
      fixed top-0 left-0 right-0
      bg-white z-[1]
    "
    >
      <div className="shadow-sm border-b-[1px]">
        <Container>
          <div
            className="
          w-full
          h-20
        
          flex flex-grow items-center justify-between
          gap-3 md:gap-0
        "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
