import { Box, Modal } from '@mui/material'
import PropTypes from 'prop-types'

const VideoPlayerModal = ({ onClose, videoId }) => (
  <Modal
    open={!!videoId}
    onClose={onClose}
    sx={{
      display: 'flex',
      width: '95%',
      maxWidth: 880,
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box className="youtube-embed-wrapper">
      <iframe
        title="youtube-embed"
        className="youtube-embed"
        allowFullScreen
        src={`https://www.youtube.com/embed/${videoId}`}
      />
    </Box>
  </Modal>
)

VideoPlayerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  videoId: PropTypes.string,
}

export default VideoPlayerModal
