'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  return (
    <div
      className="
      md:flex hidden
      xl:flex-grow flex-grow-0
      xl:flex-shrink-0 flex-shrink
      xl:basis-[140px] basis-[auto]
    "
    >
      <Image
        onClick={() => router.push('/')}
        alt="Logo"
        className="cursor-pointer h-auto"
        width="100"
        height="100"
        src="/images/logo.png"
      ></Image>
    </div>
  )
}

export default Logo
