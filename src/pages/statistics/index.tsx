import React from 'react'
import CardStatisticsStatistics from './CardStatisticsStatistics'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Statistics() {


  const [Statistics, setStatistics] = React.useState({
    "studentsCount": 0,
    "teachersCount": 0,
    "coursesCount": 0,
    "schoolsCount": 0
  });

  React.useEffect(() => {
    // get Statistics
    axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/dev/Statistics/admin`, {
      params: {},
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {

      setStatistics({...res.data})
    })
      .catch(err => {
        toast.error(err.response.data.message)
    })
  },[])

  return <div>
    <CardStatisticsStatistics Statistics={Statistics} />
  </div>
}
