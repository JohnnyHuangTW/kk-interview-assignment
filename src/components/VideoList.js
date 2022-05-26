import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import { useEffect, useState } from 'react'

const renderThumbnail = (params) => {
  const { thumbnails, title, videoId } = params.row
  const thumbnail = thumbnails.default
  const videoHref = `https://www.youtube.com/watch?v=${videoId}`
  return (
    <a className="custom-table-thumbnail-wrapper" href={videoHref} target="_blank" rel="noreferrer">
      <PlayCircleFilledOutlinedIcon fontSize="large" />
      <img src={thumbnail.url} width={thumbnail.width} height={thumbnail.height} alt={title} />
    </a>
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
