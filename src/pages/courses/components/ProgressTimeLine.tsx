
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from '/src/@core/components/icon'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

// ** MUI Imports
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import CustomTextField from '../../../@core/components/mui/text-field'

import axios from 'axios'
import DeleteModal from './DeleteStageModal'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})




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

const ProgressTimeLine = ({ open, setOpen,selectedCourse }) => {
  const [stages, setStages] = useState([]);
  const [stage, setStage] = useState({
    courseId: null,
    description: '',
    name: ''
  });
  const [parentIdForSubStage,setParentIdForSubStage] = useState(null);
  const [subStage,setSubStage] = useState({
    name: '',
    description: ''
  });

  const [showForm, setShowForm] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [deleteId, setDeleteId] = useState(-1)

  const [EditId,setEditId] = useState(null);
  const [editstage,setEditStage] = useState({});
  const [loadingEdit,setLoadingEdit] = useState(false);

  const [EditSubId,setEditSubId] = useState(null);
  const [editSubStage,setEditSubStage] = useState({});
  const [loadingSubEdit,setLoadingSubEdit] = useState(false);

  const [openDeleteModal,setOpenDeleteModal] = useState(false);

  // get stages
  const getStage = (id) => {

    axios.get(process.env.NEXT_PUBLIC_DEV_BASE_URL + `/dev/stages/courseId/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {
      setStages([...res.data])

    })
  }

  // Get stages with their subs
  useEffect(() => {

    if(selectedCourse?.id){
      getStage(selectedCourse?.id)
    }

  }, [selectedCourse]);


  // Create Stage
  const handleSubmit = async () => {

    const dataToSend = {
      ...stage,
      courseId: selectedCourse?.id,
    };

    if(dataToSend?.name == '' || dataToSend.description == ''){
      toast.error('please fill out all field before submitting');
    }else {

    setLoadingSubmit(true);

    axios.post(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/stages/create`, dataToSend, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {

      getStage(selectedCourse?.id)
      setShowForm(false)
      toast.success('Created Successfully')

      return res.data
    }).finally(() => {
      setLoadingSubmit(false)
    })

  }


  }

  const handleEditStage = () => {

    const dataToSend = {
      name: editstage?.name,
      description: editstage?.description
    }

    if(dataToSend.name == '' || dataToSend.description == ''){
      toast.error('please fill out the fields befor submitting')
    }else {

      setLoadingEdit(true);

      axios.patch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/stages/${EditId}`, {...dataToSend} ,
      {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
      .then(res => {
        // if (res.status >= 200 && res.status < 300)
        //   useSnackbarStore().showSnackbar(res.data.message, { color: 'success' })
        setEditStage({name: '', description: ''});
        toast.success('stage Edited successfully');
        getStage(selectedCourse?.id)
      })
      .finally(() => {
        setLoadingEdit(false)
      })
    }


  }

  const handleEditSubStage = () => {

    const dataToSend = {
      name: editSubStage?.name,
      description: editSubStage?.description
    }

    if(dataToSend.name == '' || dataToSend.description == ''){
      toast.error('please fill out the fields befor submitting')
    }else {

      setLoadingEdit(true);

      axios.patch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/stages/${EditSubId}`, {...dataToSend} ,
      {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
      .then(res => {
        // if (res.status >= 200 && res.status < 300)
        //   useSnackbarStore().showSnackbar(res.data.message, { color: 'success' })
        setEditSubStage({name: '', description: ''});
        toast.success('stage Edited successfully');
        getStage(selectedCourse?.id)
      })
      .finally(() => {
        setLoadingSubEdit(false)
      })
    }


  }

  const handleAddSubStage = async () => {

    // setLoadingAddSubStage(true);

    const dataToSend = {
      ...subStage,
      parentId: parentIdForSubStage,
      courseId: selectedCourse?.id
    }

      if(dataToSend?.name == '' || dataToSend.description == ''){
        toast.error('please fill out all field before submitting');
      }else {

      setLoadingSubmit(true);

      axios.post(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/stages/createSubStage`, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then(res => {
        setLoadingSubmit(false)
        getStage(selectedCourse?.id)
        setShowForm(false)
        toast.success('Created subStage Successfully');



        return res.data
      });

    }


  }


  return (
    <div className='customizer'>
      <Drawer open={open} anchor='right' onClose={() => setOpen(false)}>
        <Box
          className='customizer-header'
          sx={{ position: 'relative', p: theme => theme.spacing(6, 5), borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
            Create Stages
          </Typography>

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

        <Box padding={4} xs={{ mt: 10 }}>
          <Timeline style={{ marginTop: '20px' }} >
            {
              stages.map((item, id) =>
                <TimelineItem key={id}>
                  <TimelineSeparator>
                    <TimelineDot color={id % 2 == 0 ? 'warning' : 'info'} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom', mx: 4 } }}>
                    <Box sx={{ mb: 2, display: 'flex',flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{width: '100%',display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between',mb: 3}}>
                        <Typography sx={{ mr: 2  }} variant='h6'>
                          {item.name}
                        </Typography>

                        <div style={{ cursor: 'pointer' , display: 'flex', alignItems: 'center'}}>
                        <Button onClick={() => { setParentIdForSubStage(item.id) }} sx={{ p:1 , fontSize: 12}} variant='contained'>
                          <Icon icon='tabler:plus' style={{margin: '0px'}}/> Add SubStage
                        </Button>
                          {EditId === id && loadingEdit ? <></> : <Icon icon='mi:edit' style={{cursor: 'pointer',margin: '0px 5px'}} size={30} onClick={() => { setEditId(item.id);setEditStage({...item}) }} />}
                          {deleteId === id && loadingDelete ? <></> : <Icon icon='mi:delete' style={{ cursor: 'pointer', margin: '0px 5px' }} size={30} onClick={() => { setOpenDeleteModal(true);setDeleteId(item.id) }} />}
                        </div>
                      </Box>

                      <Typography variant='caption' sx={{ color: 'text.disabled' ,textAlign: 'start' ,fontSize: 12,width: '100%' , display: 'block' }}>
                      {item.description}
                      </Typography>


                    </Box>

                  {/* Edit stage form */}
                  {
                      EditId == item.id ?
                    <Box>
                    <>
                  <CustomTextField label='stage name' fullWidth style={{ marginTop: '10px' }} value={editstage?.name} onChange={e => setEditStage({...editstage, name: e.target.value})} />
                  <CustomTextField multiline label='stage description' fullWidth style={{ marginTop: '10px' }} value={editstage?.description} onChange={e =>  setEditStage({...editstage, description: e.target.value})} />
                  <div style={{ marginTop: '10px' }}>
                    <Button size='small' variant='outlined' color='secondary' onClick={() => { setEditId(null),setEditStage({}) }}>
                      Cancel
                    </Button>
                    {' '}
                    <Button size='small' variant='contained' color='warning' type='submit' disabled={loadingEdit} onClick={() => { handleEditStage() }}>
                      Confirm
                    </Button>
                  </div></>
                    </Box>
                    :
                    null
                    }



                    {/* Add subStage form */}
                    {
                      parentIdForSubStage == item.id ?
                    <Box>
                    <>
                  <CustomTextField label='SubStage Name' fullWidth style={{ marginTop: '10px' }} onChange={e => setSubStage({...subStage, name: e.target.value})} />
                  <CustomTextField multiline label='SubStage Description' fullWidth style={{ marginTop: '10px' }} onChange={e =>  setSubStage({...subStage, description: e.target.value})} />
                  <div style={{ marginTop: '10px' }}>
                    <Button size='small' variant='outlined' color='secondary' onClick={() => { setParentIdForSubStage(null) }}>
                      Cancel
                    </Button>
                    {' '}
                    <Button size='small' variant='contained' color='warning' type='submit' disabled={loadingSubmit} onClick={() => { handleAddSubStage() }}>
                      Confirm
                    </Button>
                  </div></>
                    </Box>
                    :
                    null
                    }


                    <Box sx={{ border: '1px solid #eee', borderRadius: 1}}>

                    {/* render sub stages */}
                      {
                      item?.substages?.map((substage,idx) => (
                        <Box key={idx} sx={{display: 'flex', flexDirection: 'column' , padding: 2 ,borderBottom: '1px solid #eee' }}>

                        <Box sx={{width: '100%',margin: '10px auto' , display: 'flex', flexDirection: 'column',justifyContent: 'space-between', gap: '10px'}}>

                        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row' , justifyContent: 'space-between'}}>
                          <Typography sx={{ mr: 2 }} variant='h6'>
                          {substage.name}
                          </Typography>
                          <Box>
                            <div>
                                  {EditId === id && loadingSubEdit ? <></> : <Icon icon='mi:edit' style={{ cursor: 'pointer', margin: '0px 5px' }} size={30} onClick={() => { setEditSubId(substage.id), setEditSubStage({...substage})}} />}
                                  {deleteId === id && loadingDelete ? <></> : <Icon icon='mi:delete' style={{ cursor: 'pointer', margin: '0px 5px' }} size={30} onClick={() => {setOpenDeleteModal(true);setDeleteId(substage.id) }} />}
                            </div>
                        </Box>

                        </Box>

                        <Typography variant='caption' sx={{ fontSize: 13 ,color: 'text.disabled' , display: 'block' }}>
                          {substage.description}
                        </Typography>

                        </Box>

                  {/* Edit Substage form */}
                  {
                  EditSubId == substage.id ?
                    <Box>
                    <>
                      <CustomTextField label='subStage name' fullWidth style={{ marginTop: '10px' }} value={editSubStage?.name} onChange={e => setEditSubStage({...editSubStage, name: e.target.value})} />
                      <CustomTextField multiline label='subStage description' fullWidth style={{ marginTop: '10px' }} value={editSubStage?.description} onChange={e =>  setEditSubStage({...editSubStage, description: e.target.value})} />
                      <div style={{ marginTop: '10px' }}>
                        <Button size='small' variant='outlined' color='secondary' onClick={() => { setEditSubId(null),setEditSubStage({}) }}>
                        Cancel
                        </Button>
                        {' '}
                        <Button size='small' variant='contained' color='warning' type='submit' disabled={loadingSubEdit} onClick={() => { handleEditSubStage() }}>
                        Confirm
                        </Button>
                      </div>
                    </>
                    </Box>
                    :
                    null
                  }

                        </Box>



                      ))
                      }
                    </Box>


                  </TimelineContent>
                </TimelineItem>
              )
            }
            <TimelineItem>
              <TimelineSeparator>
                <Icon icon='material-symbols:add' fontSize={20} style={{ marginTop: '10px', marginLeft: '-3px' }} onClick={() => setStages(e => [...e])} />
              </TimelineSeparator>
              <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom', mx: 4 } }}>

                {showForm ? (<>
                  <CustomTextField label='Stage Name' fullWidth style={{ marginTop: '10px' }} onChange={e => stage.name = e.target.value} />
                  <CustomTextField multiline label='Stage Description' fullWidth style={{ marginTop: '10px' }} onChange={e => stage.description = e.target.value} />
                  <div style={{ marginTop: '10px' }}>
                    <Button size='small' variant='outlined' color='secondary' onClick={() => { setOpen(false) }}>
                      Cancel
                    </Button>
                    {' '}
                    <Button size='small' variant='contained' color='warning' type='submit' disabled={loadingSubmit} onClick={() => { handleSubmit() }}>
                      Confirm
                    </Button>
                  </div></>)
                  :
                  (<Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '3px', cursor: 'pointer' }} onClick={() => setShowForm(true)} >
                      Add A Stage
                    </div>
                  </Box>)
                }
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box >

      </Drawer >
      <DeleteModal
      working={loadingDelete}
      setLoadingDelete={setLoadingDelete}
      rowId={deleteId}
      getStage={getStage}
      selectedCourse={selectedCourse}
      openDeleteModal={openDeleteModal}
      setOpenDeleteModal={setOpenDeleteModal}
      />
    </div >
  )
}

export default ProgressTimeLine
