// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from '/src/@core/components/icon'

// ** Types
import { ThemeColor } from '/src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from '/src/@core/components/mui/avatar'


interface DataType {
  icon: string
  stats: any
  title: string
  color: ThemeColor
}


const CardStatisticsStatistics = ({ Statistics }) => {
  const data: DataType[] = [
    {
      stats: Statistics.studentsCount,
      title: 'Students',
      color: 'primary',
      icon: 'tabler:users'
    },
    {
      color: 'info',
      stats: Statistics.teachersCount,
      title: 'Instructors',
      icon: 'la:chalkboard-teacher'
    },
    {
      color: 'error',
      stats: Statistics.coursesCount,
      title: 'Courses',
      icon: 'la:book-reader'
    },
    {
      stats: Statistics.schoolsCount,
      color: 'success',
      title: 'Schools',
      icon: 'teenyicons:school-outline'
    }
  ]

  const renderStats = () => {
    return data.map((sale: DataType, index: number) => (
      <Grid item xs={6} md={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
            <Icon icon={sale.icon} fontSize='1.5rem' />
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>{sale.stats}</Typography>
            <Typography variant='body2'>{sale.title}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistics'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}

      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatisticsStatistics
