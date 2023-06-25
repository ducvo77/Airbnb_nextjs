'use client'

import { Input } from '@material-tailwind/react'
import { useCallback, useEffect } from 'react'
import Modal from './Modal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'

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

  const loginSocial = (
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
    </div>
  )

  const footer = (
    <div className="flex items-center justify-center mt-3 gap-2">
      <span>Already have an account?</span>
      <span
        onClick={onToggle}
        className="text-blue-gray-800 font-semibold cursor-pointer"
      >
        Login
      </span>
    </div>
  )
  return (
    <Modal
      title="Register"
      label="Welcome to Airbnb"
      description="Create an acccount"
      isOpen={registerModal.isOpen}
      body={body}
      footer={footer}
      loginSocial={loginSocial}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continue"
    />
  )
}

export default RegisterModal
