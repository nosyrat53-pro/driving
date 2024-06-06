import { Icon } from "@iconify/react";
import { Box, Card, Typography } from "@mui/material";
import { display } from "@mui/system";
import { useRouter } from "next/router";


const StudentCard = ({studentData}) => {

    const {
        avatarPath,
        created_at,
        email,
        firstName,
        id,
        lastName,
        phone,
        progress,
    updated_at } = studentData;
  
  const router = useRouter();

    return (
      <Card sx={{boxShadow: 3 , marginBottom: 4}} onClick={() => router.push(`/mobile-student-profile/${id}`)}>
        <Box sx={{ display: 'flex',  gap: "10%", p: 3 , width: '100%'}}>
          
        <Box sx={{ width: 40, height: 40, borderRadius: 20,display: 'flex', justifyContent: 'center', alignItems: 'center' ,backgroundColor: '#224' }}>
            <Typography sx={{color: 'white', p: 2}}>{firstName[0] + lastName[0]}</Typography>
        </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{firstName + ' ' +lastName}</Typography>
            <Typography sx={{color: '#d55' , fontSize: 12}}>in 2 hours</Typography>
            <Typography sx={{color: '#d55' , fontSize: 12 , display: 'flex', alignItems: 'center', gap: 1}}>
              <Icon icon='il:mobile' color='#d55' /> in 2 hours{' '}
            </Typography>
          </Box>
        </Box>
      </Card>
    )

}

export default StudentCard;