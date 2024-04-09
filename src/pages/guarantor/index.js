// ** React Imports
import { useState } from 'react'

// ** MUI Import
import Grid from '@mui/material/Grid'

import GuarantorRequestDetails from 'src/pages/guarantor/components/guarantorRequestDetails'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const GuarantorRequestPage = () => {
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
          <GuarantorRequestDetails value2={filterKeyword} handleFilter={handleFilter} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

GuarantorRequestPage.acl = {
  action: 'user',
  subject: 'user'
}

export default GuarantorRequestPage
