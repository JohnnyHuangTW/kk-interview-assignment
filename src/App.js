import './App.css'
import { useQuery } from 'react-query'
import { CHANNEL_NAME } from './constants'
import { useGoogleAuth, useYoutubeApi } from './hooks'
import VideoList from './components/VideoList'

const App = () => {
  const { isSignIn, authenticate, signOut } = useGoogleAuth()
  const { fetchChannelInfoByName, fetchSortedChannelVideos } = useYoutubeApi()

  const {
    data: channel,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery('channel', () => fetchChannelInfoByName(CHANNEL_NAME), { enabled: isSignIn })

  const { data } = useQuery('videos', () => fetchSortedChannelVideos({ channelId: channel?.id }), {
    enabled: !!channel?.id,
  })

  return (
    <div>
      Login: {String(isSignIn)}
      <br />
      <button onClick={authenticate}>login</button>
      <br />
      <button onClick={signOut}>logout</button>
      <VideoList />
    </div>
  )
}

export default App
