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
      <Link href={`/institutions/approved-upload/${record['id']}`}>
        <button style={{ cursor: 'pointer' }}>View details</button>
      </Link>
    </div>
  )

  const columns = [
    {
      flex: 0.1,
      field: 'service_provider_id',
      minWidth: 60,
      headerName: 'service_provider_id',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.service_provider_id}</Typography>
    },
    {
      flex: 0.1,
      field: 'its_institution_id',
      minWidth: 120,
      headerName: 'its_institution_id',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.its_institution_id}</Typography>
    },

    {
      flex: 0.1,
      field: 'institution_name',
      minWidth: 120,
      headerName: 'institution_name',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.institution_name}</Typography>
    },
    {
      flex: 0.1,
      field: 'created_by',
      minWidth: 120,
      headerName: 'created by',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['created_by']}</Typography>
    },
    {
      flex: 0.1,
      field: 'creation_date',
      minWidth: 120,
      headerName: 'creation date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.creation_date}</Typography>
    },
    {
      flex: 0.1,
      field: 'institution_id',
      minWidth: 120,
      headerName: 'institution_id',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['institution_id']}</Typography>
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
            <IconButton size='small' component={Link} href={`/institutions/approved-upload/${row.id}`}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=fin_inst&category=approved&fetch-content=true`, {
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
