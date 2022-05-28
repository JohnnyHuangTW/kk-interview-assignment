import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from './theme'
import { useGoogleAuth } from './hooks'
import { Header, MainPage, SignInPage } from './containers'

const App = () => {
  const { isSignIn, isGApiReady, isClientReady, error } = useGoogleAuth()

  // waiting for gapi initializing...
  if (!isGApiReady) return error || 'initializing gapi...'

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      {/* show sign in page when user hasn't signed in  */}
      {!isSignIn && <SignInPage />}

      {/* render when user has signed in and the gapi client is ready */}
      {isSignIn && isClientReady && <MainPage />}

    </ThemeProvider>
  )
}

export default App
