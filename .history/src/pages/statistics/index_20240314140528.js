// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
// import LoanList from './components/LoanList'
import GuarantorsList from 'src/pages/dashboards/components/GuarantorsList'
import Statistics from 'src/pages/dashboards/components/Statistics'
import Welcome from 'src/pages/dashboards/components/Welcome'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
  <Grid container spacing={6}>
   THIS IS S
   </Grid>
    </ApexChartWrapper>
  )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
