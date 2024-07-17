// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Component Imports
import SidebarNewValue from './NewValue'
// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
  <Grid container spacing={6}>
  <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h5'>AUDIT LOG</Typography>
        </Grid>
   <Grid item xs={12} lg={12}>
      <SidebarNewValue/>
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
