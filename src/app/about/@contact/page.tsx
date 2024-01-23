import { Button, Card, Stack, TextField, Typography } from '@mui/material'

const ContactPage = () => {
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title1Emphasis">Contact us</Typography>
      </Stack>
      <Stack my={'2rem'}>
        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '1rem',
          }}
        >
          <Typography>
            저희는 여러분의 의견을 기다리고 있습니다! 버그를 포함한 다양한
            의견들을 전달해주시면, 운영을 해나가는데 보탬이 됩니다.
          </Typography>
          <br />
          <Typography variant="Body1Emphasis">
            메일을 보내실 때는 이걸 꼭 기억해주세요!
          </Typography>
          <br />
          <Typography>
            ☑️ 버그를 제보하실 때는 스크린샷을, 혹은 어떻게 증상이 나타났는지
            상세히 전달해주세요.
          </Typography>
          <Typography>
            ☑️ 운영진도 누군가의 사랑받는 사람입니다. 과격하고 인격모독적인
            표현은 삼가주세요.
          </Typography>
        </Card>
        <br />
        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '1rem',
          }}
        >
          <Stack spacing={'1rem'}>
            <Stack direction={'row'} spacing={'1rem'}>
              <TextField
                required
                autoComplete="off"
                placeholder="이름"
                variant="outlined"
                sx={{ width: '100%' }}
              />
              <TextField
                required
                autoComplete="off"
                placeholder="성"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Stack>
            <TextField
              required
              autoComplete="off"
              placeholder="이메일 주소"
              variant="outlined"
              sx={{ width: '100%' }}
            />
            <Stack direction={'row'} spacing={'1rem'}>
              <TextField
                autoComplete="off"
                placeholder="(선택사항)조직명"
                variant="outlined"
                sx={{ width: '100%' }}
              />
              <TextField
                autoComplete="off"
                placeholder="(선택사항)조직 웹 사이트"
                variant="outlined"
                sx={{ width: '100%' }}
              />
            </Stack>
            <TextField
              multiline
              rows={5}
              autoComplete="off"
              placeholder="문의사항을 기록해주세요."
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Stack>
        </Card>
        <br />
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button variant="contained" sx={{ width: 'fit-content' }}>
            문의사항 보내기
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ContactPage
