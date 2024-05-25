// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Component Imports
import LoanList from './components/LoanList'
import GuarantorsList from 'src/pages/dashboards/components/GuarantorsList'
import Statistics from 'src/pages/dashboards/components/Statistics'
import Welcome from 'src/pages/dashboards/components/Welcome'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
  <Grid container spacing={6}>
  <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h5'>UNAPPROVED SWITCH PROVIDER</Typography>
        </Grid>
   <Grid item xs={12} lg={12}>
      <LoanList />
    </Grid>
   </Grid>
    </ApexChartWrapper>
  )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
