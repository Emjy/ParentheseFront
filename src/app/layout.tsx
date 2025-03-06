import './globals.css'
import type { Metadata } from 'next'
import { NextUIProvider } from '@nextui-org/react'

export const metadata: Metadata = {
  title: '[Parenthèse]',
  description: '[]',
   icons: {
    icon: '/icon.ico', // chemin vers votre favicon dans le dossier public
  },
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  )
}
