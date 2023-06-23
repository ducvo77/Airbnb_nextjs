'use client'

import { Input } from '@material-tailwind/react'
import { useCallback, useState } from 'react'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface RegisterModalProps {}

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    // axios
    //   .post('/api/register', data)
    //   .then(() => {
    //     toast.success('Registered!')
    //     registerModal.onClose()
    //     loginModal.onOpen()
    //   })
    //   .catch((error) => {
    //     toast.error(error)
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //   })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  const body = (
    <div className="mb-4 flex flex-col gap-6">
      <Input size="lg" label="Name" disabled={isLoading} required />
      <Input size="lg" label="Email" id="email" disabled={isLoading} required />
      <Input
        type="password"
        size="lg"
        label="Password"
        disabled={isLoading}
        required
      />
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
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal
