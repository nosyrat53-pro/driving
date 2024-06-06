import { Icon } from '@iconify/react'
import { Box, Card, Skeleton, Typography } from '@mui/material'
import { display } from '@mui/system'

const StudentCardSkelton = () => {
 

  return (
    <Card sx={{ boxShadow: 3, marginBottom: 4 }}>
      <Box sx={{ display: 'flex', gap: '10%', p: 3, width: '100%' }}>
        <Skeleton animation='wave' variant='circular' width={40} height={40} />

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Skeleton animation='wave' height={15} width='80%' style={{ marginBottom: 2 }} />
          <Skeleton animation='wave' height={15} width='60%' style={{ marginBottom: 2 }} />
          <Skeleton animation='wave' height={15} width='40%' style={{ marginBottom: 2 }} />
        </Box>
      </Box>
    </Card>
  )
}

export default StudentCardSkelton
