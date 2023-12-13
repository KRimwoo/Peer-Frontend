import { IFormInterview } from '@/types/IPostDetail'
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

const Answers = ({ data }: { data: IFormInterview }) => {
  console.log('data.type', data.type)
  switch (data.type) {
    case 'close': {
      return (
        <Box>
          <RadioGroup
            aria-labelledby="muitiple-radio-buttons-group-label"
            name="multiple-radio-buttons-group"
          >
            {data.optionList?.map((option, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={true}
                />
              )
            })}
          </RadioGroup>
        </Box>
      )
    }
    case 'open': {
      return (
        <TextField
          variant="standard"
          value={'주관식 답변입니다.'}
          disabled={true}
        />
      )
    }
    case 'check': {
      return (
        <Box>
          <FormGroup sx={{ paddingLeft: '10px' }}>
            {data.optionList?.map((option, index) => {
              return (
                <Box key={index}>
                  <Typography>{`${index}번째 옵션`}</Typography>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={``}
                    disabled={true}
                  />
                  <TextField variant="standard" value={option} />
                </Box>
              )
            })}
          </FormGroup>
        </Box>
      )
    }
    case 'ratio': {
      if (!data?.optionList) return
      const maxNumber = parseInt(data.optionList[0])

      return (
        <Box>
          <RadioGroup
            aria-labelledby="muitiple-radio-buttons-group-label"
            name="multiple-radio-buttons-group"
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {Array.from({ length: maxNumber }, (_, i) => i + 1).map(
                (num, index) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <FormControlLabel
                      value={`${num}`}
                      control={<Radio />}
                      label={``}
                      disabled={true}
                    />
                    {num === 1 && data.optionList ? data.optionList[1] : null}
                    {num === maxNumber && data.optionList
                      ? data.optionList[2]
                      : null}
                  </Box>
                ),
              )}
            </Box>
          </RadioGroup>
        </Box>
      )
    }
    default:
      return
  }
}

export default Answers
