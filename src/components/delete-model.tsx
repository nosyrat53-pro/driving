// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// ** Icon Imports
import Icon from '/src/@core/components/icon'
import toast from 'react-hot-toast'

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const DeleteModal = ({ working, openDeleteModal, setOpenDeleteModal, deleteTable, rowId }) => {
  // ** State

  const handleClose = () => setOpenDeleteModal(false)

  const onConfirm = () => {
    deleteTable(rowId).then(() => {
      // toast.success('Deleted Successfully')
      setOpenDeleteModal(false)
      handleClose()
    })
  }

  return (
    <div>
      <Dialog
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            Delete Item
          </Typography>
          <CustomCloseButton aria-label='close' onClick={handleClose}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: theme => `${theme.spacing(4)} !important` }}>
          <Typography sx={{ mb: 4 }} fontSize={18} width={400}>
            You Want Delete This Row
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: theme => `${theme.spacing(3)} !important` }}>
          <Button variant='text' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' color='error' disabled={working} onClick={() => { onConfirm() }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteModal
