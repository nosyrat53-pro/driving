
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** Icon Imports
import Icon from '/src/@core/components/icon'
import { useEffect, useState } from 'react'
import { Button, FormGroup } from '@mui/material'

// ** MUI Imports
import Divider from '@mui/material/Divider'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'

// ** Hook Import
import { useSettings } from '/src/@core/hooks/useSettings'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

// Styled component for the image of a shoe
const ImgShoe = styled('img')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}))




const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  width: 400,
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    width: 400,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9]
  }
}))

const ProgressTimeLine = ({ open, setOpen }) => {

  const { settings } = useSettings()

  return (
    <div className='customizer'>
      <Drawer open={open} hideBackdrop anchor='right' variant='persistent'>
        <Box
          className='customizer-header'
          sx={{ position: 'relative', p: theme => theme.spacing(6, 5), borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Edit Progress
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>Customize & Preview in Real Time</Typography> */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='tabler:x' fontSize={20} />
          </IconButton>
        </Box>
        <Box padding={4}>
          <Timeline >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='error' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom', mx: 4 } }}>
                <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  Test
                </Box>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='primary' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>

                <Box>


                </Box>
              </TimelineContent>
            </TimelineItem>

          </Timeline>
        </Box>

      </Drawer>
    </div>
  )
}

export default ProgressTimeLine
