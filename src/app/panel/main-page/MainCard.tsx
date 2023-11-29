import { IMainCard, ITag } from '@/types/IPostDetail'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  Stack,
} from '@mui/material'
import Link from 'next/link'
import OthersProfile from '../OthersProfile'
import TagChip from '@/components/TagChip'
import FavoriteButton from '@/components/FavoriteButton'

const MainCard = ({
  title,
  image,
  user_id,
  user_nickname,
  user_thumbnail,
  status,
  tagList,
  favorite,
  recruit_id,
  type,
}: IMainCard) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        href={`/recruit/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="userImage"
          />
          <Chip
            label={
              status === 'ONGOING'
                ? '모집중'
                : status === 'BEFORE'
                  ? '모집전'
                  : '모집완료'
            }
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              borderRadius: 1,
              backgroundColor: 'black',
              color: 'white',
            }}
            size="medium"
          />
        </Box>
      </Link>
      <CardHeader
        avatar={
          <OthersProfile userId={user_id} name={user_nickname}>
            <Avatar aria-label="profile">
              <Box
                component="img"
                height="194"
                src={user_thumbnail}
                alt="profile image"
              />
            </Avatar>
          </OthersProfile>
        }
        action={<FavoriteButton favorite={favorite} recruit_id={recruit_id} />}
        title={user_nickname}
      />
      <Link
        href={`/recruit/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Stack gap={1} direction={'row'}>
            {tagList?.map(({ name, color }: ITag, idx: number) => (
              <TagChip name={name} color={color} key={idx} />
            ))}
          </Stack>
        </CardContent>
      </Link>
    </Card>
  )
}

export default MainCard
