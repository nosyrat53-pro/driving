
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** Icon Imports
import Icon from '/src/@core/components/icon'
import { useEffect, useState } from 'react'
import { Button, ClickAwayListener, FormGroup } from '@mui/material'

// Import third party libs
import toast from 'react-hot-toast'

const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
  maxWidth: 400,
  zIndex: theme.zIndex.modal,
  '& .MuiFormControlLabel-root': {
    marginRight: '0.6875rem'
  },
  '& .MuiDrawer-paper': {
    border: 0,
    maxWidth: 400,
    zIndex: theme.zIndex.modal,
    boxShadow: theme.shadows[9]
  }
}))

const UpdateCreateModel = ({setIdRow, working, form, open, setOpen, columns, setForm, onSubmit , typeCrud }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.formToSendKey || column.accessorKey] = ""

      return acc;
    }, {})
  );

  useEffect(() => {
    if (typeCrud == 'Update') {

      columns.forEach((element) => {
        values[element.formToSendKey || element.accessorKey] = form[element.formToSendKey || element.accessorKey];
      });

      setValues({ ...values })
    }
  }, [open]);

  useEffect(( ) => {
    if(typeCrud == 'Create' || typeCrud == 'Delete'){

      // empty values every time open create model
      const newValues = {};
      for(const [key,value] of Object.entries(values)){
        newValues[key] = ''
      }

      setValues({...newValues});
      }
  },[typeCrud])

  // check required values to submit
  const checkIsValidToSend = (values) => {

    localStorage.setItem('vvaalll', JSON.stringify({...values}))
    for(const [key,value] of  Object.entries(values) ) {
      if(key != undefined && key != 'undefined' && key != '' && value == ''){
        return `Please Enter the ${key} to confirm the data`;
      }
    }


    return 'valid data'

  }

  const handleSubmit = () => {
    //put your validation logic here
    const validation = checkIsValidToSend(values);

    if(typeCrud == 'Update'){

      onSubmit(values);

    }else if( validation == 'valid data' ){

      onSubmit(values);

      // empty values after submit
      const newValues = {};
      for(const [key,value] of Object.entries(values)){
        newValues[key] = ''
      }

      setValues({...newValues});


    }else {
      toast.error(checkIsValidToSend(values));
    }


  };


  return (
    <div className='customizer'>
      <Drawer
        open={open}

        anchor='right'

        onClose={() => setOpen(false)}
      >
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(6, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            {typeCrud}
          </Typography>

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
        <Box padding={3} style={{ height: '100%' }} >
          <FormGroup onSubmit={(e) => e.preventDefault()} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'nowrap' }} >
            <Box>

              {columns.map((column, id) => (
                <>
                  {column.enableCreating && column.Component && (
                    <column.Component
                      fullWidth
                      {...column?.ComponentProps}
                      key={column.accessorKey + id}
                      label={column.field || column?.ComponentProps.label}
                      name={column.formToSendKey || column.accessorKey}
                      value={values[column.formToSendKey || column.accessorKey]}
                      onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                      }
                      style={{ marginTop: '10px' }}
                    />
                  )}
                </>
              ))}
            </Box>
            <div style={{ marginTop: '10px' }}>
              <Button variant='outlined' color='secondary' onClick={() => { setOpen(false) }}>
                Cancel
              </Button>
              {' '}
              <Button variant='contained' disabled={working} color='warning' type='submit' onClick={() => { handleSubmit() }}>
                Confirm
              </Button>
            </div>
          </FormGroup>
        </Box>
        </Drawer>
    </div >
  )
}

export default UpdateCreateModel
