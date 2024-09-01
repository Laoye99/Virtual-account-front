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
      <Link href={`/information/approved-upload/${record['id']}`}>
        <button style={{ cursor: 'pointer' }}>View details</button>
      </Link>
    </div>
  )

  const columns = [
    {
      flex: 0.1,
      field: 'applcode',
      minWidth: 60,
      headerName: 'applcode',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.applcode}</Typography>
    },
    {
      flex: 0.1,
      field: 'country_code',
      minWidth: 120,
      headerName: 'country code',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.country_code}</Typography>
    },

    {
      flex: 0.1,
      field: 'cr_acc_derivatn_flg',
      minWidth: 120,
      headerName: 'cr_acc_derivatn_flg',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.cr_acc_derivatn_flg}</Typography>
    },
    {
      flex: 0.1,
      field: 'cr_acc_prefix',
      minWidth: 120,
      headerName: 'cr_acc_prefix',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['cr_acc_prefix']}</Typography>
    },
    {
      flex: 0.1,
      field: 'cr_acc_suffix',
      minWidth: 120,
      headerName: 'cr_acc_suffix',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.cr_acc_suffix}</Typography>
    },
    {
      flex: 0.1,
      field: 'cr_acct_num',
      minWidth: 120,
      headerName: 'cr_acct_num',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['cr_acct_num']}</Typography>
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
            <IconButton size='small' component={Link} href={`/information/approved-upload/${row.id}`}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  // const columns = [
  //   {
  //     title: 'applcode',
  //     dataIndex: 'applcode',
  //     key: 'applcode'
  //   },
  //   {
  //     title: 'auth_by',
  //     dataIndex: 'auth_by',
  //     key: 'auth_by'
  //   },
  //   {
  //     title: 'auth_date',
  //     dataIndex: 'auth_date',
  //     key: 'auth_date'
  //   },
  //   {
  //     title: 'auth_flg',
  //     dataIndex: 'auth_flg',
  //     key: 'auth_flg'
  //   },
  //   {
  //     title: 'country_code',
  //     dataIndex: 'country_code',
  //     key: 'country_code'
  //   },
  //   {
  //     title: 'cr_acc_derivatn_flg',
  //     dataIndex: 'cr_acc_derivatn_flg',
  //     key: 'cr_acc_derivatn_flg'
  //   },
  //   {
  //     title: 'cr_acc_prefix',
  //     dataIndex: 'cr_acc_prefix',
  //     key: 'cr_acc_prefix'
  //   },
  //   {
  //     title: 'cr_acc_suffix',
  //     dataIndex: 'cr_acc_suffix',
  //     key: 'cr_acc_suffix'
  //   },
  //   {
  //     title: 'cr_acct_num',
  //     dataIndex: 'cr_acct_num',
  //     key: 'cr_acct_num'
  //   },

  //   {
  //     title: 'Action',
  //     dataIndex: 'action',
  //     key: 'action',
  //     render: (_, record) => generateViewsContent(record)
  //   }
  // ]

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=contra_account&category=approved&fetch-content=true`, {
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
        <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
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
