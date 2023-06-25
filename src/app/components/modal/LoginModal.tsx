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
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

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
      <span>No account?</span>
      <span
        onClick={onToggle}
        className="text-blue-gray-800 font-semibold cursor-pointer"
      >
        Register a new account
      </span>
    </div>
  )

  return (
    <Modal
      title="Login"
      label="Welcome back"
      description="Login to your account!"
      isOpen={loginModal.isOpen}
      body={body}
      footer={footer}
      loginSocial={loginSocial}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Login"
    />
  )
}

export default LoginModal
