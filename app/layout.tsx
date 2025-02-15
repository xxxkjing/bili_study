import Sidebar from '@/components/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </body>
    </html>
  )
} 