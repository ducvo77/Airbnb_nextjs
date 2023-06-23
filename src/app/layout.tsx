import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import LoginModal from './components/modal/LoginModal'
import RegisterModal from './components/modal/RegisterModal'
import Navbar from './components/navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToastProvider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <Container>
            <Navbar />
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
