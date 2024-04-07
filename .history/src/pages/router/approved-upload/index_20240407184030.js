import { useState, useEffect } from 'react'

import Link from 'next/link'

// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

// ** Demo Component Imports
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { Table } from 'antd';


// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'


const columns = [
  {
    title: 'service_provider_id',
    dataIndex: 'service_provider_id',
    key: 'service_provider_id',
  },
  {
    title: 'its_institution_id',
    dataIndex: 'its_institution_id',
    key: 'its_institution_id',
  },
  {
    title: 'creation_date',
    dataIndex: 'creation_date',
    key: 'creation_date',
  },
  {
    title: 'institution_name',
    dataIndex: 'institution_name',
    key: 'institution_name',
  },
  {
    title: 'created_by',
    dataIndex: 'created_by',
    key: 'created_by',
  },
  {
    title: 'institution_id',
    dataIndex: 'institution_id',
    key: 'institution_id',
  }
]

const Dashboard = () => {
  const [data, setData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(true)
  console.log(data)



  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=inst_route&category=approved&fetch-content=true`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      .then(response => {
        console.log(response.data.data)
        setData(response.data.data)
        setSubmitLoading(false)
      })
      .catch(error => {
        // Handle the error here, e.g., show an error message or log the error
        console.error('Error fetching data:', error)
        setSubmitLoading(false)
      })
  }, [])

  return (
    <ApexChartWrapper>
  <Grid container spacing={6}>
  <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
          <Typography variant='h5'>Approved Document</Typography>
        </Grid>
        <Table
              columns={columns}
              dataSource={data}
            />
   </Grid>
    </ApexChartWrapper>
  )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
