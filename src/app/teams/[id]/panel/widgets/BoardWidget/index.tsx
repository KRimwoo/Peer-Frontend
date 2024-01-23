'use client'

import { useParams } from 'next/navigation'
import dayjs from 'dayjs'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import useModal from '@/hook/useModal'
import useMedia from '@/hook/useMedia'
import { NoticeIcon } from '@/icons/TeamPage'
import { SizeType } from '@/types/ITeamDnDLayout'
import { ITeamNotice } from '@/types/TeamBoardTypes'
import WidgetCard from '../WidgetCard'
import * as style from './index.style'
import { Stack, Typography } from '@mui/material'

interface IBoardWidgetRenderProps {
  isPc?: boolean
  teamId?: string | string[]
  postId?: number
  listData?: ITeamNotice[]
}

interface IBoardWidgetContainerProps {
  openModal: () => void
  isPc: boolean
  children: React.ReactNode
}

interface IBoardWidgetItemProps {
  title: string
  authorNickname: string
  createdAt: Date
  content?: string
}

const BoardWidget = ({ size }: { size: SizeType }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { isPc } = useMedia()
  const { id } = useParams()
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR(
    `/api/v1/team/notice/${id}?pageSize=${8}page=${1}keyword=`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  if (isLoading)
    return (
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        <CuCircularProgress color={'secondary'} />
      </BoardWidgetContainer>
    )
  if (!data || error)
    return (
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        <StatusMessage message={'글을 불러오는 중 문제가 발생했습니다.'} />
      </BoardWidgetContainer>
    )
  if (data.content.length === 0)
    return (
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        <StatusMessage message={'등록된 글이 없습니다.'} />
      </BoardWidgetContainer>
    )

  return (
    <>
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        {size === 'L' ? (
          <BoardWidgetList isPc={isPc} listData={data.content} />
        ) : (
          <BoardWidgetSingle postId={data.content[0].postId} />
        )}
      </BoardWidgetContainer>
      {/* 모달 */}
    </>
  )
}

const BoardWidgetContainer = ({
  openModal,
  isPc,
  children,
}: IBoardWidgetContainerProps) => {
  return (
    <WidgetCard
      onClick={openModal}
      contentSx={isPc ? style.widgetContent : style.mobileWidgetContent}
    >
      <Stack spacing={isPc ? '1.5rem' : '0.5rem'}>
        <Stack direction={'row'} spacing={'0.25rem'}>
          <NoticeIcon sx={style.titleIcon} />
          <Typography variant={'Title3Emphasis'}>공지사항</Typography>
        </Stack>
        {children}
      </Stack>
    </WidgetCard>
  )
}

const BoardWidgetList = ({ isPc, listData }: IBoardWidgetRenderProps) => {
  // size l
  return (
    <Stack spacing={isPc ? '1rem' : '0,5rem'}>
      {listData
        ?.slice(0, 4)
        .map((item) => <BoardWidgetItem key={item.postId} {...item} />)}
    </Stack>
  )
}

const BoardWidgetSingle = ({ postId }: IBoardWidgetRenderProps) => {
  // size m
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR(
    `/api/v1/team/notice/${postId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (!data || error)
    return <StatusMessage message="글을 불러오는 중 문제가 발생했습니다." />
  return <div>{data?.title}</div>
}

const StatusMessage = ({ message }: { message: string }) => {
  return (
    <Typography variant={'Body2'} color={'text.alternative'}>
      {message}
    </Typography>
  )
}

const BoardWidgetItem = ({
  title,
  authorNickname,
  content,
  createdAt,
}: IBoardWidgetItemProps) => {
  return (
    <Stack spacing={'0.25rem'}>
      <Typography variant={'Body1'} color={'text.normal'}>
        {title}
      </Typography>
      {content && (
        <Typography
          variant={'Body2'}
          color={'text.alternative'}
          sx={{ marginBottom: '0.75rem' }}
        >
          {content}
        </Typography>
      )}
      <Stack direction={'row'} spacing={'0.5rem'}>
        <Typography variant={'Body2'} color={'text.alternative'}>
          {authorNickname}
        </Typography>
        <Typography variant={'Body2'} color={'text.alternative'}>
          {dayjs(createdAt).format('MM월 DD일')}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default BoardWidget
