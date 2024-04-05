
// ** MUI Imports
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '/src/components/data-table'
import CustomTextField from '../../@core/components/mui/text-field'
import FormSelect from '../../components/form-select'
import { Box } from '@mui/system';
import IconifyIcon from '../../@core/components/icon';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Icon } from '@iconify/react';




// ** Styled MUI
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'warning',
  },
}));

function InstructorStudents() {

  const router = useRouter();

  const [studentId, setStudentId] = useState(null);
  const [teacherId, setTeacherId] = useState(JSON.parse(localStorage.getItem('userData')).id);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('userData')).role);

  const getSuitableColor = (percentage) => {
    if (percentage <= 20) {
      return 'error'
    } else if (percentage <= 69) {
      return "warning"
    } else {
      return "success"
    }
  }

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
      minWidth: 200,
      enableCreating: true,
      field: 'firstName',
      headerName: 'Name',
      renderCell: ({ row }: any) => (<div>{row.firstName + " " + row.lastName}</div>),
      Component: CustomTextField,
      ComponentProps: {
        label: 'firstName'
      }
    },
    {
      accessorKey: 'phone',
      flex: 0.25,
      minWidth: 180,
      enableCreating: true,
      field: 'phone',
      headerName: 'Phone',
      Component: CustomTextField
    },
    {
      accessorKey: 'course',
      flex: 0.25,
      minWidth: 180,
      enableCreating: true,
      renderCell: ({row}) => (
        <Box>
          <Typography>{row?.progress[0]?.courseName}</Typography>
        </Box>
      ),
      field: 'course',
      headerName: 'Course',
      Component: CustomTextField
    },
    {
      accessorKey: 'courseId',
      flex: 0.25,
      minWidth: 230,

      // field: 'courses',
      headerName: 'courses',
      Component: FormSelect,
      ComponentProps: {
        label: 'Course',
        valueItem: 'id',
        titleItem: 'name',
        endPoint: '/dev/courses',
      }
    },
    {
      accessorKey: 'pregress',
      flex: 0.25,
      minWidth: 230,
      renderCell: ({ row }: any) => (
        <Box sx={{width: '100%'}}>
          <Typography sx={{ fontSize: 13 }}>{row?.progress[0]?.completionPercentage }%</Typography>
          <BorderLinearProgress
            variant="determinate"
            color='warning'
            value={row?.progress[0]?.completionPercentage} />
        </Box>
        ),
      enableCreating: true,
      field: 'pregress',
      headerName: 'pregress',
      ComponentProps: {
        label: 'pregress',
        valueItem: 'id',
        titleItem: 'name',
        endPoint: '/dev/courses',
      }
    }
  ]



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>

        <DataTable

          title={role == 'admin' ? router.query.name + "'s Students" :  "Students"}
          noCreate
          viewRoute={{route: '/student-profile/', withId: true}}

          noActions
          extraActions={(row) => [ ]}
        isInstructorStudents

        columns={columns}
        endPoint={`/dev/stu-course/${role == 'admin' ? router.query.teacherID : teacherId}`}

        />

      </Grid>
    </Grid>
  )
}
export default InstructorStudents
