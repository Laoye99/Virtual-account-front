// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Import
import Grid from '@mui/material/Grid'

import ApprovalRequest from 'src/pages/approval-request/components/ApprovalRequest'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'

const ApprovalRequestPage = () => {
  // Define the filter keyword in the state
  const [filterKeyword, setFilterKeyword] = useState('')

  // Define the handleFilter function to update the filter keyword
  const handleFilter = keyword => {
    setFilterKeyword(keyword)
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12}>
          <ApprovalRequest value2={filterKeyword} handleFilter={handleFilter} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

ApprovalRequestPage.acl = {
  action: 'user',
  subject: 'user'
}

export default ApprovalRequestPage
