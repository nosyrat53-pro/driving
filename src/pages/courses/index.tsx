import { Button, Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'
import ProgressTimeLine from './components/ProgressTimeLine'
import { useState } from 'react'
import Icon from '/src/@core/components/icon'
import DeleteModal from '../../components/delete-model'

function DevTable() {

  const [open, setOpen] = useState()
  const [selectedCourse,setSelectedCourse] = useState({});
  const [loadingDelete,setLoadingDelete] = useState(false);

  const columns: GridColDef[] = [

    {
      accessorKey: 'name',
      flex: 0.25,
      minWidth: 150,
      enableCreating: true,
      field: 'name',
      headerName: 'Name',
      Component: CustomTextField,
    },

    {
      accessorKey: 'description',
      flex: 0.25,
      minWidth: 250,
      enableCreating: true,
      field: 'description',
      headerName: 'Description',
      Component: CustomTextField,
      ComponentProps: {
        multiline: true,
        maxRows: 4
      }
    },

    {
      flex: 0.15,
      type: 'date',
      minWidth: 130,
      headerName: 'Date',
      field: 'created_at',
      valueGetter: params => new Date(params.value)
    },
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DataTable no-edit extraActions={(Row) => (
          [
            {
              text: 'Add stage',
              menuItemProps: {
                onClick: () => { setOpen(true);
                setSelectedCourse({...Row});
              }
              },

              icon: <Icon icon='zondicons:add-outline' />
            },
          ]
          )} title="Courses" columns={columns} endPoint="/dev/courses" paramsTable={{}} />
        <ProgressTimeLine selectedCourse={selectedCourse} open={open} setOpen={setOpen} />


      </Grid>
    </Grid>
  )
}
export default DevTable
