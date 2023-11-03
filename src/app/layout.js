import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './_components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog | Blog com Nextjs',
  description: 'Blog teste',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
