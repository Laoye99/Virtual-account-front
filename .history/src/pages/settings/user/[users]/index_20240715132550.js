import React from 'react'
import Link from 'next/link';

// import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'

// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Components Imports

import FormLayoutsGuarantor from './view/formLoanDetails';

const Guarantors = () => {
  const router = useRouter()
  const { users } = router.query
  console.log("router", router)
  console.log("userrrrr", users)

  return (

    <Grid container spacing={6}>
       <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
       <Button
          component={Link}
          variant='contained'
          href='/settings/user/list'
          startIcon={<Icon icon='tabler:arrow-left' />}
          sx={{
            backgroundColor: '#71ace0',
            '&:hover': {
              backgroundColor: '#71ace0' // Change the background color on hover
            }
          }}
        >
          Back
        </Button>
          <Typography variant='h5'>USER DETAILS</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
          <FormLayoutsGuarantor switchID={users} />
        </Grid>
    </Grid>

  )
}

Guarantors.acl = {
  action: 'user',
  subject: 'user'
}

export default Guarantors
