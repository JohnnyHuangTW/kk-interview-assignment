import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from './theme'
import { useGoogleAuth } from './hooks'
import { Header, MainPage, SignInPage } from './containers'

const App = () => {
  const { isSignIn, isGApiReady, isClientReady } = useGoogleAuth()

  // waiting for gapi initializing...
  if (!isGApiReady) return null

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      {!isSignIn && <SignInPage />}

      {isSignIn && isClientReady && <MainPage />}
    </ThemeProvider>
  )
}

export default App
