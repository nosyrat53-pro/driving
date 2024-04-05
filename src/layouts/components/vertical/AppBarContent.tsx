// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from '/src/@core/components/icon'

// ** Type Import
import { Settings } from '/src/@core/context/settingsContext'

// ** Components
import ModeToggler from '/src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from '/src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from '../../../@core/layouts/components/shared-components/NotificationDropdown'
import LanguageDropdown from '../../../@core/layouts/components/shared-components/LanguageDropdown'
import Image from 'next/image'
import IconifyIcon from '../../../@core/components/icon'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from 'react'
import { HistoryBrowsingContext } from '../../../context/HistoryBrowsing'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const userData = JSON.parse(localStorage.getItem('userData'));

  const { routes,setRoutes } = useContext(HistoryBrowsingContext);

  const firstRender = useRef(0);

  const router = useRouter();


  const notifications = [
    {
      avatarAlt: 'Notication icon' ,
      avatarImg: null ,
      avatarIcon: <Icon  fontSize='1.25rem' icon="carbon:phone" />,
      avatarText: '',
      avatarColo: 'warning',
      title: 'Lesson comming up',
      subtitle: 'You’ve got a lesson in 5 minutes',
      meta: 'Today'
    }
  ]

  const handleGoBack = () => {

    if (routes.length >= 2) {
      router.push(routes[routes.length - 2]);
      routes.pop();
      setRoutes([...routes]);
    }

    if (routes.length == 1) {
      router.push(routes[0]);
      setRoutes([]);
    }

  }

  useEffect(() => {
    // increase first render number for activating back button again
    firstRender.current++;

    // reset firstRender when we return to first route to disable the back button
    if (routes.length == 0 && firstRender.current !== 0) {
      firstRender.current = 0
    }
  },[routes.length])

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>

        {
          userData.role == 'admin' || userData.role == 'teacher' ?
            <IconButton
              disabled={routes?.length == 0 || firstRender.current == 0}
              onClick={() => { handleGoBack() }} >

              <IconifyIcon
                icon='ic:round-arrow-back'
                color={routes.length == 0 || firstRender.current == 0? '#5c5e6688' : '#acb0cc'}
                />
            </IconButton>
            :
            null
        }

        {
          userData.role == 'student' || userData.role == 'teacher' ? <Image src={`/images/avatars/drawer-icon.png`} width={150} height={40} />
          :  null
        }


        {hidden ? (
          userData.role == 'student' || userData.role == 'teacher'  ?
          null
          :
          <IconButton color='inherit'  onClick={toggleNavVisibility}>
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}



        <ModeToggler settings={settings} saveSettings={saveSettings} />

      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <LanguageDropdown settings={settings} saveSettings={saveSettings} /> */}
        {/* <NotificationDropdown settings={settings} notifications={notifications}/> */}

        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
