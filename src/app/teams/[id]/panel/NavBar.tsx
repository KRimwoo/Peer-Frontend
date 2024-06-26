'use client'

import { useRouter } from 'next/navigation'
import CuNavBar from '@/components/CuNavBar'
import {
  BoardIcon,
  MainIcon,
  NoticeIcon,
  PeerlogIcon,
  SettingIcon,
  ShowcaseIcon,
} from '@/icons/TeamPage'
import { Box } from '@mui/material'
import useMedia from '@/hook/useMedia'
import * as style from './NavBar.style'
import * as navStyle from '@/components/NavBarBox.style'

const getTabValue = (path: string) => {
  if (path.includes('/notice')) return 'notice'
  else if (path.includes('/board')) return 'board'
  else if (path.includes('/setting')) return 'setting'
  else if (path.includes('/peerlog')) return 'peerlog'
  else if (path.includes('/showcase')) return 'showcase'
  else return 'main'
}

const TeamSidebar = ({ id }: { id: string }) => {
  const router = useRouter()
  const { isPc, isLargeTablet } = useMedia()

  return (
    <Box sx={getNavStyle(isLargeTablet, isPc)}>
      <CuNavBar
        getTabValue={getTabValue}
        title={'나의 팀'}
        tabletMode
        tabData={[
          {
            label: '메인',
            onClick: () => router.push(`/teams/${id}`),
            value: 'main',
            icon: <MainIcon sx={style.main} />,
          },
          {
            label: '공지사항',
            onClick: () => router.push(`/teams/${id}/notice`),
            value: 'notice',
            icon: <NoticeIcon sx={style.notice} />,
          },
          {
            label: '게시판',
            onClick: () => router.push(`/teams/${id}/board`),
            value: 'board',
            icon: <BoardIcon sx={style.board} />,
          },
          {
            label: '팀설정',
            onClick: () => router.push(`/teams/${id}/setting`),
            value: 'setting',
            icon: <SettingIcon sx={style.setting} />,
          },
          {
            label: '피어로그',
            onClick: () => router.push(`/teams/${id}/peerlog`),
            value: 'peerlog',
            icon: <PeerlogIcon sx={style.peerlog} />,
            isSoon: true,
            disabled: true,
          },
          {
            label: '쇼케이스',
            onClick: () => router.push(`/teams/${id}/showcase`),
            value: 'showcase',
            icon: <ShowcaseIcon sx={style.showcase} />,
            isNew: true,
          },
        ]}
      />
    </Box>
  )
}

const getNavStyle = (isTablet: boolean, isPc: boolean) => {
  if (isTablet) return navStyle.tabletNavBar
  if (isPc) return navStyle.pcNavBar
  return navStyle.mobileNavBar
}

export default TeamSidebar
