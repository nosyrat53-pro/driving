// ** React Imports
import { ReactNode, useEffect, useLayoutEffect } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'


// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports


// ** Fake-DB Import
import '/src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from '/src/layouts/UserLayout'
import AclGuard from '/src/@core/components/auth/AclGuard'
import ThemeComponent from '/src/@core/theme/ThemeComponent'
import AuthGuard from '/src/@core/components/auth/AuthGuard'
import GuestGuard from '/src/@core/components/auth/GuestGuard'

// ** Spinner Import
import Spinner from '/src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from '/src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from '/src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from '/src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from '/src/@core/utils/create-emotion-cache'


// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import '/src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import { defaultACLObj } from '../configs/acl'
import themeConfig from '../configs/themeConfig'
import { HistoryBrowsingProvider } from '../context/HistoryBrowsing'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const isMobile = router.pathname.includes('mobile')

  const getLayout =
    Component.getLayout ?? (page => isMobile ? <>{page}</> : <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj


  return (

    <CacheProvider value={emotionCache}>
      <Head>
        <title>{`${themeConfig.templateName.toUpperCase()} `}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <HistoryBrowsingProvider>
      <AuthProvider>
        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
          <SettingsConsumer>
            {({ settings }) => {
              return (
                <ThemeComponent settings={settings}>
                  <Guard authGuard={authGuard} guestGuard={guestGuard}>
                    <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                      {getLayout(<Component {...pageProps} />)}
                    </AclGuard>
                  </Guard>
                  <ReactHotToast>
                    <Toaster position={settings.toastPosition } toastOptions={{ className: 'react-hot-toast' }} />
                  </ReactHotToast>
                </ThemeComponent>
              )
            }}
          </SettingsConsumer>
          </SettingsProvider>
      </AuthProvider>
      </HistoryBrowsingProvider>
    </CacheProvider>

  )
}

export default App
