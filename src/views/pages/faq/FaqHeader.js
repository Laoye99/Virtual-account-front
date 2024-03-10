// ** MUI Imports
import { useContext } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import { AuthContext } from 'src/context/AuthContext'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Styled Card component
const Card = styled(MuiCard)(() => ({
  border: 0,
  boxShadow: 'none',
  backgroundSize: 'cover',
  backgroundColor: 'transparent',
  backgroundImage: 'url(/images/pages/header-bg.png)'
}))

// Styled CustomTextField component
const CustomTextFieldStyled = styled(CustomTextField)(({ theme }) => ({
  '& .MuiInputBase-root.MuiFilledInput-root': {
    width: '100%',
    backgroundColor: `${theme.palette.background.paper} !important`
  },
  [theme.breakpoints.up('sm')]: {
    width: '55%'
  }
}))

const FaqHeader = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext


  return (
    <Card>
      <CardContent sx={{ pt: 24, textAlign: 'center', pb: theme => `${theme.spacing(24)} !important` }}>
        <Typography sx={{ mb: 4, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
          Hello,  Welcome Back {user.username} 🎉
        </Typography>
        <Box
            sx={{
              mt: 5.5,
              display: 'flex',
              justifyContent: 'center',
              '& img': { maxWidth: '100%', display: { xs: 'none', md: 'block' } }
            }}
          >
            <img src='/images/pages/faq-illustration.png' alt='illustration' width='230' />
          </Box>

        {/* <CustomTextFieldStyled
          size='medium'
          value={searchTerm}
          placeholder='Search a question....'
          onChange={e => handleFaqFilter(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon fontSize='1.25rem' icon='tabler:search' />
              </InputAdornment>
            )
          }}
        /> */}
        <Typography sx={{ mt: 4, color: 'text.secondary' }}>
          choose a category from the Interbank Transfer Switching Service 👋🏻
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FaqHeader
