import { MdLanguage } from 'react-icons/md'
import { BiMenu } from 'react-icons/bi'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import { useCallback, useState } from 'react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '../../types'
import useRentModal from '@/app/hooks/useRentModal'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, SetIsOpen] = useState(false)
  const toggleOpen = useCallback(() => {
    SetIsOpen((value) => !value)
  }, [])
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    } else {
      return rentModal.onOpen()
    }
  }, [currentUser, loginModal, rentModal])

  return (
    <div
      className="
          w-auto
          flex justify-end
          xl:flex-grow flex-grow-0
          xl:flex-shink-0 flex-shrink
          xl:basis-[140px] basis-[auto]
    "
    >
      <div
        className="
          flex flex-grow-0 items-center justify-between
          xl:gap-2 gap-1
          relative
        "
      >
        <button
          className="
          p-3
          text-sm font-semibold
          md:block hidden
          hover:bg-gray-100 hover:rounded-full
        "
          onClick={onRent}
        >
          Cho thuê chỗ ở qua Airbnb
        </button>
        <MdLanguage
          size={44}
          className="
            hidden md:block
            fill-gray-700
            hover:bg-gray-100 hover:rounded-full
            p-3
            cursor-pointer
      "
        />
        <div
          onClick={toggleOpen}
          className="
        flex items-center
        gap-2 p-2
        border-[1px] rounded-full
        cursor-pointer
        shadow-sm hover:shadow-xl
      "
        >
          <BiMenu size={20} />
          <div className="hidden md:block">
            <Avatar source={currentUser?.image} />
          </div>
          <div
            className="
              absolute top-[120%] right-0
            bg-white
              drop-shadow-xl
              flex flex-col 
              text-sm
              rounded-md
              overflow-hidden
              z-[99]
        "
          >
            {!currentUser
              ? isOpen && (
                  <>
                    <MenuItem label="Login" onClick={loginModal.onOpen} />
                    <MenuItem label="Sing up" onClick={registerModal.onOpen} />
                  </>
                )
              : isOpen && (
                  <>
                    <div>
                      <MenuItem label="My trips" onClick={() => {}} />
                      <MenuItem label="My favorites" onClick={() => {}} />
                      <MenuItem label="My reservations" onClick={() => {}} />
                      <MenuItem label="My properties" onClick={() => {}} />
                      <MenuItem
                        label="Air bnb my home"
                        onClick={rentModal.onOpen}
                      />
                    </div>
                    <div className="border-t border-gray-300">
                      <MenuItem label="Logout" onClick={() => signOut()} />
                    </div>
                  </>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMenu
