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
      accessorKey: 'firstName',
      flex: 0.25,
      minWidth: 150,
      enableCreating: true,
      field: 'firstName',
      renderCell: ({ row }: any) => (<div>{row.firstName + " " + row.lastName}</div>),
      formToSendKey: 'firstName',
      headerName: 'Name',
      Component: CustomTextField,
      ComponentProps: {
        label: 'first name'
      }
    },
    {
      accessorKey: 'lastName',
      flex: 0.25,
      minWidth: 180,
      enableCreating: true,
      headerName: 'lastName',
      formToSendKey: 'lastName',
      Component: CustomTextField,
      ComponentProps: {
        label: 'last name'
      }
    },
    {
      accessorKey: 'email',
      flex: 0.25,
      minWidth: 230,
      enableCreating: true,
      field: 'email',
      headerName: 'Email',
      Component: CustomTextField
    },
    {
      accessorKey: 'phone',
      flex: 0.25,
      minWidth: 150,
      enableCreating: true,
      field: 'phone',
      headerName: 'Phone',
      Component: CustomTextField
    },
    {
      accessorKey: 'course',
      flex: 0.25,
      minWidth: 230,
      enableCreating: true,
      headerName: 'courses',
      Component: FormSelect,
      isSelect: true,
      formToSendKey: 'courseId',
      ComponentProps: {
        label: 'course',
        valueItem: 'id',
        titleItem: 'name',
        endPoint: '/dev/courses',
      }
    },
    {
      accessorKey: 'teacherId',
      flex: 0.25,
      minWidth: 230,
      enableCreating: true,
      headerName: 'Instructor',
      Component: FormSelect,
      isSelect: true,
      formToSendKey: 'teacherId',
      ComponentProps: {
        label: 'instructor',
        valueItem: 'id',
        titleItem: 'firstName',
        endPoint: '/dev/users',
        params: { role: 'teacher' }
      }
    },
    {
      accessorKey: 'group',
      renderCell: ({ row }: any) => (<div>{row?.group?.name}</div>),
      flex: 0.25,
      minWidth: 230,
      enableCreating: true,
      field: 'group',
      headerName: 'group',
      formToSendKey: 'groupId',
      Component: FormSelect,
      isSelect: true,
      ComponentProps: {
        label: 'Group',
        valueItem: 'id',
        titleItem: 'name',
        endPoint: '/dev/groups',
      }
    },
    {
      accessorKey: 'password',
      flex: 0.25,
      minWidth: 230,
      enableCreating: true,
      headerName: 'password',
      Component: CustomTextField,
      ComponentProps: {
        type: 'password',
        label: 'Password'
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
        <DataTable title="Students" columns={columns} endPoint="/dev/users" extraActions={(row) => []} paramsTable={{ role: 'student' }}  />
      </Grid>
    </Grid>
  )
}
export default DevTable
