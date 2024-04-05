/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'student') return '/student-profile'
  if(role === 'teacher') return '/instructor-students'
  if(role == 'admin') return '/statistics'
}

export default getHomeRoute
