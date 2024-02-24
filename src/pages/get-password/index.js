// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import axios from 'axios'
import { BASE_URL } from 'src/configs/constanst'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Icon Image
import ablogo from 'src/assets/abn_logo.png'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// Styled Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
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
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: '#71ace0',
  fontSize: theme.typography.body1.fontSize
}))

const schema = yup.object().shape({
  email: yup.string().required()
})

const ForgotPassword = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const sendResetPasswordEmail = async data => {
    setButtonDisabled(true)
    try {
      const apiUrl = `${BASE_URL}/get/password`

      // Make a POST request to the API endpoint
      const response = await axios.post(apiUrl, {
        id: data.email
      })

      // Handle the response from the server
      if (response.status === 200) {
        // Reset email sent successfully
        toast.success('Request successful, check your mailbox to proceed')
        reset()
      } else {
        // Handle any error or validation response from the server
        toast.error('Error sending reset email')
        console.error('Error sending reset email:', response.data)
      }
    } catch (error) {
      // Handle any network or unexpected errors
      toast.error(error.response.data[0])
      console.error('An error occurred while sending the reset email:', error.response.data)
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
          <ForgotPasswordIllustration
            alt='forgot-password-illustration'
            src={`/images/pages/misc-under-maintenance.png`}
          />
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
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                Recieve Default Password on your mail Box 🔒
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Enter your staff ID and Check your email for a temporary password. Login to reset your password
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(sendResetPasswordEmail)}>
              <Controller
                defaultValue=''
                name='email'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label='Email or Staff-ID'
                    placeholder='Enter Email or Staff-ID'
                    sx={{ display: 'flex', mb: 4 }}
                    error={!!errors.email}
                    helperText={errors.email ? 'Email or staff ID is required' : ''}
                    {...field}
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
                  '&:hover': {
                    backgroundColor: '#22668D'
                  }
                }}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? 'Processing...' : 'Submit'}
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <LinkStyled href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </Box>
        </Box>
      </RightWrapper>
      <ToastContainer />
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
