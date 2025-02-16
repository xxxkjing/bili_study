import type { NextPage } from 'next'
import Head from 'next/head'
import VideoCard, { VideoCardProps } from '../components/VideoCard'

type VideoCardData = Omit<VideoCardProps, 'key'> & {
  id: string
}

const Home: NextPage = () => {
  const exampleVideos: VideoCardData[] = [
    {
      id: 'BV1AEKNeZEf7',
      title: '示例视频 1',
      description: '这是一个示例视频描述',
      thumbnail: 'https://i0.hdslb.com/bfs/archive/7c27b59d9d2a1c85c3ce5e886c5c42b6d2d0b42c.jpg@672w_378h_1c_!web-home-common-cover.webp',
      author: '技术UP主',
      views: 12500,
      duration: '12:30'
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
          {exampleVideos.map(({ id, ...videoProps }) => (
            <VideoCard
              key={id}
              {...videoProps}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home 