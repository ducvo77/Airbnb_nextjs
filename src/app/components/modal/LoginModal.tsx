'use client'

import { Input } from '@material-tailwind/react'
import { useState } from 'react'
import Modal from './Modal'
import useLoginModal from '@/app/hooks/useLoginModal'

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const registerModal = useLoginModal()

  const body = (
    <div className="mb-4 flex flex-col gap-6">
      <Input size="lg" label="Email" />
      <Input type="password" size="lg" label="Password" />
    </div>
  )
  const footer = (
    <>
      <span>No account?</span>
      <span className="text-blue-gray-800 font-semibold cursor-pointer">
        Register a new account
      </span>
    </>
  )
  return (
    <Modal
      disabled={isLoading}
      title="Login"
      label="Welcome back"
      description="Login to your account!"
      isOpen={registerModal.isOpen}
      body={body}
      footer={footer}
      onClose={registerModal.onClose}
    />
  )
}

export default LoginModal
