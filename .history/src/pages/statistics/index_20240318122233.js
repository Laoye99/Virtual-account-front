// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import LoanList from './unapproved-statistics/components/LoanList'
import FormLayoutLoanCalculator from 'src/pages/statistics/components/formLayoutLoanCalculator'

const LoanCalculator = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h6'>NIP and UPSL Statistics</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
        <LoanList />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

LoanCalculator.acl = {
  action: 'user',
  subject: 'user'
}

export default LoanCalculator;
