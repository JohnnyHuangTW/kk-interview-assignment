import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import { useQuery } from 'react-query'
import { Button, CssBaseline } from '@mui/material'
import { CHANNEL_NAME } from './constants'
import { useGoogleAuth, useYoutubeApi } from './hooks'
import theme from './theme'
import SignInPage from './SignInPage'
import Header from './Header'

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
      <Header />
      {!isSignIn && <SignInPage />}

    </ThemeProvider>
  )
}

export default App
