import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 fixed left-0 top-0 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="hover:text-blue-600">
              首页
            </Link>
          </li>
          {/* 可以添加更多导航项 */}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar 