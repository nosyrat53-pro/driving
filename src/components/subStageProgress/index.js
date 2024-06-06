import { Box } from "@mui/material";


const SubStageProgress = ({ percentage }) => {

    return <Box sx={{width: '100%' , height: '5px' , backgroundColor: '#ccc',position: 'relative' , borderRadius: 1}}>
        
        <Box sx={{ backgroundColor: '#FF9F43', height: '5px', width: percentage + '%', position: 'absolute', top: 0, left: 0 }}></Box>
        
        {percentage > 0 && 
        <Box sx={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF9F43', position: 'absolute', top: -2, left: percentage - .5 + '%' }}></Box>
        }
        
        
        <Box sx={{ backgroundColor: 'white', height: '5px', width: 2, position: 'absolute', top: 0, left: '15%' }}></Box>
        <Box sx={{ backgroundColor: 'white',height: '5px', width: 2, position: 'absolute', top: 0, left: '35%' }}></Box>
        <Box sx={{ backgroundColor: 'white',height: '5px', width: 2, position: 'absolute', top: 0, left: '55%' }}></Box>
        <Box sx={{ backgroundColor: 'white',height: '5px', width: 2, position: 'absolute', top: 0, left: '75%' }}></Box>
    
    </Box>

}

export default SubStageProgress;