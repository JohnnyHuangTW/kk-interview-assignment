import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@mui/material'
import { shortenNum } from '../../../../utils'

const ChannelInformation = ({ data }) => {
  const { thumbnails, title, subscriberCount } = data ?? {}
  const channelThumbnail = thumbnails?.default
  return (
    <Box
      sx={{
        display: 'flex',
        p: 4,
        gap: 2,
        flexDirection: 'row',
        justifyContent: {
          md: 'flex-start',
          sm: 'center',
          xs: 'center',
        },
        alignItems: 'center',
      }}
    >
      <Avatar
        src={channelThumbnail?.url}
        sx={{ height: channelThumbnail?.height, width: channelThumbnail?.width }}
      />
      <Box>
        <Typography component="h1" variant="h4">
          {title}
        </Typography>
        <Typography component="label" sx={{ typography: 'subtitle', color: 'text.secondary' }}>
          {shortenNum(subscriberCount)} 位訂閱者
        </Typography>
      </Box>
    </Box>
  )
}

ChannelInformation.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    subscriberCount: PropTypes.string,
    thumbnails: PropTypes.object,
  }),
}

export default ChannelInformation
