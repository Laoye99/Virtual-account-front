// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// Styled Box component
const StyledBox1 = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '5px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover
}))

// Styled Box component
const StyledBox2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: '5px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover
}))

const FaqFooter = () => {
  return (
    <Box sx={{ mt: 13, textAlign: 'center' }}>
      <CustomChip rounded size='small' skin='light' color='primary' label='Documentation' />
      <Typography variant='h4' sx={{ my: 2 }}>
      Want to get documentation?
      </Typography>
      <Typography sx={{ mb: 6, color: 'text.secondary' }}>
        You can find the comprehensive documentation through the link below.
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <StyledBox1>
            <CustomAvatar skin='light' variant='rounded' sx={{ mb: 2.5, height: 38, width: 38 }}>
              <Icon fontSize='1.75rem' icon='mdi:file-document' />
            </CustomAvatar>
            <Typography
            component={Link}
  href="https://docs.google.com/document/d/10HftPb0Audl7oqvLbPBGem28vaA4hyNJWXzo4jKzMQo/edit?usp=sharing" // Replace this with the URL of your external document
  target="_blank"
  rel="noopener noreferrer"
  variant='h4'
  sx={{ mb: 2.5, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
>
 Click here
</Typography>
          </StyledBox1>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FaqFooter
