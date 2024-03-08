import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import AnalyticsDashboard from 'src/pages/guarantor/index'

// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import UserViewLeft from './view/UserViewLeft'
import UserViewRight from './view/UserViewRight'

const Guarantors = () => {
  const router = useRouter()
  const { users } = router.query
  console.log("router", router)
  console.log("userrrrr", users)



  return (

    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft users={users} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight users={users} />
      </Grid>
    </Grid>

  )
}

Guarantors.acl = {
  action: 'ADMIN',
  subject: 'ADMIN'
}

export default Guarantors
