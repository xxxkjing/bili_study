import type { NextPage } from 'next'
import VideoCard from '../components/VideoCard'

const Home: NextPage = () => {
  // 静态示例数据
  const exampleVideos = [
    {
      id: 'BV1234567890',
      title: '示例视频 1',
      description: '这是一个示例视频描述',
      thumbnail: 'https://i0.hdslb.com/example1.jpg'
    },
    {
      id: 'BV0987654321',
      title: '示例视频 2',
      description: '这是另一个示例视频描述',
      thumbnail: 'https://i0.hdslb.com/example2.jpg'
    }
  ]

  return (
    <div>
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
    </div>
  )
}

export default Home 