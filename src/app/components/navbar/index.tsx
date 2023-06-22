'use client'

import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div
      className="
      navbar-wrapper
      w-full h-20 
      fixed top-0 left-0 right-0
      bg-white
      shadow-sm
      border-b-[1px]
    "
    >
      <Container>
        <div
          className="
          w-full
          flex flex-grow items-center justify-between
          gap-3 md:gap-0
        "
        >
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
