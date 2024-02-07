'use client'

import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowcaseEditor from '../panel/ShowcaseEditor'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import CuCircularProgress from '@/components/CuCircularProgress'
import { useRouter, useSearchParams } from 'next/navigation'
import NoDataDolphin from '@/components/NoDataDolphin'
import Link from 'next/link'

const ShowCaseWritePage = () => {
  const router = useRouter()
  const params = useSearchParams()
  const teamId = params.get('showcaseId')
  const axiosWithAuth = useAxiosWithAuth()

  const { data, isLoading, error } = useSWR<IShowcaseEditorFields>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/write/${teamId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    { shouldRetryOnError: false },
  )

  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error) {
    if (error.response && error.response.status === 409) {
      return (
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '90vh',
          }}
        >
          <NoDataDolphin message={error.response.data.message} />
          <Link href={`../teams/${teamId}/setting`}>팀설정으로 돌아가기</Link>
        </Stack>
      )
    }
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>
  }

  return (
    <Stack direction={'column'} sx={{ overflow: 'auto' }}>
      {data && (
        <ShowcaseEditor
          data={data}
          teamId={Number(teamId)}
          requestMethodType={'post'}
          router={router}
        />
      )}
    </Stack>
  )
}

export default ShowCaseWritePage
