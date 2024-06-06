// ** MUI Imports
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { Card, Fab, Grid, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'
import FormSelect from '../../components/form-select'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BaseCrud from 'src/@core/utils/api_helper'
import StudentCard from 'src/components/studentCard'
import StudentCardSkelton from 'src/components/studentCard/StudentCardSkelton'
import SearchBar from '../../components/searchBar'
import { Icon } from '@iconify/react'
import UpdateCreateModel from 'src/components/update-create-model'
import toast from 'react-hot-toast'

// ** Styled MUI
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'warning'
  }
}))

function InstructorStudents() {
  const router = useRouter()

  const [teacherId, setTeacherId] = useState(JSON.parse(localStorage.getItem('userData')).id)
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('userData')).role)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterData, setFilterdData] = useState([]);
  const [open, setOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [form, setForm] = useState({});
  const [idRow, setIdRow] = useState();

  const columns: GridColDef[] = [

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


  
  const crud = new BaseCrud(`/dev/stu-course/${teacherId}`)
  const studentsCrud = new BaseCrud(`/dev/users`)

  useEffect(() => {
      crud.index({ }).then((res) => {
      setLoading(false);
      const resolved = res;
        setData(resolved);
        setFilterdData(resolved)
    });
  },[])

  useEffect(() => {


    // filter data based on search query
    if (data) {
      const filterData =
        data?.filter(element =>

          element?.name?.toLowerCase().includes(search.toLowerCase()) ||
          element?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          element?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          `${element?.firstName.toLowerCase() + element?.lastName?.toLowerCase()}`.includes(search.toLowerCase()) ||
          `${element?.firstName.toLowerCase() + " " + element?.lastName?.toLowerCase()}`.includes(search.toLowerCase())

        )

      setFilterdData([...filterData])
    }



  }, [search])

  const handleCreateNewRow = (values) => {
    studentsCrud.create({ ...values, role: 'student' }).then((res) => {
      toast.success('Created Successfully')
      setOpen(false)
    }).catch(error => {
      toast.error(error.message)

    })
  };

  return (
    <Grid container  spacing={6}>
      <Grid item xs={12}>
        <Grid items sx={{ p: 4 }}>
          

          <SearchBar search={search} setSearch={setSearch}/>
        </Grid>
        
        <Box sx={{width: '100%' , p: 4 , backgroundColor: '#224' , display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{color: 'white' , marginBottom: 4}}>All Data</Typography>
          
          <Box sx={{ display: 'flex', flex: 1 ,justifyContent: 'space-between', alignItems: 'center' , color: 'white', marginBottom: 4}}>
            
            <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column'  }}>
              <Box display='flex' alignItems='center'>
              <Typography sx={{color: 'white'}}>Active</Typography>
              <Icon icon='fluent:ios-arrow-24-filled' style={{transform: 'rotate(180deg)'}} />
              </Box>
              <Typography sx={{color: 'white'}}>1</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ color: 'white' }}>Active</Typography>
                <Icon icon='fluent:ios-arrow-24-filled' style={{ transform: 'rotate(180deg)' }} />
              </Box>
              <Typography sx={{ color: 'white' }}>1</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ color: 'white' }}>Active</Typography>
                <Icon icon='fluent:ios-arrow-24-filled' style={{ transform: 'rotate(180deg)' }} />
              </Box>
              <Typography sx={{ color: 'white' }}>1</Typography>
            </Box>

          </Box>

          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>

            <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ color: 'white' }}>Active</Typography>
                <Icon icon='fluent:ios-arrow-24-filled' style={{ transform: 'rotate(180deg)' }} />
              </Box>
              <Typography sx={{ color: 'white' }}>1</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ color: 'white' }}>Active</Typography>
                <Icon icon='fluent:ios-arrow-24-filled' style={{ transform: 'rotate(180deg)' }} />
              </Box>
              <Typography sx={{ color: 'white' }}>1</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ color: 'white' }}>Active</Typography>
                <Icon icon='fluent:ios-arrow-24-filled' style={{ transform: 'rotate(180deg)' }} />
              </Box>
              <Typography sx={{ color: 'white' }}>1</Typography>
            </Box>

          </Box>


        </Box>
          
        <Grid items sx={{ p: 4 }}>
          {
            loading ? 
              [1, 2, 3].map((el, idx) => {
                return <StudentCardSkelton/>
              })

              : 
              null
          }
         
        {
          filterData?.map((student, idx) => {
            return<>
            <StudentCard studentData={student}/>
            </> 
          })
          }
          
        </Grid> 

        <Fab onClick={() => setOpen(true)} size="medium" style={{backgroundColor: '#224', position: 'fixed' , bottom: '10%', right: '5%'}} aria-label="add">
          <Icon icon="subway:add-1" color='white'/>
        </Fab>

        <UpdateCreateModel typeCrud={'Create'} working={working} open={open} setOpen={setOpen} form={form} setForm={setForm} columns={columns} setIdRow={setIdRow} onSubmit={handleCreateNewRow} />


        {/* <DataTable
          title={role == 'admin' ? router.query.name + "'s Students" : 'Students'}
          noCreate
          viewRoute={{ route: '/student-profile/', withId: true }}
          noActions
          extraActions={row => []}
          isInstructorStudents
          columns={columns}
          endPoint={`/dev/stu-course/${role == 'admin' ? router.query.teacherID : teacherId}`}
        /> */}
      </Grid>
    </Grid>
  )
}
export default InstructorStudents
