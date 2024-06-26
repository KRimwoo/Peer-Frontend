import { MenuItem, Stack, Typography } from '@mui/material'
import { WifiClearIcon } from '../Icons'
import { Control, Controller } from 'react-hook-form'
import { Select } from '@mui/material'
import { TeamOperationForm, TeamStatus } from '@/app/teams/types/types'
import { ISetupTeam } from '../SettingTeamInfo'
import useMedia from '@/hook/useMedia'

interface ISettingTeamActivity {
  teamStatus: TeamStatus
  teamActivity: TeamOperationForm
  control: Control<ISetupTeam, any>
}

const SettingTeamActivity = ({
  teamStatus,
  teamActivity,
  control,
}: ISettingTeamActivity) => {
  const isPc = useMedia()
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      mb={'1.2rem'}
      mx={!isPc ? '0.5rem' : ''}
      spacing={'0.5rem'}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'0.35rem'}>
        <WifiClearIcon />
        <Typography variant="Body2Emphasis">활동방식</Typography>
      </Stack>
      <Controller
        name="operationForm"
        control={control}
        defaultValue={teamActivity}
        render={({ field }) => (
          <Select
            size="small"
            disabled={teamStatus === TeamStatus.COMPLETE}
            variant="outlined"
            defaultValue={teamActivity}
            sx={{
              m: 0,
              minWidth: '5rem',
            }}
            {...field}
          >
            {[
              TeamOperationForm.OFFLINE,
              TeamOperationForm.ONLINE,
              TeamOperationForm.MIX,
            ].map((operation) => (
              <MenuItem key={operation} value={operation}>
                {operation === TeamOperationForm.OFFLINE && (
                  <Typography variant="Body2">오프라인</Typography>
                )}
                {operation === TeamOperationForm.ONLINE && (
                  <Typography variant="Body2">온라인</Typography>
                )}
                {operation === TeamOperationForm.MIX && (
                  <Typography variant="Body2">온/오프라인</Typography>
                )}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Stack>
  )
}

export default SettingTeamActivity
