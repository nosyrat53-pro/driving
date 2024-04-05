// ** Type import
import { VerticalNavItemsType } from '/src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'My-profile',
      path: `/student-profile/${JSON.parse(localStorage.getItem('userData')).id}`,
      icon: 'gg:profile',
      roles: ['student']
    },
    {
      title: 'Statistics',
      path: '/statistics',
      icon: 'mdi:report-finance',
      roles: ['admin']
    },
    {
      path: '/students',
      action: 'read',
      subject: 'acl-page',
      title: 'Students',
      icon: 'ph:student',
      roles: ['admin']
    },
    {
      path: '/instructors',
      action: 'read',
      subject: 'acl-page',
      title: 'Instructors',
      icon: 'mdi:teacher',
      roles: ['admin']
    },
    {
      path: '/schools',
      action: 'read',
      subject: 'acl-page',
      title: 'Schools',
      icon: 'lucide:school',
      roles: ['admin']
    },
    {
      path: '/categories',
      action: 'read',
      subject: 'acl-page',
      title: 'Categories',
      icon: 'carbon:categories',
      roles: ['admin']
    },
    {
      path: '/courses',
      action: 'read',
      subject: 'acl-page',
      title: 'Courses',
      roles: ['admin'],
      icon: 'solar:course-up-outline'
    },
    {
      path: '/instructor-students',
      action: 'read',
      subject: 'acl-page',
      title: 'students',
      icon: 'tabler:code',
      roles: ['teacher']
    }
  ]
}

export default navigation
