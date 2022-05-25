import React from 'react'
import { Container, Box, Avatar, Typography, Link, Button } from '@mui/material'
import { LockClockOutlined, Google } from '@mui/icons-material'
import { useGoogleAuth } from '../hooks'

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Johnny Huang
    </Link>{' '}
    {new Date().getFullYear()}.
  </Typography>
)

const SignInPage = () => {
  const { authenticate } = useGoogleAuth()
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        height: '80vh',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto',
          mt: 8,
          width: {
            xs: 1,
            sm: 300,
          },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockClockOutlined />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Button
          classes={{ startIcon: 'custom-btn-icon-align-left' }}
          variant="contained"
          color="google"
          startIcon={<Google />}
          fullWidth
          sx={{ mt: 4, mb: 1 }}
          onClick={authenticate}
        >
          Sigh in with Google
        </Button>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}

export default SignInPage
