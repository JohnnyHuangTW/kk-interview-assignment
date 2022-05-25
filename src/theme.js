import { createTheme } from '@mui/material/styles'

export default createTheme({
  palette: {
    google: {
      main: '#de5246',
      dark: '#a1271c',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})
