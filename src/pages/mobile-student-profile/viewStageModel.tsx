import React from 'react'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** MUI Imports
import { Button, Divider } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// ** Icon Imports
import { Icon } from '@iconify/react'
import axios from 'axios'
import { useParams } from 'next/navigation'


// styled mui
const Drawer = styled(MuiDrawer)<DrawerProps>(({ theme }) => ({
    width: 400,
    zIndex: theme.zIndex.modal,
    '& .MuiFormControlLabel-root': {
        marginRight: '0.6875rem'
    },
    '& .MuiDrawer-paper': {
        border: 0,
        width: 400,
        zIndex: theme.zIndex.modal,
        boxShadow: theme.shadows[9]
    }
}))

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

const ViewStageModel = ({ open, setOpen, stageData, studentId, selectedSubStage }) => {

    const [stageComments, setStageComments] = React.useState([]);

    React.useEffect(() => {

        if (selectedSubStage?.subStageId) {

            // get stage comments
            axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/Comments/${selectedSubStage?.subStageId}/${studentId}`, {
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => {
                setStageComments([...res.data]);
            });
        }
    }, [stageData]);



    return (
        <div className='customizer'>
            <Drawer open={open} anchor='right' onClose={() => setOpen(false)} PaperProps={{
                sx: { maxWidth: '100vw' }
            }}>
                <Box
                    className='customizer-header'
                    sx={{
                        position: 'relative',
                        p: theme => theme.spacing(6, 5),
                        borderBottom: theme => `1px solid ${theme.palette.divider}`
                    }}
                >

                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{
                            right: 20,
                            top: '50%',
                            position: 'absolute',
                            color: 'text.secondary',
                            transform: 'translateY(-50%)'
                        }}
                    >
                        <Icon icon='tabler:x' fontSize={20} />
                    </IconButton>
                </Box>
                <Box padding={3} style={{ height: '100%' }} >
                    <Box onSubmit={(e) => e.preventDefault()} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'nowrap' }} >
                        <Box sx={{ p: 5 }}>
                            <Typography variant='h5' sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 4 }}>
                                {selectedSubStage?.subStageName}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{selectedSubStage?.subStageDescription}</Typography>

                            <Divider sx={{ my: 5 }} />


                            <Typography variant='h5' sx={{ fontWeight: 600 }}>
                                Progress
                            </Typography>

                            <Box>
                                <Typography variant='h6' sx={{ fontWeight: 400, textAlign: 'end', textTransform: 'uppercase', mb: 4 }}>
                                    {selectedSubStage?.isFulfilled ? '100' : '0'}%
                                </Typography>
                                <BorderLinearProgress variant="determinate" value={selectedSubStage?.isFulfilled ? 100 : 0} />
                            </Box>

                            <Box sx={{ my: 4 }}>



                                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                    All Comments
                                </Typography>

                                {
                                    stageComments?.length == 0 ?
                                        <Box sx={{ borderWidth: '1px', borderStyle: 'solid', p: 4, my: 4, borderColor: theme => theme.palette.secondary, borderRadius: 1 }}>
                                            <Typography variant='h6' sx={{ fontWeight: 600, width: '100%', textAlign: 'center' }}>
                                                There is not comments yet
                                            </Typography>
                                        </Box>
                                        :
                                        null
                                }

                                {
                                    stageComments.length != 0 ?


                                        <Box sx={{ borderWidth: '1px', borderStyle: 'solid', p: 4, my: 4, borderColor: theme => theme.palette.secondary, borderRadius: 1 }}>
                                            {
                                                stageComments?.map((comment, idx) => {
                                                    return (
                                                        <>
                                                            <Box>

                                                                <Typography sx={{ lineHeight: 2.5 }}>
                                                                    {comment.content}
                                                                </Typography>

                                                                <Typography sx={{ textAlign: 'end', fontSize: 12 }}>{comment.created_at.split('T')[0]}</Typography>

                                                            </Box>
                                                            <Divider sx={{ my: 3 }} />
                                                        </>
                                                    );
                                                })
                                            }

                                        </Box>
                                        :

                                        null
                                }

                            </Box>




                        </Box>
                        <div style={{ marginTop: '10px' }}>
                            <Button variant='outlined' color='secondary' onClick={() => { setOpen(false) }}>
                                Cancel
                            </Button>
                            {' '}

                        </div>
                    </Box>
                </Box>
            </Drawer>
        </div >
    )
}

export default ViewStageModel
