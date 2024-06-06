import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'

export default function SearchBar({ search , setSearch}) {
  return (
    <Paper component='form' sx={{ p: '2px 4px', marginBottom: 4 , marginLeft: 'auto', marginRight: 'auto' , display: 'flex', alignItems: 'center', width: '100%' }}>
      <IconButton sx={{ p: '10px' }} aria-label='menu'>
        <Icon icon='il:search' />
      </IconButton>
      <InputBase sx={{ flex: 1 }} value={search} onChange={event => setSearch(event.target.value)} placeholder='Search...' inputProps={{ 'aria-label': 'search google maps' }} />

      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton color='primary' sx={{ p: '10px' }} aria-label='directions'>
        <Icon icon='lets-icons:filter'  color='#666'/>
      </IconButton>
    </Paper>
  )
}
