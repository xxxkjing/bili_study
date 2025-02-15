const BILIBILI_API_BASE = 'https://api.bilibili.com/x'

export async function getDefaultUpVideos() {
  // 这里需要替换成你想要默认显示的UP主的UID
  const DEFAULT_UP_UID = '123456'
  
  const response = await fetch(
    `${BILIBILI_API_BASE}/space/arc/search?mid=${DEFAULT_UP_UID}&ps=30&pn=1`
  )
  const data = await response.json()
  
  return data.data.list.vlist.map((video: any) => ({
    bvid: video.bvid,
    title: video.title,
    cover: video.pic,
    author: video.author,
    duration: formatDuration(video.duration)
  }))
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
} 