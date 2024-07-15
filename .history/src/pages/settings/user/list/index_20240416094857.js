// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { BASE_URL } from 'src/configs/constanst'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import { styled } from '@mui/material/styles'

import 'react-loading-skeleton/dist/skeleton.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))


// ** Custom Components Imports
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'


const columns = [
  {
    flex: 0.1,
    minWidth: 60,
    sortable: false,
    field: 'id',
    headerName: 'id',
    renderCell: ({ row }) => <LinkStyled href={`/settings/user/${row.id}`}>{`#${row.id}`}</LinkStyled>
  },
  {
    flex: 0.1,
    minWidth: 120,
    headerName: 'firstname',
    field: 'firstname',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.firstname}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'lastname',
    minWidth: 170,
    headerName: 'lastname',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.lastname}
          </Typography>
        </Box>
      )
    }
  },

  {
    flex: 0.15,
    minWidth: 190,
    field: 'email',
    headerName: 'email',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'role_name',
    headerName: 'Role',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.role_name}
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

const UserList = () => {
  // ** State
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)


  // ** Hooks


  const onSubmit = async (pageNumber) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.get(`${BASE_URL}/switch/getusers?page=${pageNumber}&size=${10}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })

      setData(response.data.data)
      const usersCount = response.data.users_count;
      const size = response.data.size;
      const numberOfPages = Math.ceil(usersCount / size);
      setTotalPage(numberOfPages)
      toast.success(response.data.message)
    } catch (error) {
      // Handle errors
      toast.error('Please try again')
      console.error('Error submitting form', error)
    }
  }

  useEffect(() => {
    onSubmit(1)
  }, [])


  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
      onSubmit(page + 1); // Fetch data for the next page
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      onSubmit(page - 1); // Fetch data for the previous page
    }
  };





  return (
    <Grid container spacing={6.5}>

      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant='h5'>MANAGE USERS</Typography>
          </CardContent>
          <div className="datagridremove">
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10]}
          />
          </div>
                {/* Pagination Buttons */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
  <button
    onClick={handlePrevPage}
    disabled={page === 1}
    style={{
      padding: '8px 12px',
      marginRight: '5px',
      backgroundColor: '#f2f2f2',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: page === 1 ? 'not-allowed' : 'pointer',
      color: page === 1 ? '#999' : '#333'
    }}
  >
    Previous
  </button>
  <span style={{ margin: '0 10px' }}>Page {page} of {totalPage}</span>
  <button
    onClick={handleNextPage}
    disabled={page === totalPage}
    style={{
      padding: '8px 12px',
      marginLeft: '5px',
      backgroundColor: '#f2f2f2',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: page === totalPage ? 'not-allowed' : 'pointer',
      color: page === totalPage ? '#999' : '#333'
    }}
  >
    Next
  </button>
</div>
        </Card>
      </Grid>
    </Grid>
  )
}

UserList.acl = {
  action: 'ADMIN',
  subject: 'ADMIN'
}

export default UserList
