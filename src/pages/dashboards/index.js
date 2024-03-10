import { Fragment, useEffect, useState } from 'react'

// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports


// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import FAQS from 'src/views/pages/faq/Faqs'
import FaqHeader from 'src/views/pages/faq/FaqHeader'
import FaqFooter from 'src/views/pages/faq/FaqFooter'


const Dashboard = () => {


  return (

    // <ApexChartWrapper>
    //   <Grid container spacing={6}>
    //     <Grid item xs={12} md={4}>
    //       <Welcome />
    //     </Grid>
    //     {/* <Grid item xs={12} md={8}>
    //       <Statistics />
    //     </Grid> */}
    //     {/* <Grid item xs={12} lg={6}>
    //       <GuarantorsList />
    //     </Grid> */}
    //     {/* <Grid item xs={12} lg={6}>
    //       <LoanList />
    //     </Grid> */}
    //   </Grid>
    // </ApexChartWrapper>
    <Fragment>
    <FaqHeader/>
    {/* {data !== null ? <FAQS data={data} activeTab={activeTab} handleChange={handleChange} /> : renderNoResult} */}
    <FaqFooter />
  </Fragment>
  )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
