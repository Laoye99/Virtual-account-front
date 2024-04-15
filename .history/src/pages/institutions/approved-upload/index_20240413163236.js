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


const Dashboard = () => {
  const [data, setData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(true)
  console.log(data)

  const generateViewsContent = (record) => (
    <div>
      <Link href={`/institutions/approved-upload/${record["id"]}`}>
        <button style={{ cursor: "pointer" }}>View details</button>
      </Link>
    </div>
  );

const columns = [
  {
    title: 'institutionname',
    dataIndex: 'institutionname',
    key: 'institutionname',
  },
  {
    title: 'batchnumber',
    dataIndex: 'batchnumber',
    key: 'batchnumber',
  },
  {
    title: 'entrydate',
    dataIndex: 'entrydate',
    key: 'entrydate',
  },
  {
    title: 'transactionlocation',
    dataIndex: 'transactionlocation',
    key: 'transactionlocation',
  },
  {
    title: 'deleted_by',
    dataIndex: 'deleted_by',
    key: 'deleted_by',
  },
  {
    title: 'del_flg',
    dataIndex: 'del_flg',
    key: 'del_flg',
  },
  {
    title: 'institutioncode',
    dataIndex: 'institutioncode',
    key: 'institutioncode',
  },
  {
    title: 'category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'channelcode',
    dataIndex: 'channelcode',
    key: 'channelcode',
  },
  // {
  //   title: 'del_date',
  //   dataIndex: 'del_date',
  //   key: 'del_date',
  // },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => generateViewsContent(record),
  }
]

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=fin_inst&category=approved&fetch-content=true`, {
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
        <div style={{ overflowX: 'auto' }}>
        <Table
              columns={columns}
              dataSource={data}
              bordered
            />
          </div>
   </Grid>
    </ApexChartWrapper>
  )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
