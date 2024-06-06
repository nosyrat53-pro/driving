
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
import CustomTextField from 'src/@core/components/mui/text-field';
import StudentCardSkelton from 'src/components/studentCard/StudentCardSkelton';
import SubStageProgress from 'src/components/subStageProgress';


function StudentProfile() {

    const [open, setOpen] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [selectedStage, setSelectedStage] = useState({});
    const [selectedSubStage, setSelectedSubStage] = useState({});
    const [studentData, setStudentData] = useState({ progress: [] });
    const [courseData, setCourseData] = useState({});
    const [completionPercentageData, setCompletionPercentageData] = useState({});
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetchStages, setRefetchStages] = useState(true)
    const theme = useTheme();
    const [search, setSearch] = useState('');

    const params = useParams();
    const { id: studentId } = params;




    const handleSetTypeOfOpen = (stage, substage) => {

        const userData = JSON.parse(localStorage.getItem('userData'));

        if (userData.role == 'student' || userData.role == 'admin') {
            setSelectedStage({ ...stage });
            setSelectedSubStage({ ...substage })
            setOpen(true)
        } else {
            setSelectedStage({ ...stage });
            setSelectedSubStage({ ...substage })
            setOpenEdit(true)

        }



    }

    // get student profile with stages

    useEffect(() => {

        // get student data
        axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/users/${studentId}`, {
            params: {},
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {

            setStudentData({ ...res.data[0] })
        });


    }, [refetchStages])


    // get total student completion progress
    useEffect(() => {

        if (studentData?.id) {
            //   axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/progress/total/${studentId}`, { params: {},
            //   headers: {
            //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            //   }
            //  }).then(res => {
            //   setCompletionPercentageData({...res.data})
            //  });
        }

    }, [])


    // get course data
    useEffect(() => {

        if (studentData?.progress?.length) {

            // get course data
            axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/courses/${studentData?.progress[0]?.courseId}`, {
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setCourseData({ ...res.data })
            });



            //get student progress
            axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/progress/byCourse/${studentId}/${studentData?.progress[0]?.courseId}`, {
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {

                setStages([...res.data])
                setLoading(false)
            });

        }

    }, [studentData])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center' , p: 5}}>
                    <Box sx={{backgroundColor: '#224', p: 2 , borderRadius: 10}}>
                        <Typography color="white" sx={{paddingLeft: 4 , paddingRight: 4}}>Progress</Typography>
                    </Box>
                    <Box sx={{backgroundColor: '#224', p: 2 , borderRadius: 10}}>
                        <Typography color="white" sx={{paddingLeft: 4 , paddingRight: 4}}>Profile</Typography>
                    </Box>
            </Box>

                <Card sx={{borderRadius: 0}}>
                    <Box sx={{ borderRadius: 0 }}>
                        {/* <Box sx={{ p: 3, height: {xs: 60 ,lg:150} , width: '100%', background: ' linear-gradient(to right, #7D4192 60%, #FFE6A6 )'}}></Box> */}

                        <Box sx={{ p: 3,backgroundColor: '#224', position: 'relative' }}>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '5%' }}>

                                {/* <Box sx={{ display: 'flex', width: { xs: '100%', lg: '50%' }, justifyContent: { xs: 'space-evenly', lg: "space-between" }, alignItems: 'flex-end', height: '100%', flexWrap: 'wrap', gap: 5 }}>
                                    <Box sx={{ fontSize: 13, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3, height: '100%' }}>
                                        <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}><Icon fontSize='1.25rem' icon={'uil:user'} />{studentData?.firstName + " " + studentData?.lastName}</Typography>
                                    </Box>

                                    <Box sx={{ fontSize: 13, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3, height: '100%' }}>
                                        <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}><Icon fontSize='1.25rem' icon={'basil:phone-outline'} />{studentData?.phone}</Typography>
                                    </Box>

                                    <Box sx={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}> <Icon fontSize='1.25rem' icon={'noto-v1:open-book'} />  {courseData?.name}</Box>
                                    <Box sx={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}><Icon fontSize='1.25rem' icon={'line-md:email-opened'} /> {studentData?.email}</Box>
                                </Box> */}


                                <Box sx={{ position: 'relative', display: 'inline-flex', mr: 5, height: 'fit-content', padding: { xs: '2px 0px', md: '8px 0px' }, }}>

                                    <CircularProgress
                                    style={{color: '#fff'}}
                                        disableShrink
                                        variant="determinate"
                                        sx={{ color: parseInt(studentData?.progress[0]?.completionPercentage) == 0 ? '#999' : "#FF9F43" }}
                                        value={parseInt(studentData?.progress[0]?.completionPercentage) == 0 ? 100 : studentData?.progress[0]?.completionPercentage}
                                        size={50}
                                    />

                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)',

                                        }}
                                    >
                                        <Typography variant="caption" component="div" color="white">
                                            {parseInt(studentData?.progress[0]?.completionPercentage)}%
                                        </Typography>
                                    </Box>

                                </Box>
                                    <Typography sx={{color: '#fff'}}>completion Progress percentage</Typography>

                            </Box>

                        </Box>
                    </Box>

                </Card>

                <Card sx={{ mt: 5, p: 5 , borderRadius: 0 , backgroundColor: 'transparent' , boxShadow: 'none' }}>
                    
                    {
                        loading ? [1, 2, 3, 4, 5, 6].map((el, idx) => {
                            return <StudentCardSkelton />
                        })
                        :
                        null
                    }
                    
                    {
                        stages?.map((stage, idx) => {
                            return (
                                <Accordion key={idx} sx={{ boxShadow: 'none !important' }} style={{ boxShadow: 'none !important' }} defaultExpanded={false}>
                                    <AccordionSummary
                                        sx={{ borderColor: '#bbbbbb55', borderWidth: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, borderStyle: 'solid', borderRadius: 0,  borderLeftWidth: 0, borderLeftStyle: 'solid', borderBottomStyle: 'solid' }}
                                        expandIcon={<Icon fontSize='1.25rem' icon={"ic:baseline-expand-less"} />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >

                                        <Box sx={{ position: 'relative', display: 'inline-flex', mr: 3  , height: 'fit-content', padding: { xs: '2px 0px', md: '8px 0px' }, }}>

                                            <CircularProgress
                                                disableShrink
                                                variant="determinate"
                                                sx={{ color: parseInt(stage.completionPercentage) == 0 ? '#999' : "#FF9F43" }}
                                                value={parseInt(stage.completionPercentage) == 0 ? 100 : stage.completionPercentage}
                                                size={40}
                                            />

                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%,-50%)',

                                                }}
                                            >
                                                <Typography variant="caption" component="div" fontSize={'.65rem'} color="text.secondary">
                                                    {parseInt(stage.completionPercentage)}%
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <Box sx={{ display: 'block' }}>{stage.stagesProgress.stageName}</Box>
                                            <Box sx={{ fontSize: 13 }}>
                                                {stage.stagesProgress.stageDescription}
                                            </Box>

                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ borderColor: '#fff',  overflow: 'hidden', borderRadius: 0, p: 0, marginLeft: 0, marginTop: 0 , borderTopWidth: 0 }}>
                                        {
                                            stage.stagesProgress.subStagesProgress.length > 0 ? stage.stagesProgress.subStagesProgress.map((subStage, idx) => {
                                                return (
                                                    <>
                                                        <AccordionSummary onClick={() => { handleSetTypeOfOpen(stage, subStage) }} sx={{
                                                              borderRadius: 0 
                                                        }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', padding: { xs: '0px 0px', ms: '0px 0px' }, width: '100%', justifyContent: 'space-between', gap: 4 }}>

                                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 , flex: 1 }}>

                                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 , marginBottom: 2}}>
                                                                        <Box sx={{ fontSize: 15 }}>{subStage.subStageName}</Box>
                                                                        <Box sx={{ fontSize: 13 , color: '#999'}}>{subStage.subStageDescription}</Box>
                                                                    </Box>
                                                                    

                                                                    <SubStageProgress percentage={subStage.isFulfilled ? 100 : 0} />
                                                                </Box>

                                                                <Icon fontSize={'1.1rem'} style={{transform: 'rotate(90deg)'}} icon={"ic:baseline-expand-less"} />

                                                            
                                                            </Box>

                                                        </AccordionSummary>
                                                        
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
            <ViewStageModel open={open} setOpen={setOpen} stageData={selectedStage} selectedSubStage={selectedSubStage} studentId={studentId} />
            <EditStageModel setRefetchStages={setRefetchStages} open={openEdit} setOpen={setOpenEdit} stageData={selectedStage} studentId={studentId} selectedSubStage={selectedSubStage} />
        </Grid>
    )
}
export default StudentProfile
