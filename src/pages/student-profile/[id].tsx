
// mui imports
import { Card, Checkbox, CircularProgress, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// third party imports
import { Icon } from '@iconify/react'
import ViewStageModel from './viewStageModel';
import { useEffect, useState } from 'react';
import EditStageModel from './editStageModel';

import { useParams } from 'next/navigation';
import axios from 'axios';
import { useTheme } from '@emotion/react';


function StudentProfile() {

  const [open, setOpen] = useState<boolean>(false);
  const [openEdit,setOpenEdit] = useState<boolean>(false);
  const [selectedStage,setSelectedStage] = useState({});
  const [selectedSubStage,setSelectedSubStage] = useState({});
  const [studentData,setStudentData] = useState({progress: []});
  const [courseData,setCourseData] = useState({});
  const [completionPercentageData,setCompletionPercentageData] = useState({});
  const [stages,setStages] = useState([]);
  const [refetchStages, setRefetchStages] = useState(true)
  const theme = useTheme();

  const params = useParams();
  const {id: studentId} = params;




  const handleSetTypeOfOpen = (stage, substage) => {

    const userData = JSON.parse( localStorage.getItem('userData') );

    if(userData.role == 'student' || userData.role == 'admin'){
      setSelectedStage({...stage});
      setSelectedSubStage({...substage})
      setOpen(true)
    }else {
      setSelectedStage({...stage});
      setSelectedSubStage({...substage})
      setOpenEdit(true)

    }



  }

  // get student profile with stages

  useEffect(() => {

    // get student data
  axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/users/${studentId}`, { params: {},
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
   }).then(res => {

    setStudentData({...res.data[0]})
   });


  },[refetchStages])


  // get total student completion progress
  useEffect(() => {

    if(studentData?.id){
    //   axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/progress/total/${studentId}`, { params: {},
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //   }
    //  }).then(res => {
    //   setCompletionPercentageData({...res.data})
    //  });
    }

  },[])


  // get course data
  useEffect(() =>{

    if(studentData?.progress?.length){

      // get course data
      axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/courses/${studentData?.progress[0]?.courseId}`, { params: {},
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
     }).then(res => {
      setCourseData({...res.data})
     });



   //get student progress
  axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/progress/byCourse/${studentId}/${studentData?.progress[0]?.courseId}`, { params: {},
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
 }).then(res => {

  setStages([...res.data])
 });

    }

  },[studentData])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card >
        <Box sx={{ borderRadius: 1 }}>
            {/* <Box sx={{ p: 3, height: {xs: 60 ,lg:150} , width: '100%', background: ' linear-gradient(to right, #7D4192 60%, #FFE6A6 )'}}></Box> */}

          <Box sx={{ p: 3 , position: 'relative'}}>

            <Box sx={{display: 'flex' ,flexWrap: 'wrap' , justifyContent: 'space-between' , alignItems: 'flex-end', gap: '15%'}}>

                <Box sx={{ display: 'flex', width: {xs: '100%' ,lg: '50%'} , justifyContent: {xs: 'space-evenly' ,lg:"space-between"} , alignItems: 'flex-end' , height: '100%' , flexWrap: 'wrap' , gap: 5}}>
                  <Box sx={{ fontSize: 13, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3, height: '100%' }}>
                    <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}><Icon fontSize='1.25rem' icon={'uil:user'} />{studentData?.firstName + " " + studentData?.lastName}</Typography>
                  </Box>

                  <Box sx={{fontSize: 13,display: 'flex', flexDirection: 'column', justifyContent: 'space-between' ,gap: 3, height: '100%'}}>
                    <Typography sx={{fontSize: 13,display: 'flex', alignItems: 'center' , gap: 1}}><Icon fontSize='1.25rem' icon={'basil:phone-outline'} />{studentData?.phone}</Typography>
                  </Box>

                  <Box sx={{fontSize: 13,display: 'flex', alignItems: 'center', gap: 1}}> <Icon fontSize='1.25rem' icon={'noto-v1:open-book'} />  {courseData?.name}</Box>
                  <Box sx={{fontSize: 13,display: 'flex', alignItems: 'center', gap: 1}}><Icon fontSize='1.25rem' icon={'line-md:email-opened'} /> {studentData?.email}</Box>
              </Box>

              <Box sx={{display: 'flex', flex: 1 ,alignItems: {xs: 'center' , lg: 'center'} , marginTop: {xs: 4 , lg: 0}  ,flexDirection: 'column', gap: 2}}>
                  <Box sx={{ display: 'flex', fontSize: 12, justifyContent: 'space-between', width: { xs: '100%', md: '50%', lg: '100%' } }}>
                  <Box>Progress</Box>
                  <Box>{studentData?.progress && studentData?.progress[0]?.completionPercentage}%</Box>
                </Box>

                  <Box sx={{ background: '#D9D9D9', height: 8, width: { xs: '100%', md: '50%', lg: '100%' } , borderRadius: 20 , overflow: 'hidden'}}>
                  <Box sx={{background: '#FF9F43', height: '100%',width: studentData?.progress?  studentData?.progress[0]?.completionPercentage + 'px' : 0}}></Box>
                </Box>
              </Box>

            </Box>

          </Box>
        </Box>

        </Card>

        <Card sx={{mt: 5 , p: 5}}>
          {
            stages?.map((stage,idx) => {
              return (
                <Accordion key={idx} sx={{ boxShadow: 'none !important' }} style={{ boxShadow: 'none !important' }} defaultExpanded={false}>
                <AccordionSummary
                    sx={{ borderColor: '#bbb', borderWidth: 1, borderBottomRightRadius: 1, borderBottomLeftRadius: 1, borderStyle: 'solid', borderRadius: 1, borderLeftColor: parseInt(stage.completionPercentage) == 0 ? '#999' : "#FF9F43" , borderLeftWidth: 6 , borderLeftStyle: 'solid' , borderBottomStyle: 'solid'}}
                  expandIcon={<Icon fontSize='1.25rem' icon={"ic:baseline-expand-less"} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >

                    <Box sx={{ position: 'relative', display: 'inline-flex', mr: 5, height: 'fit-content' , padding: {xs: '2px 0px' , md: '8px 0px' }, }}>

                      <CircularProgress
                        disableShrink
                        variant="determinate"
                        sx={{ color: parseInt(stage.completionPercentage) == 0 ? '#999' : "#FF9F43" }}
                        value={parseInt(stage.completionPercentage) == 0 ? 100 : stage.completionPercentage}
                        size={50}
                      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform:'translate(-50%,-50%)',

        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
                          {parseInt(stage.completionPercentage)}%
        </Typography>
      </Box>
    </Box>

                <Box sx={{display: 'flex', flexDirection: 'column' , gap: 3}}>
                  <Box sx={{display: 'block'}}>{stage.stagesProgress.stageName}</Box>
                  <Box sx={{fontSize: 13}}>
                    {stage.stagesProgress.stageDescription}
                  </Box>

                </Box>
                </AccordionSummary>
                  <AccordionDetails  sx={{ borderColor: '#bbb', backgroundColor: '#7B798411' , borderWidth: 1 , borderStyle: 'solid',borderLeftWidth: 0, overflow: 'hidden', borderRadius: 1 , p: 0 , marginLeft: 10 , marginTop: 2}}>
                  {
                    stage.stagesProgress.subStagesProgress.length >0 ? stage.stagesProgress.subStagesProgress.map((subStage,idx) => {
                      return (
                        <>
                          <AccordionSummary onClick={() => { handleSetTypeOfOpen(stage, subStage) }} sx={{
                            borderLeft: '6px solid #FF9F43', borderLeftColor: subStage.isFulfilled ? '#FF9F43' : '#A4A2AA' , borderRadius: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', padding: {xs: '0px 0px' , ms: '0px 0px'} , width: '100%',justifyContent: 'space-between', gap: 4}}>

                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>

                                <Checkbox
                                  sx={{ accentColor: subStage.isFulfilled ? '#FF9F43' : '#7B798411' }}
                                  disabled
                                  checked={subStage.isFulfilled}
                                />

                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{fontSize: 15}}>{subStage.subStageName}</Box>
                                <Box sx={{fontSize: 13}}>{subStage.subStageDescription}</Box>
                              </Box>

                              </Box>

                      </Box>

                    </AccordionSummary>
                    {idx != (stage.stagesProgress.subStagesProgress.length-1) && <Divider sx={{margin: '0px auto', width: '90%'}}></Divider>}
                        </>

                      )
                    })

                        :
                        <></>

                  }
                </AccordionDetails>
              </Accordion>
              )
            })
          }


      </Card>


      </Grid>
      <ViewStageModel open={open} setOpen={setOpen} stageData={selectedStage}  selectedSubStage={selectedSubStage} studentId={studentId}/>
      <EditStageModel setRefetchStages={setRefetchStages} open={openEdit} setOpen={setOpenEdit} stageData={selectedStage} studentId={studentId} selectedSubStage={selectedSubStage}/>
    </Grid>
  )
}
export default StudentProfile
