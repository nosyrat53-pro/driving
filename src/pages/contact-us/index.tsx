// React imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// mui imports
import { Grid , Typography ,Card ,CardHeader,Box, TextField} from '@mui/material'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Textarea from '@mui/joy/Textarea';

// third party imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Custom Component Import
import CustomTextField from '/src/@core/components/mui/text-field'

// styled components
const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

// ** Icon Imports
import Icon from '/src/@core/components/icon'


const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))


// const schema = yup.object().shape({
//   fullname: yup.string().fullname().required(),
//   phonenumber: yup.string().phonenumber().required()
// })

const defaultValues = {
  fullname: '',
  phonenumber: '',
  message: '',
}

interface FormData {
  fullname: string
  phonenumber: string
  message: string
}


function ContactUs() {

  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)


    const theme = useTheme()

    const {
      control,
      setError,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues,
      mode: 'onSubmit',
    })

    const onSubmit = (data: FormData) => {
      const { fullname, phonenumber , message} = data
      if(message == ''){
      setError('message', {type: 'required' , message: 'message is required*'})
      }

    }

    return (
        <Grid container spacing={6}>
                  <Grid item xs={12}>
                  <Card>
            <CardHeader sx={{ p: 3 , disply: 'flex', alignItems:'center' }} title={'Do you have any questions?'}/>

            <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`,
                  mt: '0px !important',
                }}
              >

              </Divider>

              <Typography sx={{ p: 3}} >contact us by sending your name and phone number and as soon ass possible time the manager will contact you and answer all your questions</Typography>
            <Box sx={{  p: 3}}>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 , position: 'relative'}}>
              <Box sx={{position: 'absolute' , top: 30 , left: 10}}>
                  <Icon  fontSize='1.25rem' icon="octicon:person-16" />
                </Box>
                <Controller
                  name='fullname'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                    sx={{px: 5}}
                      fullWidth
                      autoFocus
                      label='Full Name'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Enter Your Name'
                      error={Boolean(errors.fullname)}
                      {...(errors.fullname && { helperText: errors.fullname.message })}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 4 , position: 'relative'}}>
                <Box sx={{position: 'absolute' , top: 30 , left: 10}}>
                  <Icon  fontSize='1.25rem' icon="carbon:phone" />
                </Box>
                <Controller
                  name='phonenumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      sx={{px: 5 }}
                      fullWidth
                      autoFocus
                      label='Phone No.'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='123-456-7890'
                      error={Boolean(errors.phonenumber)}
                      {...(errors.phonenumber && { helperText: errors.phonenumber.message })}
                    />
                  )}
                />
              </Box>

              <Box sx={{ mb: 4 , position: 'relative'}}>
              <Box sx={{position: 'absolute' , top: 30 , left: 10}}>
                  <Icon  fontSize='1.25rem' icon="iconoir:message-text" />
                </Box>
                <Controller
                  name='message'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                    sx={{px: 5}}
                      fullWidth
                      autoFocus
                      label='Message'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='Bio...'
                      error={Boolean(errors.message)}
                      {...(errors.message && { helperText: errors.message.message })}
                    />
                  )}
                />
              </Box>

              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`,
                }}
              >

              </Divider>

              <Button type='submit' variant='contained' sx={{ mb: 4 }}>
                Submit
              </Button>

            </form>
            </Box>
          </Card>
      </Grid>

        </Grid>
    );
}

export default ContactUs;
