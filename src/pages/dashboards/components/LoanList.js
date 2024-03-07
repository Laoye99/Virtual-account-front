// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AvatarGroup from '@mui/material/AvatarGroup'
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports
import axios from 'axios'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))


const userStatusObj = {
  1: 'success',
  0: 'warning',
  2: 'secondary'
}

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 90,
    headerName: 'Loan ID',
    renderCell: ({ row }) => <LinkStyled href={`/loan-request/${row.id}`}>{`#${row.id}`}</LinkStyled>
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status == 0 ? 'In Progress' : row.status == 1 ? 'Approved' : 'Declined'}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },

  {
    flex: 0.1,
    field: 'amount',
    minWidth: 120,
    headerName: 'Amount',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>₦{row.amount || 0}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'created_at',
    headerName: 'Date',
    renderCell: ({ row }) => {
      const originalDate = new Date(row.created_at)
      const formattedDate = originalDate.toLocaleDateString()

      return <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
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
          <IconButton size='small' component={Link} href={`/loan-request/${row.id}`}>
            <Icon icon='tabler:eye' />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
]

const LoanList = () => {
  // ** State
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [searchValue, setSearchValue] = useState('') // Add state for search value

  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/autoloan/loan/allloans?page=1`, {
        params: { q: searchValue }, // Use searchValue for filtering
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setData(response.data.data)
      })
      .catch(error => {
        // Handle the error here, e.g., show an error message or log the error
        console.error('Error fetching data:', error)
      })
  }, [searchValue])

  const handleFilter = val => {
    setSearchValue(val) // Update the search value
  }

  useEffect(() => {
    // Filter the original data based on the searchValue
    const searchString = searchValue.toLowerCase()

    const filtered = data?.filter(row => {
      const statusText = row.status === 0 ? 'in-progress' : row.status === 1 ? 'approved' : 'declined'

      return (
        row.id.toString().toLowerCase().includes(searchString) ||
        statusText.toLowerCase().includes(searchString) ||
        row.amount.toString().includes(searchString) ||
        row.created_at.toLowerCase().includes(searchString)
      )
    })

    setFilteredData(filtered) // Update the filtered data
  }, [searchValue, data])

  return data ? (
    <Card>
      <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Button
          component={Link}
          variant='contained'
          href='/loan-request'
          startIcon={<Icon icon='tabler:plus' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#4f7ea9' // Change the background color on hover
            }
          }}
        >
          New Loan Request
        </Button>
        <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <CustomTextField value={searchValue} placeholder='Search' onChange={e => handleFilter(e.target.value)} />
        </Box>
      </CardContent>

      <DataGrid
        autoHeight
        pagination
        rows={filteredData}
        rowHeight={62}
        columns={columns}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  ) : null
}

export default LoanList
