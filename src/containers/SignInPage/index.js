import React from 'react'
import { Container, Box, Avatar, Typography, Link, Button, Paper } from '@mui/material'
import { LockClockOutlined, Google } from '@mui/icons-material'
import { useGoogleAuth } from '../../hooks'

const Copyright = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
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
        height: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto',
            p: 4,
            width: {
              xs: '80%',
              sm: 300,
            },
          }}
          elevation={3}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
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
            sx={{ mt: 4 }}
            onClick={authenticate}
          >
            Sigh in with Google
          </Button>

          <Copyright sx={{ mt: 8 }} />
        </Paper>
      </Box>
    </Container>
  )
}

export default SignInPage
