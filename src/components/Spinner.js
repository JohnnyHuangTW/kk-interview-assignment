import { Backdrop, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'

const Spinner = ({ open }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
)

Spinner.propTypes = {
  open: PropTypes.bool,
}

export default Spinner
