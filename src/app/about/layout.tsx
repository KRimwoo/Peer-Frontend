'use client'

import useMedia from '@/hook/useMedia'
import { Button, ButtonGroup, Stack, Typography, styled } from '@mui/material'
import { ReactNode, useState } from 'react'

const StyledButtonGroup = styled(ButtonGroup)({
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    borderColor: 'transparent',
  },
})

interface SidebarProps {
  handleSidebar: (number: number) => void
}

const Sidebar = ({ handleSidebar }: SidebarProps) => {
  return (
    <Stack>
      <Typography variant="Title1Emphasis">About Us</Typography>
      <StyledButtonGroup variant="text" orientation="vertical">
        <Button onClick={() => handleSidebar(0)}>
          Peer는 어떤 커뮤니티인가
        </Button>
        <Button onClick={() => handleSidebar(1)}>Peer 철학 & 비전</Button>
        <Button onClick={() => handleSidebar(2)}>공지사항</Button>
        <Button onClick={() => handleSidebar(3)}>Peer 개발백서</Button>
        <Button onClick={() => handleSidebar(4)}>Contact us</Button>
        <Button onClick={() => handleSidebar(5)}>개인정보 보호 방침</Button>
        <Button onClick={() => handleSidebar(6)}>통합 서비스 이용약관</Button>
      </StyledButtonGroup>
    </Stack>
  )
}

interface AboutPageProps {
  contact: ReactNode
  personal: ReactNode
  notice: ReactNode
  mind: ReactNode
  dictionary: ReactNode
  service: ReactNode
  peer: ReactNode
}

const AboutPage = (props: AboutPageProps) => {
  const [active, setActive] = useState(0)
  const { isPc } = useMedia()

  const handleSidebar = (value: number) => {
    setActive(value)
  }

  return (
    <Stack mx={'5rem'} my={'1rem'}>
      {isPc ? (
        <Stack display={'flex'} direction={'row'}>
          <Stack flex={1}>
            <Sidebar handleSidebar={handleSidebar} />
          </Stack>
          <Stack flex={3}>
            {active === 0 && props.peer}
            {active === 1 && props.mind}
            {active === 2 && props.notice}
            {active === 3 && props.dictionary}
            {active === 4 && props.contact}
            {active === 5 && props.personal}
            {active === 6 && props.service}
          </Stack>
        </Stack>
      ) : (
        <Stack></Stack>
      )}
    </Stack>
  )
}

export default AboutPage
