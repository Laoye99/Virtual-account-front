// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from './components/page-header'
import RoleCards from './components/RoleCards'

// ** Demo Components Imports

const RolesComponent = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4' sx={{ mb: 6 }}>
            Roles List
          </Typography>
        }

      />
      <Grid item xs={12}>
        <RoleCards />
      </Grid>

    </Grid>
  )
}

RolesComponent.acl = {
  action: 'ADMIN',
  subject: 'ADMIN'
}

export default RolesComponent
