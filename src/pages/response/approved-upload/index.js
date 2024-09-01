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
      <Link href={`/response/approved-upload/${record['id']}`}>
        <button style={{ cursor: 'pointer' }}>View details</button>
      </Link>
    </div>
  )

  const columns = [
    {
      flex: 0.1,
      field: 'resp_code',
      minWidth: 60,
      headerName: 'resp_code',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.resp_code}</Typography>
    },
    {
      flex: 0.1,
      field: 'next_actn',
      minWidth: 120,
      headerName: 'next_actn',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.next_actn}</Typography>
    },

    {
      flex: 0.1,
      field: 'del_flg',
      minWidth: 120,
      headerName: 'del_flg',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.del_flg}</Typography>
    },
    {
      flex: 0.1,
      field: 'del_date',
      minWidth: 120,
      headerName: 'del_date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['del_date']}</Typography>
    },
    {
      flex: 0.1,
      field: 'del_by',
      minWidth: 120,
      headerName: 'del_by',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.entrydate}</Typography>
    },
    {
      flex: 0.1,
      field: 'serviceid',
      minWidth: 120,
      headerName: 'serviceid',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['serviceid']}</Typography>
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
            <IconButton size='small' component={Link} href={`/response/approved-upload/${row.id}`}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  // const columns = [
  //   {
  //     title: 'id',
  //     dataIndex: 'id',
  //     key: 'id',
  //   },
  //   {
  //     title: 'resp_code',
  //     dataIndex: 'resp_code',
  //     key: 'resp_code',
  //   },
  //   {
  //     title: 'next_actn',
  //     dataIndex: 'next_actn',
  //     key: 'next_actn',
  //   },
  //   {
  //     title: 'serviceid',
  //     dataIndex: 'serviceid',
  //     key: 'serviceid',
  //   },

  //   {
  //     title: 'del_flg',
  //     dataIndex: 'del_flg',
  //     key: 'del_flg',
  //   },
  //   {
  //     title: 'del_date',
  //     dataIndex: 'del_date',
  //     key: 'del_date',
  //   },
  //   {
  //     title: 'del_by',
  //     dataIndex: 'del_by',
  //     key: 'del_by',
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",
  //     render: (_, record) => generateViewsContent(record),
  //   }
  // ]

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=rsp_code_next_actn&category=approved&fetch-content=true`, {
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
