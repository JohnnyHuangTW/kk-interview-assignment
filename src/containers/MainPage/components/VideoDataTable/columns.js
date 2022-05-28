import moment from 'moment'
import PlayCircleIcon from '@mui/icons-material/PlayCircleFilledOutlined'
import { Box, Tooltip } from '@mui/material'
import { convertYouTubeDuration, numberWithCommas } from '../../../../utils'

const renderThumbnail = (params) => {
  const { thumbnails, title, videoId } = params.row ?? {}
  const thumbnail = thumbnails?.default ?? {}
  const videoHref = `https://www.youtube.com/watch?v=${videoId}`
  return (
    <a className="custom-table-thumbnail-wrapper" href={videoHref} target="_blank" rel="noreferrer">
      <PlayCircleIcon fontSize="large" />
      <img src={thumbnail.url} width={thumbnail.width} height={thumbnail.height} alt={title} />
    </a>
  )
}

const renderTitleWithTooltip = (params) => {
  const { title } = params.row ?? {}
  return (
    <Tooltip title={title} placement="bottom-start">
      <Box sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</Box>
    </Tooltip>
  )
}

const formatDate = (params) => (params.value ? moment(params.value).format('YYYY/MM/DD HH:mm:ss') : '')

const formatNumberWithComma = (params) => (params.value ? numberWithCommas(params.value) : 0)

const formatDuration = (params) => (params.value ? convertYouTubeDuration(params.value) : '')

const columns = [
  {
    field: 'thumbnail',
    headerName: '截圖',
    minWidth: 150,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: renderThumbnail,
  },
  {
    field: 'title',
    headerName: '標題',
    flex: 1,
    minWidth: 150,
    sortable: false,
    headerAlign: 'center',
    renderCell: renderTitleWithTooltip,
  },
  {
    field: 'duration',
    headerName: '時間長度',
    minWidth: 100,
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: formatDuration,
  },
  {
    field: 'publishedAt',
    headerName: '發布日期',
    minWidth: 180,
    sortable: false,
    type: 'dateTime',
    align: 'center',
    headerAlign: 'center',
    valueFormatter: formatDate,
  },
  {
    field: 'viewCount',
    headerName: '觀看次數',
    minWidth: 130,
    sortable: false,
    type: 'number',
    valueFormatter: formatNumberWithComma,
  },
  {
    field: 'likeCount',
    headerName: '被喜歡的次數',
    minWidth: 130,
    sortable: false,
    type: 'number',
    valueFormatter: formatNumberWithComma,
  },
  {
    field: 'commentCount',
    headerName: '留言筆數',
    minWidth: 130,
    sortable: false,
    type: 'number',
    valueFormatter: formatNumberWithComma,
  },
]

export default columns
