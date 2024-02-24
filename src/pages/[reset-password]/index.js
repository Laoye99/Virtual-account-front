// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Next Import
import Image from 'next/image'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import { BASE_URL } from 'src/configs/constanst'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

// ** Icon Image
import ablogo from 'src/assets/abn_logo.png'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
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

const schema = yup.object().shape({
  password: yup.string().min(5).required(),
  password_confirmation: yup.string().min(5).required()
})

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const router = useRouter()
  const data = router.query.token

  useEffect(() => {
    if (data) {
      function splitTokenAndEmailFromRouterQuery(routerQuery) {
        const [token, email] = routerQuery.split('?userid=')

        return { token, email }
      }

      const { token, email } = splitTokenAndEmailFromRouterQuery(data)
      console.log(email)
      setToken(token)
      setEmail(email)
    }
  }, [data])

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const sendResetPassword = async data => {
    setButtonDisabled(true)
    if (data.password !== data.password_confirmation) {
      toast.error('Password and Confirm Password do not match')
      setButtonDisabled(false)

      return

      // Do not proceed with the submission
    }
    try {
      const apiUrl = `${BASE_URL}/reset-password`

      // Make a POST request to the API endpoint
      const response = await axios.post(apiUrl, {
        no_: email,
        token: token,
        password: data.password,
        password_confirmation: data.password_confirmation
      })

      // Handle the response from the server
      if (response.status === 200) {
        // Reset email sent successfully
        toast.success('Password reset successful, Login to proceed')

        console.log('Password reset successful.', response)
        router.push(`/login?email=${email}`)
      } else {
        // Handle any error or validation response from the server
        toast.error('Error trying to reset password')
        console.error('Error trying to reset email:', response.data)
      }
    } catch (error) {
      // Handle any network or unexpected errors
      toast.error(error.response.data.message)
      console.error('An error occurred while processing the request:', error.response.data.message)
    } finally {
      setTimeout(() => {
        // Re-enable the button
        setButtonDisabled(false)
      }, 2000) // Adjust the time (in milliseconds) to your desired delay
    }
  }

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
          <RegisterIllustration alt='register-illustration' src={`/images/pages/create-account-light.png`} />
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
            <Image src={ablogo} alt='logo-ab' width={200} />
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Reset Your Password
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Enter your new password below to reset your account's password.
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(sendResetPassword)}>
              <div style={{ marginBottom: '15px' }}>
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
              </div>
              <Controller
                name='password_confirmation'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    label='Comfirm Password'
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

              <Button
                fullWidth
                type='submit'
                variant='contained'
                sx={{
                  backgroundColor: '#71ace0',
                  color: 'white',
                  mb: 4,
                  mt: 5,
                  '&:hover': {
                    backgroundColor: '#22668D'
                  }
                }}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? 'Processing...' : 'Reset Password'}
              </Button>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
