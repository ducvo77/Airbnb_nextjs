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

interface LoginModalProps {}

const LoginModal: React.FC<LoginModalProps> = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

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
      <Input size="lg" id="Email" type="text" label="Email" required />
      <Input
        size="lg"
        id="password"
        type="password"
        label="Password"
        required
      />
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
      isOpen={loginModal.isOpen}
      body={body}
      footer={footer}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default LoginModal
