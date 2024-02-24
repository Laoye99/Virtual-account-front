// ** React Imports
import { useState, useEffect, useContext } from 'react'
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

// ** Config
import authConfig from 'src/configs/auth'

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

// const EcommerceOrders = ({ users }) => {
const EcommerceOrders = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const router = useRouter()

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
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    setButtonDisabled(true)
    if (data.password !== data.password_confirmation) {
      toast.error('Password and Confirm Password do not match')
      setButtonDisabled(false)

      return

      // Do not proceed with the submission
    }
    if (data.password == data.current_password) {
      toast.error('New Password and Old Password Cannot be the same')
      setButtonDisabled(false)

      return

      // Do not proceed with the submission
    }
    try {
      const apiUrl = `${BASE_URL}/update-password`

      // Make a POST request to the API endpoint
      const response = await axios.post(
        apiUrl,
        {
          current_password: data.current_password,
          password: data.password,
          password_confirmation: data.password_confirmation
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      // Handle the response from the server
      if (response.status === 200) {
        // Reset email sent successfully
        toast.success('Password reset successful, Re-login to proceed')
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)

        console.log('Password reset successful.', response)
        setTimeout(() => {
          router.push('/login')
          window.location.reload()
        }, 2000)
      } else {
        // Handle any error or validation response from the server
        toast.error('Error trying to reset password')
        console.error('Error trying to reset email:', response.data)
      }
    } catch (error) {
      // Handle any network or unexpected errors
      toast.error(error?.response?.data?.message)
      console.error('An error occurred while processing the request:', error?.response?.data?.message)
    } finally {
      setButtonDisabled(false)

      // setTimeout(() => {
      //   // Re-enable the button

      // }, 2000) // Adjust the time (in milliseconds) to your desired delay
    }
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.paper',
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          [theme.breakpoints.down('md')]: {
            width: '100%'
          }
        }}
      >
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
            <Box sx={{ my: 3 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Update Your Password
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Enter your new password below to reset your account's password.
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(sendResetPassword)}>
              <div style={{ marginBottom: '15px' }}>
                <Controller
                  name='current_password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Old Password'
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
                      label='New Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword1 ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword1(!showPassword1)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword1 ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <Controller
                  name='password_confirmation'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label='Comfirm New Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      {...(errors.password && { helperText: errors.password.message })}
                      type={showPassword2 ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword2(!showPassword2)}
                            >
                              <Icon fontSize='1.25rem' icon={showPassword2 ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </div>
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
      </Box>
    </div>
  )
}

EcommerceOrders.acl = {
  action: 'user',
  subject: 'user'
}

export default EcommerceOrders