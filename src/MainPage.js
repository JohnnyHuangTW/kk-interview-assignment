import { Avatar, Box, Container, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { CHANNEL_NAME } from './constants'
import { useYoutubeApi } from './hooks'
import VideoList from './components/VideoList'

const MainPage = () => {
  const { fetchChannelInfoByName, fetchSortedChannelVideos } = useYoutubeApi()

  const {
    data: channel,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery('channel', () => fetchChannelInfoByName(CHANNEL_NAME))

  const { data } = useQuery('videos', () => fetchSortedChannelVideos({ channelId: channel?.id }), {
    enabled: !!channel?.id,
  })

  const channelThumbnail = channel ? channel.thumbnails.default : {}

  return (
    <Container maxWidth="lg">

      {/* channel information */}
      {channel && (
        <Box
          sx={{
            display: 'flex',
            p: 4,
            gap: 2,
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            alignItems: 'center',
          }}

        >
          <Avatar
            src={channelThumbnail.url}
            sx={{ height: channelThumbnail.height, width: channelThumbnail.width }}
          />
          <Box>
            <Typography component="h1" variant="h4">
              {channel.title}
            </Typography>
            <Typography component="label" sx={{ typography: 'subtitle', color: 'text.secondary' }}>
              {channel.subscriberCount} 位訂閱者
            </Typography>
          </Box>
        </Box>
      )}

      <VideoList />

    </Container>
  )
}

export default MainPage
