import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import LoginModal from './components/modal/LoginModal'
import RegisterModal from './components/modal/RegisterModal'
import Navbar from './components/navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToastProvider'
import getCurentUser from './actions/getCurrentUser'

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
          <ToasterProvider />
        </ClientOnly>

        <section className="mt-24">
          <Container>{children}</Container>
        </section>
      </body>
    </html>
  )
}
