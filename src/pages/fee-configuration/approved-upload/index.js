import { useState, useEffect } from 'react'

import Link from 'next/link'

// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { Table } from 'antd';

// ** Demo Component Imports
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import axios from 'axios'


// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'



const columns = [
  {
    title: 'feature_id',
    dataIndex: 'feature_id',
    key: 'feature_id',
  },
  {
    title: 'fee_acct_sol',
    dataIndex: 'fee_acct_sol',
    key: 'fee_acct_sol',
  },
  {
    title: 'del_flg',
    dataIndex: 'del_flg',
    key: 'del_flg',
  },
  {
    title: 'owr_feeamt_flg',
    dataIndex: 'owr_feeamt_flg',
    key: 'owr_feeamt_flg',
  },
  {
    title: 'cr_acc_derivatn_flg',
    dataIndex: 'cr_acc_derivatn_flg',
    key: 'cr_acc_derivatn_flg',
  },
  {
    title: 'cr_acc_suffix',
    dataIndex: 'cr_acc_suffix',
    key: 'cr_acc_suffix',
  },
  {
    title: 'add_to_amt',
    dataIndex: 'add_to_amt',
    key: 'add_to_amt',
  },
  {
    title: 'client_id',
    dataIndex: 'client_id',
    key: 'client_id',
  },
  {
    title: 'applcode',
    dataIndex: 'applcode',
    key: 'applcode',
  },
  {
    title: 'service_id',
    dataIndex: 'service_id',
    key: 'service_id',
  },
  {
    title: 'use_dr_acc_flg',
    dataIndex: 'use_dr_acc_flg',
    key: 'use_dr_acc_flg',
  },
  {
    title: 'rsvd_fld_1',
    dataIndex: 'rsvd_fld_1',
    key: 'rsvd_fld_1',
  },

  {
    title: 'del_date',
    dataIndex: 'del_date',
    key: 'del_date',
  },
  {
    title: 'fee_amt',
    dataIndex: 'fee_amt',
    key: 'fee_amt',
  },
  {
    title: 'use_cr_acc_flg',
    dataIndex: 'use_cr_acc_flg',
    key: 'use_cr_acc_flg',
  },
  {
    title: 'dr_acct_num',
    dataIndex: 'dr_acct_num',
    key: 'dr_acct_num',
  },
  {
    title: 'fee_crncy',
    dataIndex: 'fee_crncy',
    key: 'fee_crncy',
  },
  {
    title: 'cr_acc_prefix',
    dataIndex: 'cr_acc_prefix',
    key: 'cr_acc_prefix',
  },
  {
    title: 'auth_date',
    dataIndex: 'auth_date',
    key: 'auth_date',
  },
  {
    title: 'auth_flg',
    dataIndex: 'auth_flg',
    key: 'auth_flg',
  },
  {
    title: 'serial_num',
    dataIndex: 'serial_num',
    key: 'serial_num',
  },
  {
    title: 'dr_acc_prefix',
    dataIndex: 'dr_acc_prefix',
    key: 'dr_acc_prefix',
  },
  {
    title: 'fix_amt',
    dataIndex: 'fix_amt',
    key: 'fix_amt',
  },
  {
    title: 'sol_deriv_flag',
    dataIndex: 'sol_deriv_flag',
    key: 'sol_deriv_flag',
  },
]

const Dashboard = () => {
  const [data, setData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(true)
  console.log(data)



  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=fee_config&category=approved&fetch-content=true`, {
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
