// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Image from 'next/image'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { AuthContext } from 'src/context/AuthContext'

// ** Icon Image
import ablogo from 'src/assets/abn_logo.png'
import ubalogo from 'src/assets/UBA-Logo.svg'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#71ace0'
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  no_: yup.string().required(),
  password: yup.string().min(5).required()
})

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [staffID, setStaffID] = useState('')
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const router = useRouter()
  const { email } = router.query

  // ** Set Authorization Error Set from src/context/AuthContext.js
  const authContext = useContext(AuthContext)
  const { Error2 } = authContext

  // When the component mounts, check local storage for 'staffID'

  const storedStaffID = localStorage.getItem('staffID')

  const toggleRememberMe = () => {
    // Toggle the rememberMe state
    setRememberMe(!rememberMe)
  }

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // const { login, logout } = auth

  // const handleErrCallback = err => {
  //   console.log(err)

  const defaultValues = {
    no_: email ? email : storedStaffID ? storedStaffID : '',
    password: ''
  }

  // ** Vars
  const { skin } = settings

  const {
    control,

    // setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    // Disable the button
    setButtonDisabled(true)
    const { no_, password } = data

    setTimeout(() => {
      // Re-enable the button
      setButtonDisabled(false)
    }, 2000) // Adjust the time (in milliseconds) to your desired delay
    auth.login({ no_, password }, () => {
      setError('no_', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
    if (rememberMe) {
      window.localStorage.setItem('staffID', no_)
    } else {
      window.localStorage.removeItem('staffID')
    }
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  const noValue = rememberMe ? staffID : email ? email : ''

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <LoginIllustration alt='login-illustration' src={`/images/pages/login.png`} />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Image src={ubalogo} alt='logo-ab' width={200} />

            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                {email ? 'Welcome' : 'Welcome to UBA'} {`Interbank Transfer Switching Service 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>

            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Controller
                  name='no_'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='example@ubagroup.com'
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Box>

              {Error2 && <Typography sx={{ color: 'red', fontSize: '14px' }}>{Error2}</Typography>}

              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {/* <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={toggleRememberMe} />}
                /> */}
                {/* <Typography component={LinkStyled} href='/forgot-password'>
                  Forgot Password?
                </Typography> */}
              </Box>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                sx={{
                  backgroundColor: '#f50606',
                  color: 'white',
                  mb: 4,
                  mt: 4,
                  '&:hover': {
                    backgroundColor: '#f50606'
                  }
                }}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? 'Processing...' : 'Login'}
              </Button>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
