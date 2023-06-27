import './globals.css'
import { Nunito } from 'next/font/google'

import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import LoginModal from './components/modal/LoginModal'
import RegisterModal from './components/modal/RegisterModal'
import Navbar from './components/navbar'
import ToasterProvider from './providers/ToastProvider'
import getCurentUser from './actions/getCurrentUser'
import RentModal from './components/modal/RentModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurentUser()
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <Container>
            <Navbar currentUser={currentUser} />
          </Container>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <ToasterProvider />
        </ClientOnly>

        <section className="mt-[180px] mb-20">
          <Container>{children}</Container>
        </section>
      </body>
    </html>
  )
}
