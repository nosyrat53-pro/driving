
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'

// ** MUI Imports
import { Button, Checkbox, CircularProgress, Divider, TextareaAutosize } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// ** Icon Imports
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import CustomTextField from '../../@core/components/mui/text-field'
import CustomCheckbox from '../../@core/components/custom-checkbox/basic'
import OptionsMenu from '../../@core/components/option-menu'

import BaseCrud from "/src/@core/utils/api_helper";
import axios from 'axios'
import toast from 'react-hot-toast'
import DeleteModal from '../../components/delete-model'
import { useTheme } from '@emotion/react'

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

const EditStageModel = ({ open, setOpen , stageData ,selectedSubStage, studentId,setRefetchStages }) => {
  const [ShowAddCommentFrom , setShowAddCommentForm] = useState(false);
  const [comment,setComment] = useState('');
  const [stageComments,setStageComments] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [refetchComments,setRefetchComments] = useState(false);
  const [selectedComment,setSelectedComment] = useState(null);
  const [openDeleteModal,setOpenDeleteModal] = useState(false);
  const [isEditingComment ,setIsEditingComment] = useState(false);
  const [commentEditing,setCommentEditing] = useState('');
  const [isFulilledStatus,setIsFulFilledStatus] = useState(stageData?.isFulfilled);
  const progressRef = useRef();
  const theme = useTheme();

  const comments_crud = new BaseCrud('/dev/Comments')

  const handleSubmitComment = () => {

    const dataToSend = {
      "content": comment,
      "teacherId": JSON.parse(localStorage.getItem('userData')).id,
      "studentId": parseInt(studentId) ,
      "stageId": selectedSubStage?.subStageId
    }



    if(comment == ''){
      toast.error('Please fill out the comment field before saving it')
    }else {

      setIsLoading(true);

      comments_crud.create(dataToSend,{})
        .then((res) => {

          // hide add-comment form
          setShowAddCommentForm(false);
          setOpen(false)

          // refetching comments
          setRefetchComments(prev => !prev);
          toast.success('Comment added succesfully')

          return res;
        })
        .catch(err => {
          toast.error(err.response.data.message)
        })
        .finally(() => {
          setIsLoading(false);
          setComment('');
        });
    }



  }

  const deleteTable = async (id:number) => {
    setIsLoading(true);
    await comments_crud.destroy(id).then((res) => {
      // refetchTable()
      // handleClickVariant("error")
      setRefetchComments(prev => !prev);
      toast.success('Comment deleted succesfully')

      return res;
    })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleEditComment = () => {
    if(commentEditing == ''){
      toast.error('Please fill out the comment field before saving it')
    }else {

      setIsLoading(true);

      comments_crud.update(selectedComment.id,{content: commentEditing})
        .then((res) => {

          // hide add-comment form
          // setShowAddCommentForm(false);
          setIsEditingComment(false);
          setOpen(false);

          // refetching comments
          setRefetchComments(prev => !prev);
          toast.success('Comment Edited succesfully')

          return res;
        })
        .finally(() => {
          setIsLoading(false);
          setCommentEditing('');

        });
    }
  }

  const handleUpdateProgressStatus = () => {

    const form = {
      progressId: selectedSubStage?.id ,
      isFulfilled: isFulilledStatus,
      updated_by: JSON.parse(localStorage.getItem('userData')).id
    }

    setIsLoading(true);

    axios.patch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/progress/update`, {...form} ,
    {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
    .then(res => {
      toast.success('progress status has been updated');
      setRefetchStages(prev => !prev);
      setOpen(false)
    })
    .catch(err => {
      toast.error(err.response.data.message)
    })
    .finally(() => {
      setIsLoading(false);
    })

  }

  useEffect(() => {

    if(stageData?.stagesProgress?.id){

    // get stage comments
      axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/Comments/${selectedSubStage?.subStageId}/${studentId}`, { params: {},
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
    }).then(res => {

    setStageComments([...res.data]);
    })
      .catch(err => {
      toast.error(err.response.data.message)
    })


  }

  },[stageData,refetchComments]);

  useEffect(() => {

    if(progressRef.current){
      progressRef.current.checked == isFulilledStatus

    }
  },[isFulilledStatus]);

  useEffect(() => {
    if (selectedSubStage) {
      setIsFulFilledStatus(selectedSubStage?.isFulfilled)
    }
  },[selectedSubStage])



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
        <Box padding={1} style={{ height: '100%' }} >
          <Box onSubmit={(e) => e.preventDefault()} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'nowrap' }} >
            <Box sx={{p: 5}}>
            <Typography variant='h5' sx={{ fontWeight: 600, textTransform: 'uppercase' , mb: 2}}>
            {selectedSubStage?.subStageName}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{selectedSubStage?.subStageDescription}</Typography>

          <Divider sx={{my: 5}}/>

           {
            ShowAddCommentFrom ?
            <Box>
            <>
          <CustomTextField  label='' fullWidth style={{ marginTop: '10px'  }} onChange={e => setComment(e.target.value)} />
          <div style={{ marginTop: '10px' , textAlign: 'end' }}>
          <Button size='small' variant='text' color='secondary' type='submit' disabled={isLoading} onClick={() => {setShowAddCommentForm(false)}}>
              Cancel
            </Button>
            <Button size='small' variant='text' disabled={isLoading} color='warning' onClick={() => { handleSubmitComment() }}>
              save {isLoading ? <CircularProgress sx={{marging: '0px 8px'}} size={20} color="inherit" /> : null}
            </Button>
            {' '}

          </div></>
            </Box>
            :
          <Typography onClick={() => setShowAddCommentForm(true)} sx={{display: 'flex' ,my: 5, cursor: 'pointer', color: '#FF9F43', alignItems: 'center', textDecoration: 'underLine' , gap: 1}}>
            Add Comment<Icon fontSize='1.25rem' icon={'carbon:edit'} />
            </Typography>

           }


           <Box sx={{display: 'flex', justifyContent: 'space-between' , alignItems: 'center'}}>
          <Typography variant='h5' sx={{ fontWeight: 600}}>
            Progress
          </Typography>

          <Typography variant='h6' sx={{ fontWeight: 400 , display: 'flex',alignItems: 'center',gap: '10px'}}>

          {/* <Checkbox
          label={{ inputProps: { 'aria-label': 'Checkbox demo' }}}
          defaultChecked={isFulilledStatus}
          checked={isFulilledStatus}
          name="Done"
          ref={progressRef}
          onChange={(e) => {setIsFulFilledStatus(prev => !prev)}}
          color="warning"
          /> */}
          <input
          type="checkbox"
          style={{
          width: '25px',
          height: '25px',
          accentColor: '#FF9F43',
          cursor: 'pointer',
          borderRadius: '8px'
          }}
          checked={isFulilledStatus}
          onChange={(e) => {setIsFulFilledStatus(prev => !prev)}}
          />

           Done
          </Typography>


           </Box>



          <Box sx={{my: 4}}>

            {
              stageComments.length != 0 ?
            <Typography variant='h6' sx={{ fontWeight: 600}}>
              All Comment
            </Typography>
            :
            null
            }

          <Box sx={{maxHeight: '320px',  display: stageComments.length == 0 ? 'none' : 'block' , overflow: 'hidden', overflowY: 'scroll' ,borderWidth: '1px', borderStyle: 'solid', p: 4, my: 4,borderColor: theme => theme.palette.secondary , borderRadius: 1}}>
          {
            stageComments?.map((comment,idx) => {
              return (
                <>
                {
                  isEditingComment && (comment.id == selectedComment.id) ?
                  <>
                 <TextareaAutosize
                 style={{background: 'transparent' , width: '100%' , outline: 'none' , borderRadius: 5 , minHeight: 40,padding: '8px 10px',fontSize: 17,lineHeight: 1.5,color: theme.palette.mode == 'light' ? '#333' : 'white'}}
                 aria-label="minimum height"
                 minRows={3}
                 disabled={isLoading}
                 placeholder="please fill this field to update the comment"
                 value={commentEditing}
                 onChange={e => setCommentEditing(e.target.value)}
                 />

                <div style={{ marginTop: '10px' , textAlign: 'end' }}>
                  <Button size='small' variant='text' color='secondary' type='submit' disabled={isLoading} onClick={() => {setIsEditingComment(false)}}>
                  Cancel
                  </Button>
                  <Button size='small' variant='text' disabled={isLoading} color='warning' onClick={() => { handleEditComment() }}>
                  save {isLoading ? <CircularProgress sx={{marging: '0px 8px'}} size={20} color="inherit" /> : null}
                  </Button>
                </div>
                 <Divider  sx={{my: 2}}/>
                  </>

                  :
                  <>
                <Box>
                  <Box sx={{textAlign: 'end'}}>
                  <OptionsMenu
                    iconButtonProps={{ size: 'small' }}
                    options={[
                      {
                        text: 'Edit',
                        icon: <Icon icon='typcn:edit' />,
                        menuItemProps: {
                          onClick: () => {
                            setSelectedComment({...comment});
                            setIsEditingComment(true)
                            setCommentEditing(comment.content)
                          }
                        }
                      },
                      {
                        text: 'Delete',
                        menuItemProps: {
                          onClick: () => {
                            setSelectedComment({...comment})
                            setOpenDeleteModal(true);
                          }
                        },
                        icon: <Icon icon='uiw:delete' onClick={() => console.log("test test")} />
                      }
                    ]}
                  />
                  </Box>
                  <Typography sx={{lineHeight: 1.8}}>
                    {comment.content}
                  </Typography>

                  <Typography sx={{textAlign: 'end' , fontSize: 12,mt:1}}>{comment.created_at.split('T')[0]}</Typography>

                </Box>
                <Divider  sx={{my: 2}}/>
                </>
                }

                </>
              );
            })
          }

          </Box>

          </Box>

            </Box>


            <div style={{ marginTop: '10px' }}>
              <Button disabled={isLoading} variant='outlined' color='secondary' onClick={() => { setOpen(false) }}>
                Cancel
              </Button>
              {' '}
              <Button disabled={isLoading} variant='contained' color='warning' onClick={() => { handleUpdateProgressStatus() }}>
                Confirm {isLoading ? <CircularProgress sx={{marging: '0px 8px'}} size={20} color="inherit" /> : null}
              </Button>
            </div>
          </Box>
        </Box>
      </Drawer>
      <DeleteModal working={isLoading} rowId={selectedComment?.id} deleteTable={deleteTable} openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />
    </div >
  )
}

export default EditStageModel
