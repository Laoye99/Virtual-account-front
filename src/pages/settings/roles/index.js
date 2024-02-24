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
        // subtitle={
        //   <Typography sx={{ color: 'text.secondary' }}>
        //     A role provided access to predefined menus and features so that depending on <br /> assigned role an
        //     administrator can have access to what he need
        //   </Typography>
        // }
      />
      <Grid item xs={12}>
        <RoleCards />
      </Grid>
      {/* <Grid item xs={12}>
        <Table />
      </Grid> */}
    </Grid>
  )
}

RolesComponent.acl = {
  action: 'sla:sla-settings-permissions-group:view',
  subject: 'sla:sla-settings-permissions-group:view'
}

export default RolesComponent
