import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  // 静态示例数据
  const exampleVideos = [
    {
      id: 'BV1234567890',
      title: '示例视频 1',
      description: '这是一个示例视频描述'
    },
    {
      id: 'BV0987654321',
      title: '示例视频 2',
      description: '这是另一个示例视频描述'
    }
  ]

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Bilibili 学习</title>
        <meta name="description" content="纯净的bilibili学习平台" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold mb-8">
          欢迎来到 Bilibili 学习平台
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleVideos.map(video => (
            <div 
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <Link 
                  href={`/video/${video.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  观看视频
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home 