// ** MUI Import

import React from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Component Imports
import SidebarOldValue from './OldValue'
// ** Custom Component Import
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const Dashboard = () => {
  const router = useRouter()
  const { userID } = router.query
  console.log(router.query)
  return (
    <DatePickerWrapper>
  <Grid container spacing={6}>
  <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h5'>OLD VALUE AUDIT LOG</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
      <SidebarOldValue userID={userID}/>
    </Grid>
   </Grid>
    </DatePickerWrapper>
  )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
