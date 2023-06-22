import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import Modal from './components/modal/Modal'
import Navbar from './components/navbar'
import './globals.css'
import { Nunito } from 'next/font/google'

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
        </ClientOnly>

        <section className="mt-24">
          <Container>{children}</Container>
        </section>
      </body>
    </html>
  )
}
