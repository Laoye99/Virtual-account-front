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
import CustomChip from 'src/@core/components/mui/chip'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

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
    field: 'loan_id',
    minWidth: 90,
    headerName: 'Loan ID',
    renderCell: ({ row }) => <LinkStyled href={`/guarantor/${row.id}`}>{`#${row?.loan_id}`}</LinkStyled>
  },
  {
    flex: 0.3,
    minWidth: 90,
    field: 'full_name',
    headerName: 'Loan Requestor',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.loan?.loan_owner?.full_name}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 105,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status == 0 ? 'Action Pending' : row.status == 1 ? 'Approved' : 'Declined'}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'created_at',
    headerName: 'Date',
    renderCell: ({ row }) => {
      const originalDate = new Date(row.created_at)
      const formattedDate = originalDate.toLocaleDateString()

      return <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
    }
  },
  {
    flex: 0.05,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='View'>
          <IconButton size='small' component={Link} href={`/guarantor/${row.id}`}>
            <Icon icon='tabler:eye' />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
]



const GuarantorsList = () => {
  // ** State
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/autoloan/loan/guarantor?page=1`, {
        params: { q: searchValue },
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setData(response.data.data)
      })
      .catch(error => {

        console.error('Error fetching data:', error)
      })
  }, [searchValue])

  const handleFilter = val => {
    setSearchValue(val)
  }

  useEffect(() => {

    const searchString = searchValue.toLowerCase()

    const filtered = data.filter(row => {
      const statusText = row.status === 0 ? 'in-progress' : row.status === 1 ? 'approved' : 'declined'

      return (
        row.loan_id.toString().toLowerCase().includes(searchString) ||
        statusText.toLowerCase().includes(searchString) ||
        row.created_at.toLowerCase().includes(searchString)
      )
    })

    setFilteredData(filtered) // Update the filtered data
  }, [searchValue, data])

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  return data ? (
    <Card>
       <TabContext value={value}>

     <TabList
  variant='scrollable'
  scrollButtons={false}
  onChange={handleTabsChange}
  sx={{
    gap: 4,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: theme => `1px solid ${theme.palette.divider}`,
    '& .MuiTab-root': { py: 5.5 }
  }}
>
  <Tab     sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }} value='personal-info' label={<span style={{ color: '' }}>Guarantor Requests</span>} />
  <Box sx={{ mt: 6, mb: 6, display: 'flex', alignItems: 'center', marginLeft: '70px' }}>
    <CustomTextField value={searchValue} placeholder='Search' onChange={e => handleFilter(e.target.value)} />
  </Box>
</TabList>

      <DataGrid
        autoHeight
        pagination
        rows={filteredData}
        rowHeight={70}
        columns={columns}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      </TabContext>
    </Card>
  ) : null
}

export default GuarantorsList
