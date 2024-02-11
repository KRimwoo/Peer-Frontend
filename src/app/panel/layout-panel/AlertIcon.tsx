'use client'

import {
  Badge,
  Card,
  Drawer,
  Stack,
  Tab,
  Tabs,
  Typography,
  createSvgIcon,
} from '@mui/material'
import { IconButton } from '@mui/material'
import { SyntheticEvent, useCallback, useState } from 'react'
import { Box } from '@mui/system'
import NotificationIcon from '@/icons/NotificationIcon'
import useMedia from '@/hook/useMedia'
import { CloseIcon } from '@/icons'

enum AlertType {
  MESSAGE = '쪽지',
  TEAM = '팀',
  NOTICE = '공지',
}

interface IAlert {
  id: number
  type: AlertType
  title: string
  content: string
}

const mockData = [
  {
    id: 1,
    type: AlertType.MESSAGE,
    title: '알림1',
    content:
      '알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용',
  },
  {
    id: 2,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 3,
    type: AlertType.NOTICE,
    title: '알림3',
    content: '알림3 내용',
  },
]

const SystemIcon = createSvgIcon(
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="20" fill="#FF6D4D" fillOpacity="0.2" />
    <path
      d="M7.86963 17.4082C7.85693 19.5156 8.96777 21.623 10.8276 22.4229L9.98975 23.5527C8.66943 22.9434 7.70459 21.731 7.17139 20.2329C6.64453 21.8452 5.6543 23.1655 4.26416 23.8193L3.40088 22.6387C5.31152 21.8135 6.42871 19.6235 6.43506 17.4082V15.5801H7.86963V17.4082ZM11.6528 26.1426V14.6533H13.0747V26.1426H11.6528ZM20.6919 16.2275C20.6919 17.9985 22.4248 19.7822 24.8306 20.2012L24.1958 21.3818C22.2725 20.9819 20.6982 19.814 19.9492 18.2715C19.1938 19.8013 17.6196 20.9756 15.7026 21.3818L15.0806 20.2012C17.4482 19.7695 19.1875 17.9922 19.1938 16.2275V15.377H20.6919V16.2275ZM14.7632 24.6699V23.502H25.2495V24.6699H14.7632ZM30.8481 15.3643V16.5068H27.8394V17.5859H30.4165V18.6777H27.8394V19.8584C29.2104 19.8457 30.1626 19.7886 31.2798 19.5918L31.4321 20.6963C30.1055 20.9375 29.0137 20.9883 27.2427 20.9883H26.481V15.3643H30.8481ZM28.0679 25.9902V22.0039H35.812V25.9902H28.0679ZM29.4771 24.8477H34.4155V23.1211H29.4771V24.8477ZM30.9116 18.6016V17.459H32.2065V14.8438H33.5522V21.4326H32.2065V18.6016H30.9116ZM34.4663 21.5215V14.6533H35.812V21.5215H34.4663Z"
      fill="#FF5833"
    />
  </svg>,
  'SystemIcon',
)

const MessageIcon = createSvgIcon(
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="20" fill="#4E6ED4" fillOpacity="0.2" />
    <path
      d="M12.8525 16.2529C12.8462 16.8369 13.3794 17.5732 14.3696 17.9731C15.3408 17.5796 15.8613 16.8623 15.8613 16.2529V16.2021H14.5918V15.0596H18.8828V16.2021H17.2959V16.291C17.2896 17.0781 17.9814 17.9478 19.3652 18.2715L18.7559 19.2998C17.6323 19.0142 16.896 18.373 16.5215 17.5986C16.1406 18.2905 15.436 18.8872 14.3633 19.1475C13.2905 18.8682 12.5859 18.2651 12.1987 17.5796C11.8306 18.3477 11.1006 19.0078 9.9834 19.2998L9.38672 18.2715C10.7324 17.9287 11.4497 17.021 11.4561 16.291V16.2021H9.83105V15.0596H14.1348V16.2021H12.8525V16.2529ZM9.14551 21.3438V20.2139H13.665V19.1982H15.0615V20.2139H19.6064V21.3438H9.14551ZM10.2754 23.4893V22.3594H18.3242V26.1299H16.9023V23.4893H10.2754ZM24.71 17.916C24.71 19.7949 25.8145 21.7754 27.668 22.5498L26.8936 23.667C25.5352 23.0767 24.5449 21.877 24.0181 20.417C23.4912 21.9912 22.4819 23.3115 21.1426 23.9463L20.3301 22.8418C22.1392 22.0039 23.269 19.8647 23.2754 17.916V16.9512H20.749V15.7832H27.2236V16.9512H24.71V17.916ZM28.5059 26.1299V14.6533H29.9277V26.1299H28.5059Z"
      fill="#3A5DCF"
    />
  </svg>,
  'MessageIcon',
)

const TeamIcon = createSvgIcon(
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="20" fill="#53B309" fillOpacity="0.2" />
    <path
      d="M20.9458 15.3262V16.4688H16.8325V17.5352H20.6157V18.6396H16.8325V19.7695C18.978 19.7695 20.2856 19.7314 21.7964 19.4775L21.936 20.582C20.292 20.8677 18.8511 20.8994 16.3755 20.8867H15.3979V15.3262H20.9458ZM16.7056 25.9902V21.9912H24.3228V25.9902H16.7056ZM18.1021 24.8477H22.939V23.083H18.1021V24.8477ZM22.9009 21.4834V14.666H24.3228V21.4834H22.9009Z"
      fill="#489B08"
    />
  </svg>,
  'TeamIcon',
)

const AlertIcon = () => {
  // const isAlertComing = false
  const [alertData, setAlertData] = useState<IAlert[]>(mockData)
  const [tabvalue, setTabValue] = useState(0)
  const [isAlertComing, setIsAlertComing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { isPc } = useMedia()
  // const { isOpen, openModal, closeModal } = useModal()

  const openAlertTab = useCallback(() => {
    setIsAlertComing(true)
    setIsDrawerOpen(true)
  }, [setIsAlertComing, setIsDrawerOpen])

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsDrawerOpen(open)
    },
    [setIsDrawerOpen],
  )

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleDelete = (id: number) => {
    console.log('delete')
    setAlertData(alertData.filter((item) => item.id !== id))
  }

  return (
    <>
      <IconButton color="inherit" aria-label="alert_tab" onClick={openAlertTab}>
        <Badge color="secondary" variant="dot" invisible={isAlertComing}>
          <NotificationIcon
            sx={{
              color: isPc ? 'text.alternative' : 'text.normal',
              width: '1.25rem',
              height: '1.25rem',
            }}
          />
        </Badge>
      </IconButton>
      {/* <CuModal open={isOpen} onClose={closeModal} title="잠깐!">
        <ForbiddenDolphin message="알림 기능은 조금만 기다려주세요!!" />
      </CuModal> */}
      <Drawer
        PaperProps={{ sx: { backgroundColor: 'background.primary' } }}
        variant="temporary"
        anchor={'right'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Box
          sx={{
            width: 400,
            height: '100svh',
            pt: 7,
            backgroundColor: 'background.primary',
          }}
          role="presentation"
        >
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            알림
          </Typography>
          <Tabs
            variant="fullWidth"
            value={tabvalue}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { display: 'none' },
            }}
          >
            <Tab label="전체" />
            <Tab label="쪽지" />
            <Tab label="팀" />
            <Tab label="공지" />
          </Tabs>
          {alertData.map((item) => (
            <Card
              key={item.id}
              sx={{
                m: 2,
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Stack p={'0.5rem'} flex={1}>
                {item.type === '쪽지' && <SystemIcon fontSize="large" />}
                {item.type === '팀' && <TeamIcon fontSize="large" />}
                {item.type === '공지' && <MessageIcon fontSize="large" />}
              </Stack>
              <Stack
                direction={'row'}
                spacing={1}
                display={'flex'}
                alignItems={'center'}
                flex={8}
              >
                <Typography
                  variant="body1"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.content}
                </Typography>
              </Stack>
              <Stack flex={1}>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Card>
          ))}
        </Box>
      </Drawer>
    </>
  )
}

export default AlertIcon
