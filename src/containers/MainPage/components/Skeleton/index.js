import { Box, Skeleton, Typography } from '@mui/material'

export const ChannelInformationSkeleton = () => (
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
    <Skeleton variant="circular" width={88} height={88} />
    <Box sx={{ flex: 1, maxWidth: 200 }}>
      <Typography component="h1" variant="h4">
        <Skeleton />
      </Typography>
      <Typography component="label" sx={{ typography: 'subtitle', color: 'text.secondary' }}>
        <Skeleton />
      </Typography>
    </Box>
  </Box>
)

const TableHeader = () => <Skeleton variant="rectangular" sx={{ height: 32 }} />
const TableRow = () => <Skeleton variant="rectangular" sx={{ flex: 1 }} />
const TablePagination = () => <Skeleton variant="rectangular" sx={{ height: 32 }} />

export const VideoDataTableSkeleton = () => (
  <Box sx={{ display: 'flex', height: 1, py: 1 }}>
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TableHeader />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableRow />
      <TablePagination />
    </Box>
  </Box>
)
