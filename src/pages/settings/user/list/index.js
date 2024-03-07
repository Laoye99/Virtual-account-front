// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

import 'react-loading-skeleton/dist/skeleton.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

const columns = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'full_name',
    headerName: 'User',
    renderCell: ({ row }) => {
      const { full_name, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography
              noWrap
              component={Link}
              href={`/settings/user/${row.id}`}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {full_name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 120,
    headerName: 'Staff ID',
    field: 'no_',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.no_}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'job_title',
    minWidth: 170,
    headerName: 'Job Title',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.job_title}
          </Typography>
        </Box>
      )
    }
  },

  {
    flex: 0.15,
    minWidth: 190,
    field: 'department_name',
    headerName: 'Department',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.department_name}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'branch_name',
    headerName: 'Location',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.branch_name}
        </Typography>
      )
    }
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
          <IconButton size='small' component={Link} href={`/settings/user/${row.id}`}>
            <Icon icon='tabler:eye' />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
]

const UserList = ({ apiData }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  useEffect(() => {
console.log("i can get here")
  }, [])

  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontalWithDetails.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant='h5'>MANAGE USERS</Typography>
          </CardContent>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

UserList.acl = {
  action: 'sla:sla-settings-manage-users:view',
  subject: 'sla:sla-settings-manage-users:view'
}

export default UserList
