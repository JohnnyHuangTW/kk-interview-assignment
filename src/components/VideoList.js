import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const renderThumbnail = (params) => {
  const thumbnail = params.row.thumbnails.default
  const title = params.row.title
  return (
    <Box sx={{ p: 1 }}>
      <img src={thumbnail.url} width={thumbnail.width} height={thumbnail.height} alt={title} />
    </Box>
  )
}

const columns = [
  {
    field: 'thumbnail',
    headerName: '截圖',
    width: 150,
    renderCell: renderThumbnail,
  },
  { field: 'title', headerName: '標題' },
  { field: 'duration', headerName: '影片時間長度', width: 130 },
  { field: 'publishedAt', headerName: '發布日期與時間', width: 130, type: 'date' },
  { field: 'viewCount', headerName: '觀看次數', width: 130 },
  { field: 'likeCount', headerName: '被喜歡的次數', width: 130 },
  { field: 'commentCount', headerName: '留言筆數', width: 130 },
]

const VideoList = ({ data = [], isLoading, pageInfo, onNextPageClick, onPrevPageClick }) => {
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
          density="comfortable"
          columns={columns}
          rows={data}
          rowCount={pageInfo?.totalResults || 0}
          getRowId={(row) => row.videoId}
          page={currentPage}
          pageSize={pageInfo?.resultsPerPage || 10}
          rowsPerPageOptions={[pageInfo?.resultsPerPage || 10]}
          onPageChange={handlePageChange}
          pagination
          paginationMode="server"
        />
      </Box>
    </Box>
  )
}

VideoList.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  pageInfo: PropTypes.object,
  onNextPageClick: PropTypes.func,
  onPrevPageClick: PropTypes.func,
}

export default VideoList
