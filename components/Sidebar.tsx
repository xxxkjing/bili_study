import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  const categories = [
    { id: 'tech', name: '科技' },
    { id: 'game', name: '游戏' },
    { id: 'life', name: '生活' },
    { id: 'edu', name: '教育' }
  ]

  return (
    <div className="w-64 h-screen bg-gray-100 fixed left-0 top-0 p-4">
      <nav className="space-y-6">
        <div>
          <Link href="/" className="text-xl font-bold hover:text-blue-600 block mb-4">
            首页
          </Link>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">分类</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id}>
                <Link 
                  href={`/category/${category.id}`}
                  className="hover:text-blue-600 block py-1"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar 