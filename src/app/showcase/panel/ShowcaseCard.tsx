'use client'

import {
  Button,
  CardContent,
  SxProps,
  Typography,
  Card,
  CardHeader,
  Chip,
  Stack,
  CircularProgress,
  CardActionArea,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Members from './Members'
import DropdownMenu from '@/components/DropdownMenu'
import useMedia from '@/hook/useMedia'
import * as style from './ShowcaseCard.style'
import { IShowcaseTag } from '@/app/showcase/panel/types'
import PostCard from './PostCard'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import ReportMenuItem from '@/components/dropdownMenu/ReportMenuItem'

interface IShowcaseCardBack {
  content: string
  memberImage: Array<{ url: string }>
  recruitmentQuota: number
}

const ShowcaseCardBack = ({
  postId,
  sx,
  onClick,
  flipped,
  cardWidth,
  title,
  currentDomain,
}: {
  postId: number
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
  flipped?: boolean
  title: string
  cardWidth: number
  currentDomain: string
}) => {
  const [data, setData] = useState<IShowcaseCardBack | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { isPc } = useMedia()

  const getLineCount = (originHeight: number, lineHeight: number) => {
    const lineCount = Math.floor((cardWidth * originHeight) / 328 / lineHeight)
    return lineCount ? lineCount : 1
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log(`fetchData ${postId}`)
      setIsLoading(true)
      setData({
        content:
          '모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.\n\n모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다. 모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.모집글의 요약형태가 이 곳에 보여집니다.',
        memberImage: [{ url: 'https://picsum.photos/200' }],
        recruitmentQuota: 10,
      })
      setIsLoading(false)
    }
    if (!isLoading && !data && flipped) fetchData()
  }, [flipped])

  const handleSeeAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/showcase/${postId}`)
  }

  return (
    <Card
      sx={{
        ...sx,
        transform: 'rotateY(180deg) translate(50%, 0)',
        backfaceVisibility: 'hidden',
        padding: '1rem',
      }}
    >
      {data ? (
        <Stack
          direction={'column'}
          justifyContent={'space-between'}
          alignItems={'stretch'}
          height={'100%'}
          width={'100%'}
          spacing={'1rem'}
        >
          <Stack
            direction="row"
            justifyContent={'space-between'}
            height={'2.5rem'}
            alignItems={'center'}
            sx={{ width: '100%' }}
          >
            <CardContent sx={{ padding: 0, flexGrow: 1 }} onClick={onClick}>
              <Chip
                label={
                  <Typography variant="Tag" color={'green.normal'}>
                    {'프로젝트'}
                  </Typography>
                }
                sx={style.cardChipStyleBase}
              />
            </CardContent>
            <CardActionArea sx={{ padding: 0, width: 'auto' }}>
              <DropdownMenu>
                <ShareMenuItem
                  title={title}
                  url={`${currentDomain}/recruit/${postId}`}
                  content={data.content}
                />
                {/* TODO : 모집글 작성자 아이디 가져올 수 있는 방법 찾기 */}
                <ReportMenuItem targetId={postId} />
              </DropdownMenu>
            </CardActionArea>
          </Stack>
          <CardHeader
            title={
              <Typography
                variant="Body1"
                color={'text.normal'}
                sx={{
                  ...style.cardTitleStyleBase,
                  height: isPc ? '46px' : getLineCount(46, 22.5) * 22.5,
                  WebkitLineClamp: isPc
                    ? 2
                    : getLineCount(46, 22.5) /* 라인수 */,
                }}
              >
                {/* {title} */}
                제목이 들어오는 자리입니다. 제목이 들어오는 자리입니다. 제목이
                들어오는 자리입니다. 제목이 들어오는 자리입니다. 제목이 들어오는
                자리입니다.
              </Typography>
            }
            sx={{ padding: 0, maxHeight: '3rem', flexGrow: 1 }}
            onClick={onClick}
          ></CardHeader>
          <CardContent
            sx={{
              flexGrow: 1,
              padding: 0,
            }}
            onClick={onClick}
          >
            <Typography
              variant="Caption"
              color={'text.alternative'}
              // ref={containerRef}
              sx={{
                ...style.cardContentStyleBase,
                height: isPc ? '11.25rem' : getLineCount(180, 18) * 18,
                WebkitLineClamp: isPc ? 10 : getLineCount(180, 18) /* 라인수 */,
              }}
            >
              {data.content.split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                )
              })}
            </Typography>
          </CardContent>
          <CardContent sx={{ padding: 0 }} onClick={onClick}>
            <Members
              members={data.memberImage}
              recruitmentQuota={data.recruitmentQuota}
            />
          </CardContent>
          <CardContent
            sx={{ position: 'relative', bottom: 0, height: '2.75rem' }}
            onClick={onClick}
          >
            <Button
              onClick={handleSeeAll}
              variant="contained"
              sx={style.cardMoreButtonStyle}
            >
              전체 보기
            </Button>
          </CardContent>
        </Stack>
      ) : (
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          width={1}
          height={1}
        >
          <CircularProgress />
        </Stack>
      )}
    </Card>
  )
}

const ShowcaseCard = ({
  authorImage,
  teamName,
  title,
  tagList,
  image,
  postId,
  dragged,
  setDragged,
  sx,
}: {
  authorImage: string
  teamName: string
  title: string
  tagList: Array<IShowcaseTag>
  image: string | null
  postId: number
  sx?: SxProps
  dragged: boolean
  setDragged: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const [currentDomain, setCurrentDomain] = useState('')
  const { isPc } = useMedia()

  useEffect(() => {
    // 현재 도메인 설정
    setCurrentDomain(window.location.origin)

    // 카드 너비 설정
    setCardWidth(
      isPc ? window.innerWidth * 0.9 : (window.innerHeight * 0.8 * 328) / 800,
    )
    const handleResize = () => {
      const newCardWidth = isPc
        ? window.innerWidth * 0.9
        : (window.innerHeight * 0.8 * 328) / 800
      setCardWidth(newCardWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!dragged) {
      setIsFlipped((prev) => !prev)
    }
    setDragged(false)
  }

  return (
    <div
      style={{
        transform: ` rotateY(${isFlipped ? '180deg' : '0deg'})`,
        transformStyle: 'preserve-3d',
        width: '100%',
        height: '100%',
        transition: 'transform 0.5s ease',
      }}
    >
      <PostCard
        postId={postId}
        authorImage={authorImage}
        teamName={teamName}
        title={title}
        tagList={tagList}
        image={image ? image : '/image/logo.png'}
        sx={{
          ...sx,
          backfaceVisibility: 'hidden',
          transform: 'translate(-50%, 0)',
          width: isPc ? '90%' : '90vw',
        }}
      />
      <ShowcaseCardBack
        postId={postId}
        sx={sx}
        onClick={handleMouseUp}
        flipped={isFlipped}
        title={title}
        cardWidth={cardWidth}
        currentDomain={currentDomain}
      />
    </div>
  )
}

export { ShowcaseCard, ShowcaseCardBack }
