// ** React Imports
import { createContext, useEffect, useState, ReactNode, useContext } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from '/src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { HistoryBrowsingContext } from './HistoryBrowsing'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  const { routes, setRoutes } = useContext(HistoryBrowsingContext);

  // ** Hooks
  const router = useRouter()

  const handleRedirectUserAfterLogin = (role , userId) => {

    let redirectURL = '';

    if(role == 'student'){
      return redirectURL = `/student-profile/${userId}`
    }

    if(role == 'admin'){
      return redirectURL = '/'
    }

    if(role == 'teacher'){
      return redirectURL = '/instructor-students'
    }
  }

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        // setLoading(true)
        await axios
          .get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${authConfig.meEndpoint}`, {
            headers: {
              Authorization: 'Bearer ' + storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setRoutes([]);
            setUser({ ...response.data })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)

            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {

    axios
      .post(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${authConfig.loginEndpoint}`, params)
      .then(async response => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)

        const returnUrl = router.query.returnUrl
        setRoutes([])

        setUser(
          {
            "id": response.data.user.id,
            "role": response.data.user.role,
            "fullName": response.data.user.name,
            "username": response.data.user.surname,
            "email": response.data.user.email
          })

        window.localStorage.setItem('userData',
          JSON.stringify(
            {
              "id": response.data.user.id,
              "role": response.data.user.role,
              "fullName": response.data.user.name,
              "username": response.data.user.surname,
              "email": response.data.user.email
            }))

        router.push(handleRedirectUserAfterLogin(response.data.user.role,response.data.user.id))
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.replace('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
