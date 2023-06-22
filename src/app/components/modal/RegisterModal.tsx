'use client'

import { Input } from '@material-tailwind/react'
import { useState } from 'react'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

interface RegisterModalProps {}

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const registerModal = useRegisterModal()

  const body = (
    <div className="mb-4 flex flex-col gap-6">
      <Input size="lg" label="Email" />
      <Input size="lg" label="Name" />
      <Input type="password" size="lg" label="Password" />
    </div>
  )
  const footer = (
    <>
      <span>Already have an account?</span>
      <span className="text-blue-gray-800 font-semibold cursor-pointer">
        Login
      </span>
    </>
  )
  return (
    <Modal
      disabled={isLoading}
      title="Register"
      label="Welcome to Airbnb"
      description="Create an acccount"
      isOpen={registerModal.isOpen}
      body={body}
      footer={footer}
      onClose={registerModal.onClose}
    />
  )
}

export default RegisterModal
