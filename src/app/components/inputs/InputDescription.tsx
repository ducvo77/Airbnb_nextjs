'use client'

import { Input } from '@material-tailwind/react'

interface InputDescriptionProps {}

const InputDescription: React.FC<InputDescriptionProps> = ({}) => {
  return (
    <div>
      <div className="w-full">
        <Input label="Title" />
      </div>
      <div className="w-full">
        <Input label="Title" />
      </div>
    </div>
  )
}

export default InputDescription
