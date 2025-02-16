import type { NextPage } from 'next'
import Head from 'next/head'
import VideoCard from '../components/VideoCard'

const Home: NextPage = () => {
  // 更新示例数据以匹配VideoCard的props类型
  const exampleVideos = [
    {
      id: 'BV1234567890',
      title: '示例视频 1',
      description: '这是一个示例视频描述',
      thumbnail: 'https://i0.hdslb.com/example1.jpg',
      author: '技术UP主',
      views: 12500,
      duration: '12:30'
    },
    {
      id: 'BV0987654321',
      title: '示例视频 2',
      description: '这是另一个示例视频描述',
      thumbnail: 'https://i0.hdslb.com/example2.jpg',
      author: '学习达人',
      views: 8300,
      duration: '15:45'
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
            <VideoCard
              key={video.id}
              {...video}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home 