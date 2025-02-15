import Link from 'next/link'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen">
      <nav className="space-y-4">
        <Link href="/" className="block hover:bg-gray-200 p-2 rounded">
          首页
        </Link>
        <div>
          <h3 className="font-bold mb-2">视频分类</h3>
          <div className="space-y-2 pl-2">
            <Link href="/category/education" className="block hover:bg-gray-200 p-2 rounded">
              教育
            </Link>
            {/* 可以添加更多分类 */}
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar 