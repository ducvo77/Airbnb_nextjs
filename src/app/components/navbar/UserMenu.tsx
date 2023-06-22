import { MdLanguage } from 'react-icons/md'
import { BiMenu } from 'react-icons/bi'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import { useCallback, useState } from 'react'
import Modal from '../modal/Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

const UserMenu = () => {
  const [isOpen, SetIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    SetIsOpen((value) => !value)
  }, [])
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

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
          onClick={() => {}}
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
            <Avatar />
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
        "
          >
            {isOpen && <MenuItem label="Login" onClick={loginModal.onOpen} />}
            {isOpen && (
              <MenuItem label="Sing up" onClick={registerModal.onOpen} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMenu
