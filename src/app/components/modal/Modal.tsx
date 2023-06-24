'use client'

import { FaXmark } from 'react-icons/fa6'
import { Typography, Card, Button } from '@material-tailwind/react'
import { useCallback, useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit?: () => void
  title: string
  label: string
  description: string
  body: React.ReactElement
  footer: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  label,
  description,
  body,
  footer,
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setShow(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      onSubmit()
    }
  }, [onSubmit])

  if (!isOpen) {
    return null
  }

  return (
    show && (
      <div className="modal fixed inset-0  bg-black/50 flex items-center justify-center ">
        <Card
          color="white"
          className={`p-10 rounded-lg relative`}
          shadow={true}
        >
          <FaXmark
            size={24}
            className="absolute right-3 top-3 cursor-pointer "
            onClick={handleClose}
          />
          <div className="flex relative items-center justify-center pb-3 border-b mb-3">
            <h3 className="font-bold text-black text-lg]">{title}</h3>
          </div>
          {/*header*/}
          <Typography variant="h4" color="blue-gray">
            {label}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            {description}
          </Typography>
          {/*body*/}
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            {body}

            <Button className="mt-6 bg-primary" fullWidth onClick={onSubmit}>
              Continue
            </Button>
          </form>
          {/*footer*/}
          <div className="mt-4 border-t-[1px] pt-4 flex flex-col gap-3">
            <button
              onClick={() => signIn('google')}
              className="w-full flex border-[2px] border-black rounded-md p-2 relative items-center justify-center font-bold"
            >
              <FcGoogle size={20} className="absolute left-4" />
              <span>Continue With Google</span>
            </button>
            <button
              onClick={() => signIn('github')}
              className="w-full flex border-[2px] border-black rounded-md p-2 relative items-center justify-center font-bold"
            >
              <AiFillGithub size={20} className="absolute left-4" />
              <span>Continue With Github</span>
            </button>
            {/* <button
              onClick={() => signIn('facebook')}
              className="w-full flex border-[2px] border-black rounded-md p-2 relative items-center justify-center font-bold"
            >
              <AiFillGithub size={20} className="absolute left-4" />
              <span>Continue With Facebook</span>
            </button> */}
          </div>
          <div className="flex items-center justify-center mt-3 gap-2">
            {footer}
          </div>
        </Card>
      </div>
    )
  )
}

export default Modal
