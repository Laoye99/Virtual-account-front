import { useState, useEffect } from 'react'

import Link from 'next/link'

// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

// ** Demo Component Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { Table } from 'antd'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(true)
  console.log(data)

  const generateViewsContent = record => (
    <div>
      <Link href={`/fee-configuration/approved-upload/${record['id']}`}>
        <button style={{ cursor: 'pointer' }}>View details</button>
      </Link>
    </div>
  )

  const columns = [
    {
      flex: 0.1,
      field: 'fee_acct_sol',
      minWidth: 60,
      headerName: 'fee_acct_sol',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.fee_acct_sol}</Typography>
    },
    {
      flex: 0.1,
      field: 'applcode',
      minWidth: 120,
      headerName: 'applcode',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.applcode}</Typography>
    },

    {
      flex: 0.1,
      field: 'rsvd_fld_1',
      minWidth: 120,
      headerName: 'rsvd_fld_1',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.rsvd_fld_1}</Typography>
    },
    {
      flex: 0.1,
      field: 'fee_amt',
      minWidth: 120,
      headerName: 'fee_amt',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['fee_amt']}</Typography>
    },
    {
      flex: 0.1,
      field: 'dr_acct_num',
      minWidth: 120,
      headerName: 'entrydate',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.entrydate}</Typography>
    },
    {
      flex: 0.1,
      field: 'fee_crncy',
      minWidth: 120,
      headerName: 'fee_crncy',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['del_date']}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} href={`/fee-configuration/approved-upload/${row.id}`}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  // const columns = [

  //   {
  //     title: 'fee_acct_sol',
  //     dataIndex: 'fee_acct_sol',
  //     key: 'fee_acct_sol',
  //   },

  //   {
  //     title: 'applcode',
  //     dataIndex: 'applcode',
  //     key: 'applcode',
  //   },
  //   {
  //     title: 'service_id',
  //     dataIndex: 'service_id',
  //     key: 'service_id',
  //   },

  //   {
  //     title: 'rsvd_fld_1',
  //     dataIndex: 'rsvd_fld_1',
  //     key: 'rsvd_fld_1',
  //   },

  //   {
  //     title: 'fee_amt',
  //     dataIndex: 'fee_amt',
  //     key: 'fee_amt',
  //   },

  //   {
  //     title: 'dr_acct_num',
  //     dataIndex: 'dr_acct_num',
  //     key: 'dr_acct_num',
  //   },
  //   {
  //     title: 'fee_crncy',
  //     dataIndex: 'fee_crncy',
  //     key: 'fee_crncy',
  //   },
  //   {
  //     title: 'cr_acc_prefix',
  //     dataIndex: 'cr_acc_prefix',
  //     key: 'cr_acc_prefix',
  //   },
  //   {
  //     title: 'auth_date',
  //     dataIndex: 'auth_date',
  //     key: 'auth_date',
  //   },

  //   {
  //     title: 'serial_num',
  //     dataIndex: 'serial_num',
  //     key: 'serial_num',
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",
  //     render: (_, record) => generateViewsContent(record),
  //   }

  //   // {
  //   //   title: 'dr_acc_prefix',
  //   //   dataIndex: 'dr_acc_prefix',
  //   //   key: 'dr_acc_prefix',
  //   // },
  //   // {
  //   //   title: 'fix_amt',
  //   //   dataIndex: 'fix_amt',
  //   //   key: 'fix_amt',
  //   // },

  //   // {
  //   //   title: 'sol_deriv_flag',
  //   //   dataIndex: 'sol_deriv_flag',
  //   //   key: 'sol_deriv_flag',
  //   // },
  // ]

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=fee_config&category=approved&fetch-content=true`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'http://localhost:3000/'
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
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important`, mb: '2rem' }}>
          <Typography variant='h5'>Approved Document</Typography>
        </Grid>
        <DataGrid
          autoHeight
          pagination
          rows={data}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
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
