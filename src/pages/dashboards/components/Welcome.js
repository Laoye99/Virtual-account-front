// ** MUI Imports
import { useContext } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import { AuthContext } from 'src/context/AuthContext'

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const Welcome = () => {
  const authContext = useContext(AuthContext)
  const { user } = authContext

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          Welcome Back
        </Typography>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {user.fullName} 🎉
        </Typography>
        <Typography sx={{ mb: 2.5, color: 'text.secondary' }}>
          {user.jobTitle}({user.branchName})
        </Typography>
        <Typography variant='h4' sx={{ mb: 1, color: '#22668D' }}>
          {user.username}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Welcome
