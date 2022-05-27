import { Container } from '@mui/material'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { CHANNEL_NAME } from '../../constants'
import { useYoutubeApi } from '../../hooks'
import VideoDataTable from './components/VideoDataTable'
import ChannelInformation from './components/ChannelInformation'

const MainPage = () => {
  const { fetchChannelInfoByName, fetchSortedChannelVideos } = useYoutubeApi()

  const [pageToken, setPageToken] = useState('')

  const {
    data: channel,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery('channel', () => fetchChannelInfoByName(CHANNEL_NAME))

  const { data, isLoading: isFetchingVideos } = useQuery(
    ['videos', pageToken], // refetch once pageToken has changed
    () => fetchSortedChannelVideos({ channelId: channel?.id, pageToken }),
    { enabled: !!channel?.id }, // trigger once channel has been fetched
  )

  const { videoItems, pageInfo, nextPageToken, prevPageToken } = data ?? {}

  return (
    <Container maxWidth="lg" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>

      {channel && <ChannelInformation data={channel} />}

      <VideoDataTable
        itemsPerPage={10}
        data={videoItems}
        totalCount={pageInfo?.totalResults}
        onNextPageClick={() => setPageToken(nextPageToken)}
        onPrevPageClick={() => setPageToken(prevPageToken)}
        isLoading={isFetchingVideos}
      />
    </Container>
  )
}

export default MainPage
