import { Container } from '@mui/material'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { CHANNEL_NAME } from '../../constants'
import { useGoogleAuth, useYoutubeApi } from '../../hooks'
import VideoDataTable from './components/VideoDataTable'
import ChannelInformation from './components/ChannelInformation'
import VideoPlayerModal from './components/VideoPlayerModal'
import { ChannelInformationSkeleton, VideoDataTableSkeleton } from './components/Skeleton'

const MainPage = () => {
  const { isClientReady } = useGoogleAuth()
  const { fetchChannelInfoByName, fetchSortedChannelVideos } = useYoutubeApi()
  const [pageToken, setPageToken] = useState('')
  const [selectedVideoId, setSelectedVideoId] = useState(null)

  const { data: channel, isLoading: isFetchingChannel } = useQuery(
    'channel',
    () => fetchChannelInfoByName(CHANNEL_NAME),
    { enabled: isClientReady }, // trigger once client api is ready
  )

  const { data: channelVideos, isLoading: isFetchingVideos } = useQuery(
    ['videos', pageToken], // refetch once pageToken has changed
    () => fetchSortedChannelVideos({ channelId: channel?.id, pageToken }),
    { enabled: !!channel?.id }, // trigger once channel has been fetched
  )

  const { videoItems, pageInfo, nextPageToken, prevPageToken } = channelVideos ?? {}

  return (
    <Container maxWidth="lg" sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      {isFetchingChannel ? (
        <>
          <ChannelInformationSkeleton />
          <VideoDataTableSkeleton />
        </>
      ) : (
        <>
          {channel && <ChannelInformation data={channel} />}
          <VideoDataTable
            itemsPerPage={10}
            data={videoItems}
            totalCount={pageInfo?.totalResults}
            onNextPageClick={() => setPageToken(nextPageToken)}
            onPrevPageClick={() => setPageToken(prevPageToken)}
            isLoading={isFetchingVideos}
            onVideoClick={setSelectedVideoId}
          />
        </>
      )}

      <VideoPlayerModal videoId={selectedVideoId} onClose={() => setSelectedVideoId(null)} />
    </Container>
  )
}

export default MainPage
