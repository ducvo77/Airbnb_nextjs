'use client'

import Image from 'next/image'

interface AvatarProps {
  source?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ source }) => {
  return (
    <Image
      src={source || '/images/placeholder.jpg'}
      width="30"
      height="30"
      className="rounded-full"
      alt="Avatar"
    />
  )
}

export default Avatar
