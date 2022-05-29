import './App.css'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Alert, CssBaseline, Snackbar } from '@mui/material'
import theme from './theme'
import { useGoogleAuth, useYoutubeApi } from './hooks'
import { Header, MainPage, SignInPage } from './containers'
import { Spinner } from './components'

const App = () => {
  const { isSignIn, isGApiReady, isClientReady, error: googleAuthError } = useGoogleAuth()
  const { error: youtubeApiError } = useYoutubeApi()
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const showSnackbar = () => {
    setIsSnackbarOpen(true)
  }

  const closeSnackbar = (event, reason) => {
    // do nothing when user click outside the snackbar
    if (reason === 'clickaway') {
      return
    }
    setIsSnackbarOpen(false)
  }

  // show error message once received error from google auth or youtube api
  useEffect(() => {
    if (googleAuthError || youtubeApiError) {
      setErrorMessage(googleAuthError || youtubeApiError)
      showSnackbar()
    }
  }, [googleAuthError, youtubeApiError])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      {/* waiting for gapi initializing... */}
      <Spinner open={!isGApiReady} />

      {/* show sign in page when user hasn't signed in  */}
      {isGApiReady && !isSignIn && <SignInPage />}

      {/* render when user has signed in and the gapi client is ready */}
      {isSignIn && isClientReady && <MainPage />}

      <Snackbar
        open={isSnackbarOpen}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: 1 }}>
          {errorMessage}
        </Alert>
      </Snackbar>

    </ThemeProvider>
  )
}

export default App
