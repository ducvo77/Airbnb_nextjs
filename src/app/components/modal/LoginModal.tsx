'use client'

import { Input } from '@material-tailwind/react'
import { useCallback, useState } from 'react'
import Modal from './Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  // const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data)

  const onToggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const body = (
    <div className="mb-4 flex flex-col gap-6">
      <Input
        {...register('email', { required: true })}
        size="lg"
        type="text"
        label="Email"
      />
      <Input
        {...register('password', { required: true })}
        size="lg"
        type="password"
        label="Password"
      />
    </div>
  )
  const footer = (
    <>
      <span>No account?</span>
      <span
        onClick={onToggle}
        className="text-blue-gray-800 font-semibold cursor-pointer"
      >
        Register a new account
      </span>
    </>
  )
  return (
    <Modal
      title="Login"
      label="Welcome back"
      description="Login to your account!"
      isOpen={loginModal.isOpen}
      body={body}
      footer={footer}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default LoginModal
