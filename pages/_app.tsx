import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Sidebar from '../components/Sidebar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp 