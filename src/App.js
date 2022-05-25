import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useGoogleAuth } from './hooks'
import theme from './theme'
import SignInPage from './SignInPage'
import Header from './Header'
import MainPage from './MainPage'

const App = () => {
  const { isSignIn } = useGoogleAuth()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      {!isSignIn && <SignInPage />}

      {isSignIn && <MainPage />}

    </ThemeProvider>
  )
}

export default App
