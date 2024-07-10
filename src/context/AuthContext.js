// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Axios
import axios from 'axios'
import toast from 'react-hot-toast'
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
  loading2: false,
  setUser: () => null,
  setError: () => null,
  setLoading: () => Boolean,
  setLoading2: () => Boolean,
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
  const [loading2, setLoading2] = useState(defaultProvider.loading2)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    setLoading(false)

    const initAuth = async () => {

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const usernew = window.localStorage.getItem("userRefresh")
      const userName = window.localStorage.getItem("userName")
      const userdata = window.localStorage.getItem("userData")

      console.log("lllll", userdata)


      // let param = {
      //   "username" : userName,
      //   "token" : usernew,
      // };


    //   if (param.username && param["token"]) {
    //   // Remove unnecessary quotes
    //   param.username = param.username.replace(/\"/g, '');
    //   param["token"] = param["token"].replace(/\"/g, '');
    // } else {
    //   // Handle the case where username or refresh-token is null or undefined
    //   console.error("Username or refresh-token is null or undefined");

    //   return; // Stop further execution
    // }

      // console.log(param)
      if (storedToken) {
        setLoading(true)
        await axios
          .post(authConfig.meEndpoint, {}, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'content-Type': 'application/json',
              "ngrok-skip-browser-warning": "http://localhost:3000/"
            }
          })
          .then(async response => {
            console.log('aaaaaaaaaaaaaaaaa', response)
            setLoading(false)
            setUser({ ...response.data })
            window.localStorage.setItem('userData', JSON.stringify(response.data))
            window.localStorage.setItem('userRefresh', JSON.stringify(response.data['token']))
            window.localStorage.setItem('userName', JSON.stringify(response.data.username))

            if(response?.data?.status?.code == "401"){
              window.localStorage.removeItem('userData')
              window.localStorage.removeItem(authConfig.storageTokenKeyName)
              router.push('/login')
              window.location.reload()
            }

            // setAbl([...response.data.userAbilities])
          })
          .catch(() => {
            router.push('/login')
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            toast.error('Oops! Something went wrong. Please check your connection and login.')

            // window.location.reload()
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

    setLoading2(true)

        axios
          .post(authConfig.loginEndpoint, params, {
            headers: {
              'content-Type': 'application/json',
              "ngrok-skip-browser-warning": "http://localhost:3000/"
            }
          })
          .then(async response => {
            setLoading2(false)
              toast.success('Login Successful')
              console.log(response)
            const encryptedToken = CryptoJS.AES.encrypt(response.data.token, 'your_secret_key').toString()
            window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)
            setNeedToken(response.data.token)
            router.push('/dashboards')
            setUser({ ...response.data })
            window.localStorage.setItem('userData', JSON.stringify(response.data))
            window.localStorage.setItem('userRefresh', JSON.stringify(response.data.details['token']))
            window.localStorage.setItem('userName', JSON.stringify(response.data.username))

          })
          .catch(err => {
            setLoading2(false)
            console.log(err)
              setError('An unexpected error occurred')

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
    loading2,
    setUser,
    newUser,

    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
