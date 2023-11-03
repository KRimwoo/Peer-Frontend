import { fetchServerData } from '@/api/fetchers'
import MainPage from './panel/MainPage'

export default async function Home() {
  const data = await fetchServerData(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=studies&sort=latest&page=1&pageSize=10&keyword=&due=&region=&place=&status=&tag=`
  )
  return <MainPage initData={data?.content} />
}
