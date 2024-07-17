// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Component Imports
import SidebarValue from './OldValue'
// ** Custom Component Import
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const Dashboard = () => {
  return (
    <DatePickerWrapper>
  <Grid container spacing={6}>
  <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h5'>NEW VALUE AUDIT LOG</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
      <SidebarNewValue/>
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
