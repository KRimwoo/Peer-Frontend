import { Box, Button, FormControl, Stack, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import BasicSelectMember from './BasicSelectMember'
import { IRoleWrite } from '@/types/IPostDetail'
import useMedia from '@/hook/useMedia'
import { CloseIcon } from '@/icons'

// 해당 컴포넌트에는 react-hook-form을 제대로 적용하지 않았습니다.
const SetTeamRole = ({
  roleData,
  setRoleData,
  disabled,
}: {
  roleData: IRoleWrite[]
  setRoleData: (roleData: IRoleWrite[]) => void
  disabled?: boolean
}) => {
  const [role, setRole] = useState<string>('')
  const [member, setMember] = useState('')
  const { isPc } = useMedia()

  const onHandlerEditRole = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as string)
  }

  const onHandlerAddRole = () => {
    if (role === '' || member === '') return
    setRoleData([...roleData, { name: role, number: parseInt(member) }])
    setRole('')
    setMember('')
  }

  const onHandlerRemove = (index: number) => {
    setRoleData(roleData.filter((_, i) => i !== index))
  }

  return (
    <Box>
      <Stack direction={'row'} gap={2}>
        <TextField
          sx={isPc ? { width: '26rem' } : { width: '100%' }}
          variant="outlined"
          value={role}
          onChange={onHandlerEditRole}
          placeholder={
            isPc
              ? '모집하는 역할을 입력해주세요, ex) 프론트엔드 개발자, 디자이너'
              : '모집 역할을 입력해주세요.'
          }
          disabled={disabled ? disabled : false}
        />
        <BasicSelectMember
          member={member}
          setMember={setMember}
          disabled={disabled}
        />
        <Button
          sx={{ padding: '0.25rem' }}
          onClick={onHandlerAddRole}
          disabled={disabled ? disabled : false}
        >
          추가
        </Button>
      </Stack>
      <FormControl>
        {roleData?.map((data, index) => {
          if (data.name === '' || data.number === 0) {
            return
          }
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
              }}
            >
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
                gap={2}
              >
                <TextField
                  sx={isPc ? { width: '26rem' } : { width: '90%' }}
                  value={data.name}
                  disabled={true}
                />
                <TextField
                  sx={isPc ? { width: '3rem' } : { width: '90%' }}
                  value={data.number}
                  disabled={true}
                />
                <Button
                  onClick={() => {
                    console.log('on remove', index)
                    onHandlerRemove(index)
                  }}
                  sx={{ width: '4%' }}
                >
                  <CloseIcon color="primary" />
                </Button>
              </Stack>
            </Box>
          )
        })}
      </FormControl>
    </Box>
  )
}

export default SetTeamRole
