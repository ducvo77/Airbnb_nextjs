'use client'

import {
  Input,
  Checkbox,
  Button,
  Typography,
  Card,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  label?: string
  description?: string
  name?: string
  email?: string
  password?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  label,
  description,
  name,
  email,
  password,
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    }
  }, [isOpen])

  return (
    show && (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {label}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          {description}
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" />
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: '-ml-2.5' }}
          />
          <Button className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    )
  )
}

export default Modal
