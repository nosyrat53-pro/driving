import { Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'
import FormSelect from '../../components/form-select'

function DevTable() {
  const columns: GridColDef[] = [
    // {
    //   flex: 0.1,
    //   field: 'id',
    //   minWidth: 80,
    //   headerName: 'id',
    // },

    {
      accessorKey: 'name',
      flex: 0.25,
      minWidth: 150,
      enableCreating: true,
      field: 'name',
      headerName: 'Name',
      Component: CustomTextField,
      ComponentProps: {
        label: 'test',
        required: true
      }
    },

    {
      accessorKey: 'category',
      renderCell: ({ row }: any) => (<div>{row.category.name}</div>),
      flex: 0.25,
      minWidth: 230,
      enableCreating: true,
      field: 'category',
      headerName: 'category',
      formToSendKey: 'categoryId',
      Component: FormSelect,
      isSelect: true,
      ComponentProps: {
        valueItem: 'id',
        titleItem: 'name',
        endPoint: '/dev/categories',
        required: true
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
        <DataTable title="Schools" columns={columns} endPoint="/dev/groups" extraActions={(row) => []} paramsTable={{}} />
      </Grid>
    </Grid>
  )
}
export default DevTable
