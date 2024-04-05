import { Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'
import FormSelect from '../../components/form-select'
import { useRouter } from 'next/router'
import Icon from '/src/@core/components/icon'

function DevTable() {

  const router = useRouter();

  const columns: GridColDef[] = [

    {
      accessorKey: 'firstName',
      flex: 0.25,
      minWidth: 180,
      enableCreating: true,
      field: 'firstName',
      headerName: 'Name',
      renderCell: ({ row }: any) => (<div>{row.firstName + " " +row.lastName}</div>),
      Component: CustomTextField,
      formToSendKey: 'firstName',
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
      accessorKey: 'courseId',
      flex: 0.25,
      minWidth: 230,
      enableCreating: true,
      headerName: 'course',
      isSelect: true,
      Component: FormSelect,
      formToSendKey: 'courseId',
      ComponentProps: {
        label: 'Course',
        valueItem: 'id',
        titleItem: 'name',
        endPoint: '/dev/courses',
      }
    },
    {
      accessorKey: 'group',
      flex: 0.25,
      minWidth: 150,
      enableCreating: true,
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
        <DataTable
          title="Instructors"
          columns={columns}
          endPoint="/dev/users"

          extraActions={(row) => [
            {
              text: "Teacher's students",
              menuItemProps: {
                onClick: () => {
                  router.push({ pathname: '/instructor-students/', query: { teacherID: row.id , name: row.firstName+" "+row.lastName}})
                }
              },
              icon: <Icon icon='carbon:view' />
            }
          ]} paramsTable={{ role: 'teacher' }}
        />
      </Grid>
    </Grid>
  )
}
export default DevTable
