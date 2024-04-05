import { Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'

function DevTable() {
  const columns: GridColDef[] = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'id',
    },

    {
      accessorKey: 'surname',
      flex: 0.25,
      minWidth: 200,
      field: 'surname',
      headerName: 'UserName',
      Component: CustomTextField,
      ComponentProps: {
        label: 'test'
      }
    },
    {
      accessorKey: 'email',
      flex: 0.25,
      minWidth: 230,
      field: 'email',
      headerName: 'Email',
      Component: CustomTextField
    },
    {
      accessorKey: 'phone',
      flex: 0.25,
      minWidth: 230,
      field: 'phone',
      headerName: 'Phone',
      Component: CustomTextField
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
        <DataTable title="Dev" columns={columns} endPoint="/dev/users?search=" paramsTable={{ role: 'student' }} />
      </Grid>
    </Grid>
  )
}
export default DevTable


