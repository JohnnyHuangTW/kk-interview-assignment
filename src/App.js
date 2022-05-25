import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import { useQuery } from 'react-query'
import { Button, CssBaseline } from '@mui/material'
import { CHANNEL_NAME } from './constants'
import { useGoogleAuth, useYoutubeApi } from './hooks'
import theme from './theme'
// pages
import SignInPage from './pages/SignInPage'
// components
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isSignIn && <SignInPage />}
      {isSignIn && (
        <div>
          <Button onClick={signOut}>log out</Button>
        </div>
      )}
    </ThemeProvider>
  )
}

export default App
