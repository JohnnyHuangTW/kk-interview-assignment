import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import columns from './columns'

const VideoDataTable = ({ data = [], isLoading, pageInfo, onNextPageClick, onPrevPageClick }) => {
  const [currentPage, setCurrentPage] = useState(0)

  const handlePageChange = (newPage) => {
    if (newPage > currentPage) onNextPageClick()
    else onPrevPageClick()

    setCurrentPage(newPage)
  }

  return (
    <Box sx={{ display: 'flex', height: 1, py: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          disableColumnReorder
          disableSelectionOnClick
          disableColumnMenu
          density="comfortable"
          pagination
          paginationMode="server"
          columns={columns}
          rows={data}
          rowCount={pageInfo?.totalResults || 0}
          getRowId={(row) => row.videoId}
          page={currentPage}
          pageSize={pageInfo?.resultsPerPage || 10}
          rowsPerPageOptions={[pageInfo?.resultsPerPage || 10]}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  )
}

VideoDataTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  pageInfo: PropTypes.object,
  onNextPageClick: PropTypes.func,
  onPrevPageClick: PropTypes.func,
}

export default VideoDataTable
