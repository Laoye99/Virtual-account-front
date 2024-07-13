import React from 'react'
import { useRouter } from 'next/router'
import AnalyticsDashboard from 'src/pages/guarantor/index'

// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import FormLayoutsGuarantor from './components/formLoanDetails'

const Guarantors = () => {
  const router = useRouter()
  const { addressID } = router.query


  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h5'>THIRD PARTY ADDRESS DETAILS</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
          <FormLayoutsGuarantor addressID={addressID} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

Guarantors.acl = {
  action: 'user',
  subject: 'user'
}

export default Guarantors
