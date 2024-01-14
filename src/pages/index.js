import { Inter } from 'next/font/google'
import HomeBonilla from './HomeBonilla'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
      <HomeBonilla />
    </main>
  )
}
