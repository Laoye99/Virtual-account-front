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
    field: 'audit_id',
    minWidth: 150,
    headerName: 'ID',
    renderCell: ({ row }) => (
      <LinkStyled href={`/audit/${row["audit_id"]}`}>
        {`${row["audit_id"]}`}
      </LinkStyled>
    )
  },
  {
    flex: 0.1,
    field: 'table_name',
    minWidth: 150,
    headerName: 'TABLE-NAME',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["table_name"] === || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'operation',
    minWidth: 120,
    headerName: 'OPERATION',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["operation"] || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'operated_by',
    minWidth: 120,
    headerName: 'OPERATED BY',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["operated_by"] || 0}</Typography>
  }
]

const LoanList = () => {
  // ** State
  const [data, setData] = useState([])
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/auditLog/get_all`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        // Handle the error here, e.g., show an error message or log the error
        console.error('Error fetching data:', error)
      })
  }, [])

  // const handleFilter = val => {
  //   setSearchValue(val) // Update the search value
  // }

  // useEffect(() => {
  //   // Filter the original data based on the searchValue
  //   const searchString = searchValue.toLowerCase()

  //   const filtered = data?.filter(row => {
  //     const statusText = row.status === 0 ? 'in-progress' : row.status === 1 ? 'approved' : 'declined'

  //     return (
  //       row.id.toString().toLowerCase().includes(searchString) ||
  //       statusText.toLowerCase().includes(searchString) ||
  //       row.amount.toString().includes(searchString) ||
  //       row.created_at.toLowerCase().includes(searchString)
  //     )
  //   })

  //   setFilteredData(filtered) // Update the filtered data
  // }, [searchValue, data])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return data ? (
    <Card>
      <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* <TableHeader toggle={toggleAddUserDrawer} /> */}

        {/* <Button
    onClick={toggleAddUserDrawer} variant='contained'
    startIcon={<Icon icon='tabler:plus' />}
    sx={{
      backgroundColor: '#f50606',
      '&:hover': {
        backgroundColor: '#f50606'
      }
    }}
  >
   New API Configuration

  </Button>

        <Button
          component={Link}
          variant='contained'
          href='/api-reg/all-unapproved'
          startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          View Unapproved Configurations
        </Button>
        */}
      </CardContent>

      <DataGrid
        autoHeight
        pagination
        rows={data}
        rowHeight={62}
        columns={columns}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row['audit_id']}
      />

 {/* <SidebarAddUser open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Card>
  ) : null
}

export default LoanList
