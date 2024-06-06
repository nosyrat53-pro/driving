import { Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'

function DevTable() {
  const columns: GridColDef[] = [

    {
      accessorKey: 'name',
      flex: 0.25,
      minWidth: 200,
      enableCreating: true,
      field: 'name',
      headerName: 'Name',
      formToSendKey: 'name',
      Component: CustomTextField,
      ComponentProps: {
        label: 'name'
      }
    },


    {
      flex: 0.15,
      type: 'date',
      minWidth: 200,
      headerName: 'Date',
      field: 'created_at',
      valueGetter: params => new Date(params.value)
    },
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DataTable title="Categories" columns={columns} endPoint="/dev/categories" extraActions={(row) => []} paramsTable={{}} />
      </Grid>
    </Grid>
  )
}
export default DevTable
