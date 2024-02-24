// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Axios
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Config
import authConfig from 'src/configs/auth'

// ** cryptojs
import CryptoJS from 'crypto-js'

// ** Defaults
const defaultProvider = {
  abl: null,
  user: null,
  new: null,
  loading: true,
  setUser: () => null,
  setError: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [abl, setAbl] = useState(defaultProvider.abl)
  const [user, setUser] = useState(defaultProvider.user)
  const [newUser, setNewUser] = useState(defaultProvider.new)
  const [Error2, setError] = useState('')
  const [needToken, setNeedToken] = useState('')

  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    setLoading(false)

    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'content-Type': 'application/json'
            }
          })
          .then(async response => {
            console.log('aaaaaaaaaaaaaaaaa')
            setLoading(false)
            setUser({ ...response.data.userData })
            setAbl([...response.data.userAbilities])
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            toast.error('Oops! Something went wrong. Please check your connection and login.')
            router.push('/login')
            window.location.reload()
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

  const handleLogin = (params, errorCallback) => {
    console.log(params)

    // // First, request the CSRF cookie
    axios
      .get(authConfig.csrfEndpoint)
      .then(async res => {
        console.log(res)

        // Once the CSRF cookie is set, proceed with the login request
        axios
          .post(authConfig.loginEndpoint, params, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
          .then(async response => {
            if (response.data.password_request == 1) {
              toast.success('Login Successful, please update your password for security purposes.')
            } else {
              toast.success('Login Successful')
            }

            const encryptedToken = CryptoJS.AES.encrypt(response.data.accessToken, 'your_secret_key').toString()
            window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
            setNeedToken(response.data.accessToken)
            const returnUrl = router.query.returnUrl
            setUser({ ...response.data.userData })
            setAbl([...response.data.userAbilities])
            setNewUser(response.data.password_request)
            window.localStorage.setItem('ablData', JSON.stringify(response.data.userAbilities))
            window.localStorage.setItem('userData', JSON.stringify(response.data.userData))
            const redirectURL = returnUrl && returnUrl !== '/dashboards' ? returnUrl : '/dashboards'
            if (response.data.password_request == 1) {
              router.push('/update-password')
            } else router.push('/dashboards')
          })
          .catch(err => {
            console.log(err)

            // Handle login errors
            if (err.response && err.response.status === 400) {
              setError('Invalid Staff id and password combination')
            } else {
              // An unexpected error occurred
              setError('An unexpected error occurred')
            }
          })
      })
      .catch(error => {
        // Handle errors in requesting the CSRF cookie
        console.error('Error requesting CSRF cookie', error)
      })
  }

  const handleLogout = async () => {
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      // Make a POST request to the logout endpoint
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // Remove user data
      setUser(null)
      window.localStorage.removeItem('ablData')
      window.localStorage.removeItem('userData')
      window.localStorage.removeItem('staffID')
      window.localStorage.removeItem(authConfig.storageTokenKeyName)

      // Redirect the user to the login page
      toast.success(response.data.message)
      router.push('/login')
    } catch (error) {
      // Handle errors
      console.error('Error logging out', error)
      router.push('/login')
    }
  }

  const values = {
    Error2,
    user,
    abl,
    needToken,
    loading,
    setUser,
    newUser,

    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
