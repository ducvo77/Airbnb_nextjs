'use client'

import { Input } from '@material-tailwind/react'
import { useCallback, useEffect } from 'react'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

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
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Registered!')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [registerModal, loginModal])

  const body = (
    <div className="mb-4 flex flex-col gap-6">
      <Input {...register('name', { required: true })} size="lg" label="Name" />
      <Input
        {...register('email', { required: true })}
        size="lg"
        label="Email"
        id="email"
        type="email"
      />
      <Input
        {...register('password', { required: true })}
        type="password"
        size="lg"
        label="Password"
        required
      />
    </div>
  )
  const footer = (
    <>
      <span>Already have an account?</span>
      <span
        onClick={onToggle}
        className="text-blue-gray-800 font-semibold cursor-pointer"
      >
        Login
      </span>
    </>
  )
  return (
    <Modal
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
