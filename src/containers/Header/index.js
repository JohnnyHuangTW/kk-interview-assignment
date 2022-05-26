import { useState } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemText,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useGoogleAuth } from '../../hooks'

const Header = () => {
  const { isSignIn, userInfo, signOut } = useGoogleAuth()
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KKBOX YouTube Videos
          </Typography>

          {/* Avatar icon menu */}
          {isSignIn && (
            <div>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={openMenu}
              >
                {userInfo ? (
                  <Avatar alt={userInfo.fullName} src={userInfo.imageUrl} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                {userInfo && (
                  <MenuItem dense>
                    <ListItemText>
                      {userInfo.fullName} ({userInfo.email})
                    </ListItemText>
                  </MenuItem>
                )}

                {userInfo && <Divider />}

                <MenuItem
                  onClick={() => {
                    signOut()
                    closeMenu()
                  }}
                >
                  Sign Out
                </MenuItem>

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Header
