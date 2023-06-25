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
  loginSocial?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  secondaryActionLabel?: string
  secondaryAction?: () => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  label,
  description,
  body,
  loginSocial,
  footer,
  actionLabel,
  secondaryActionLabel,
  secondaryAction,
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
    <div
      className={`modal fixed inset-0 flex items-center justify-center transition duration-300 ${
        show ? 'bg-black/50' : 'bg-transparent'
      }`}
    >
      <Card
        color="white"
        className={`p-10 rounded-lg relative transition-transform duration-300 w-80 max-w-screen-lg sm:w-[30rem] max-h-[90vh] ${
          show ? 'translate-y-[0] opacity-100' : 'translate-y-[150%] opacity-0'
        }`}
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
        <form className="pt-8 pb-2 w-full max-h-[60%] overflow-y-scroll">
          <>{body}</>
        </form>
        <div
          className={`grid gap-4 ${
            secondaryActionLabel ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {secondaryActionLabel && (
            <Button
              className="mt-6 bg-primary"
              fullWidth
              onClick={secondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          )}
          <Button className="mt-6 bg-primary" fullWidth onClick={handleSubmit}>
            {actionLabel}
          </Button>
        </div>
        {/* Login social */}
        {loginSocial}
        {/*footer*/}
        {footer}
      </Card>
    </div>
  )
}

export default Modal
