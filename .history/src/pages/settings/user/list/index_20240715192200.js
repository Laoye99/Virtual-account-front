// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { format } from 'date-fns';


import 'react-loading-skeleton/dist/skeleton.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))



const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 150,
    headerName: 'USER ID',
    renderCell: ({ row }) =>  <LinkStyled href={`/settings/user/${row[""]}`}>{`#${row.id}`}</LinkStyled>
  },

  {
    flex: 0.1,
    minWidth: 120,
    headerName: 'Name',
    field: 'usernamessss',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.username}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    field: 'role',
    minWidth: 90,
    headerName: 'Email',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role}
          </Typography>
        </Box>
      )
    }
  },

  // {
  //   flex: 0.15,
  //   minWidth: 190,
  //   field: 'created_at',
  //   headerName: 'Created at',
  //   renderCell: ({ row }) => {
  //     const date = new Date(row.created_at);
  //     const formattedDate = format(date, 'PPpp');

  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         {formattedDate}
  //       </Typography>
  //     );
  //   }
  // },

  // {
  //   flex: 0.15,
  //   minWidth: 110,
  //   field: 'updated_at',
  //   headerName: 'Updated at',
  //   renderCell: ({ row }) => {
  //     const date = new Date(row.updated_at);
  //     const formattedDate = format(date, 'PPpp');

  //     return (
  //       <Typography noWrap sx={{ color: 'text.secondary' }}>
  //         {formattedDate}
  //       </Typography>
  //     )
  //   }
  // },
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

  console.log('yyyyyyyyyyyyyyyyyyyyyyy', store.data)


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
            getRowId={(row) => row['id']}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

UserList.acl = {
    action: 'user',
    subject: 'user'
  }

// UserList.acl = {
//   action: 'sla:sla-settings-manage-users:view',
//   subject: 'sla:sla-settings-manage-users:view'
// }

export default UserList
