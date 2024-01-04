'use client'

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { MouseEvent, useCallback, useState } from 'react'
import useMedia from '@/hook/useMedia'
import { ICardData } from './types'
import useAxiosWithAuth from '@/api/config'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { CalendarIcon, TagIcon, ThreeDotsIcon } from './icons'
import Image from 'next/image'

function leftPad(value: number) {
  if (value >= 10) {
    return value
  }

  return `0${value}`
}

function toStringByFormatting(source: Date, delimiter = '-') {
  const year = source.getFullYear()
  const month = leftPad(source.getMonth() + 1)
  const day = leftPad(source.getDate())

  return [year, month, day].join(delimiter)
}

const ShowcaseCard = ({ data }: { data: ICardData | undefined }) => {
  const { isPc } = useMedia()
  const [isTouched, setIsTouched] = useState(false)
  const axiosWithAuth = useAxiosWithAuth()

  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsTouched(!isTouched)
  }

  const clickLike = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/like/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          if (data.like < res.data.like) {
            data.liked = true
          } else {
            data.liked = false
          }
          data.like = res.data.like
        }
      })
  }, [data, axiosWithAuth])

  const clickFavorite = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    if (data.favorite) return alert('이미 관심을 추가한 팀입니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/favorite/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          data.favorite = true
        }
      })
  }, [data, axiosWithAuth])

  if (isPc) {
    return (
      <Stack direction={'row'} spacing={10}>
        <Card
          sx={{
            height: '36rem',
            backgroundColor: 'primary',
            width: '25rem',
          }}
        >
          {data !== undefined ? (
            <CardActions onClick={handleCardClick}>
              <CardContent>
                <Stack spacing={'1.5rem'}>
                  <Stack direction={'row'} height={'1.5rem'}>
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <Avatar
                        src={data.image!}
                        sx={{ width: '1.5rem', height: '1.5rem' }}
                      />
                      <Typography color={'text.alternative'} width={'11rem'}>
                        {data.name}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={'1rem'}>
                      <Stack direction={'row'} spacing={'0.5rem'}>
                        <IconButton
                          onClick={clickLike}
                          color={data.liked ? 'primary' : 'inherit'}
                          size="small"
                          sx={{
                            m: 0,
                            p: 0,
                          }}
                        >
                          <ThumbUpIcon />
                        </IconButton>
                        <Typography>{data.like}</Typography>
                      </Stack>

                      <IconButton
                        onClick={clickFavorite}
                        color={data.favorite ? 'primary' : 'inherit'}
                        size="small"
                        sx={{
                          m: 0,
                          p: 0,
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>

                      <IconButton
                        color="inherit"
                        sx={{
                          m: 0,
                          p: 0,
                        }}
                      >
                        <ThreeDotsIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Stack minHeight={'22.5rem'}>
                    <Typography>{data.description}</Typography>
                  </Stack>
                  <Stack spacing={'0.25rem'}>
                    <Stack
                      direction={'row'}
                      spacing={'1rem'}
                      textAlign={'center'}
                    >
                      <Stack direction={'row'} spacing={'0.5rem'}>
                        <CalendarIcon />
                        <Typography color={'text.alternative'}>
                          시작일
                        </Typography>
                        <Typography>
                          {toStringByFormatting(new Date(data.start))}
                        </Typography>
                      </Stack>
                      <Stack direction={'row'} spacing={'0.5rem'}>
                        <CalendarIcon />
                        <Typography color={'text.alternative'}>
                          종료일
                        </Typography>
                        <Typography>
                          {toStringByFormatting(new Date(data.end))}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      direction={'row'}
                      spacing={'1rem'}
                      textAlign={'center'}
                    >
                      <Stack direction={'row'} spacing={'0.5rem'}>
                        <TagIcon />
                        <Typography color={'text.alternative'}>
                          기술스택
                        </Typography>
                      </Stack>
                      {data.skill.map((skill, index) => (
                        <Typography key={skill.id + index}>
                          {skill.name}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </CardActions>
          ) : (
            <Typography>데이터가 없습니다.</Typography>
          )}
        </Card>
      </Stack>
    )
  }

  return (
    <Stack height={'70vh'} width={'100%'} alignItems={'center'}>
      {data === undefined ? (
        <>
          <Avatar
            src="/images/icons/icon-192x192.png"
            sx={{ width: '100%', height: '100%', mt: 10 }}
            variant="rounded"
          />
          <Card
            sx={{
              height: isTouched ? '80%' : '40%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              width: '100%',
            }}
          >
            <Typography>데이터가 없습니다.</Typography>
          </Card>
        </>
      ) : (
        <>
          <Image
            src={data ? data.image! : '/images/icons/icon-192x192.png'}
            width={300}
            height={500}
            alt="team image"
            // sx={{ width: '100%', height: '100%', mt: 10 }}
            // variant="rounded"
          />
          <Card
            sx={{
              height: isTouched ? '80%' : '40%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              width: '100%',
            }}
          >
            <CardActions onClick={handleCardClick}>
              <CardContent>
                <Stack direction={'row'}>
                  <Typography>팀 이미지</Typography>
                  <Typography>팀 이름: {data.name}</Typography>
                  <Stack direction={'row'}>
                    <IconButton onClick={clickLike}>
                      <ThumbUpIcon />
                    </IconButton>
                    <Typography>{data.like}</Typography>
                  </Stack>
                  <Typography>관심 추가</Typography>
                </Stack>
                <Typography>글 내용: {data.description}</Typography>
                <Stack>
                  <Stack direction={'row'}>
                    <Typography>시작일</Typography>
                    <Typography>종료일</Typography>
                  </Stack>
                  <Typography>기술 스택</Typography>
                </Stack>
              </CardContent>
            </CardActions>
          </Card>
        </>
      )}
    </Stack>
  )
}

export default ShowcaseCard
