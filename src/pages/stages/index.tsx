import { Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'
import Icon from '/src/@core/components/icon'
import ProgressTimeLine from './components/ProgressTimeLine'
import { useState } from 'react'





function DevTable() {
  const [open, setOpen] = useState<boolean>()

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'id',
    },

    {
      accessorKey: 'name',
      flex: 0.25,
      minWidth: 200,
      field: 'name',
      headerName: 'Name',
      Component: CustomTextField,
      ComponentProps: {
        label: 'test'
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

  const extraActions = [
    {
      text: 'Edit',
      menuItemProps: {
        onClick: () => { setOpen(true) }
      },

      // href: `/apps/invoice/edit/${row.id}`,
      icon: <Icon icon='uiw:delete' />
    },
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProgressTimeLine open={open} setOpen={setOpen} />
        <DataTable extraActions={extraActions} title="Instructors" columns={columns} endPoint="/dev/stages" paramsTable={{}} />
      </Grid>
    </Grid>
  )
}
export default DevTable
