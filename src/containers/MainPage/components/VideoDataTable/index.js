import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import columns from './columns'

const VideoDataTable = ({
  data = [],
  isLoading,
  totalCount = 0,
  itemsPerPage = 10,
  onNextPageClick,
  onPrevPageClick,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [totalCountState, setTotalCountState] = useState(totalCount)

  useEffect(() => {
    setTotalCountState((prev) => totalCount || prev)
  }, [totalCount])

  const handlePageChange = (newPage) => {
    // prevent doing any actions while still fetching data,
    // since we need pageToken from GAPI to get the new data
    if (isLoading) return

    if (newPage > currentPage) onNextPageClick()
    else onPrevPageClick()

    setCurrentPage(newPage)
  }

  return (
    <Box sx={{ display: 'flex', height: 1, py: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          className="custom-table-no-focus-outline"
          disableSelectionOnClick
          disableColumnReorder
          disableColumnMenu
          density="comfortable"
          pagination
          paginationMode="server"
          columns={columns}
          rows={data}
          rowCount={totalCountState || 0}
          getRowId={(row) => row.videoId}
          page={currentPage}
          pageSize={itemsPerPage}
          rowsPerPageOptions={[itemsPerPage]}
          onPageChange={handlePageChange}
          loading={isLoading}
        />
      </Box>
    </Box>
  )
}

VideoDataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      videoId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnails: PropTypes.object.isRequired,
      duration: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
      viewCount: PropTypes.string.isRequired,
      likeCount: PropTypes.string.isRequired,
      commentCount: PropTypes.string.isRequired,
    }),
  ),
  isLoading: PropTypes.bool,
  totalCount: PropTypes.number,
  itemsPerPage: PropTypes.number,
  onNextPageClick: PropTypes.func,
  onPrevPageClick: PropTypes.func,
}

export default VideoDataTable
