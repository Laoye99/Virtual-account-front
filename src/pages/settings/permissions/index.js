// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import authConfig from 'src/configs/auth'
import { DataGrid } from '@mui/x-data-grid'
import { BASE_URL } from 'src/configs/constanst'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import PageHeader from './components/page-header'
import TableHeader from './components/permissions/TableHeader'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Third Party Imports
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

// ** Actions Imports
//import { fetchData } from 'src/store/apps/permissions'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

//const columns = [
const defaultColumns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 30,
    headerName: 'ID',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
  },
  {
    flex: 0.25,
    field: 'name',
    minWidth: 150,
    headerName: 'name',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
  },
  {
    flex: 0.25,
    field: 'display_name',
    minWidth: 200,
    headerName: 'display name',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.display_name}</Typography>
  },
  {
    flex: 0.25,
    field: 'description',
    minWidth: 350,
    headerName: 'description',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.description}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 180,
    field: 'created_at',
    headerName: 'Created Date',
    renderCell: ({ row }) => {
      const originalDate = new Date(row?.created_at)
      const formattedDate = originalDate.toLocaleDateString()

      return <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
    }
  }
]

const PermissionsTable = () => {
  // ** State
  const [data, setData] = useState([])

  //const [value, setValue] = useState('')
  const [editValue, setEditValue] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false) // Initially set to false
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [searchValue, setSearchValue] = useState('') // Add state for search value
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [description, setDescription] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.permissions)

  // Create a function to fetch the data
  const fetchData = useCallback(async () => {
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      const response = await axios.get(`${BASE_URL}/admin/permission?page=1`, {
        params: { q: searchValue },
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      })
      setData(response.data[0]?.data)
    } catch (error) {
      if (error.code == "ERR_NETWORK"){
        window.location.reload()
      }

      console.error('An error occurred:', error.code)
    }
  }, [searchValue])

  useEffect(() => {
    // Fetch data on initial render
    fetchData()
  }, [fetchData])

  const handleEditPermission = ({ id, name, displayname, description }) => {
    setEditValue(id)
    setName(name)
    setDisplayname(displayname)
    setDescription(description)
    setEditDialogOpen(true)

    // Add your logic for handling the edit action here
    // You can use both id and name here
    console.log(`Editing permission - ID: ${id}, Name: ${name}`)
  }

  const handleFilter = val => {
    setSearchValue(val) // Update the search value
  }

  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const onSubmitt = async e => {
    setEditDialogOpen(false)
    setOpen(false)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    // Gather the data to be sent
    const permissionData = {
      name: name, // Replace with the actual data from your form
      display_name: displayname,
      description: description
    }

    // console.log(permissionData)
    // console.log(editValue)

    // Make a POST request to your API endpoint
    try {
      // Make an HTTP PUT request to your endpoint
      const response = await axios.post(`${BASE_URL}/admin/permission/update/${editValue}`, permissionData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        toast.success(response.data.message)

        fetchData()
      } else {
        console.error('Permission Update failed with status:', response.status)
      }

      console.log('Permission Updated successfully', response.data)
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Error Updating Permission', error)
    }
  }

  const handleDeletePermission = async ({ id }) => {
    alert(id)
  }

  useEffect(() => {
    // Filter the original data based on the searchValue
    const searchString = searchValue.toLowerCase()

    if (data) {
      const filtered = data.filter(row => {
        return (
          (row.id?.toString() || '').toLowerCase().includes(searchString) ||
          (row.name || '').toLowerCase().includes(searchString) ||
          (row.display_name || '').toLowerCase().includes(searchString) ||
          (row.description || '').toLowerCase().includes(searchString) ||
          (row.created_at || '').toLowerCase().includes(searchString)
        )
      })

      setFilteredData(filtered) // Update the filtered data
    }
  }, [searchValue, data])

  const columns = [
    ...defaultColumns,

    {
      flex: 0.25,
      minWidth: 200,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() =>
              handleEditPermission({
                id: row?.id,
                name: row?.name,
                displayname: row?.display_name,
                description: row?.description
              })
            }
          >
            <Icon icon='tabler:edit' />
          </IconButton>
          {/* <IconButton onClick={() => handleDeletePermission({ id: row?.id})}>
            <Icon icon='tabler:trash' />
          </IconButton> */}
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={
              <Typography variant='h4' sx={{ mb: 6 }}>
                Permissions List
              </Typography>
            }
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Kindly Use this manage to manage your permissions.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={searchValue} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              pagination
              rows={filteredData}
              getRowId={row => `${row?.id}-${row?.name}`}
              rowHeight={62}
              columns={columns}
              checkboxSelection
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
            {/* Move the IconButton with handleEditPermission here */}
            {/* <IconButton onClick={() => handleEditPermission(editValue)}>
              <Icon icon='tabler:edit' />
            </IconButton> */}
          </Card>
        </Grid>
      </Grid>

      <Dialog maxWidth='sm' fullWidth onClose={() => {}} open={editDialogOpen}>
        <DialogTitle
          sx={{
            backgroundColor: '', // Background color
            color: '#fff', // Text color
            textAlign: 'center',
            padding: '16px', // Adjust the padding as needed
            display: 'flex', // Display as a flex container
            alignItems: 'center' // Vertically align items
          }}
        >
          <CustomAvatar skin='light' sx={{ width: 22, height: 22, color: '' }}>
            <Icon icon='tabler:edit' fontSize='1.2rem' />
          </CustomAvatar>

          <Typography variant='h5' component='span' sx={{ mb: 2, color: 'gray', ml: 4, mt: 2, fontSize: '16px' }}>
            Edit Permission
          </Typography>

          {/* <Typography variant="body2" sx={{ color: 'gray', mt: 10, ml: 1 , alignItems: 'left'}}>
        <b>
          <em>Edit permission as per your requirements.</em>
        </b>
      </Typography> */}
        </DialogTitle>
        <Divider sx={{ m: '0 !important' }} />
        <DialogContent
          sx={{
            padding: '16px' // Adjust the padding as needed
          }}
        >
          <Box component='form' sx={{ mt: 3 }} onSubmit={onSubmitt}>
            <CustomTextField
              fullWidth
              sx={{ display: 'none' }}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
            />

            <CustomTextField
              fullWidth
              sx={{
                marginBottom: '1rem'
              }}
              label='Permission Name'
              placeholder='Enter Permission Name'
              value={name}
              onChange={e => setName(e.target.value)}
              InputProps={{
                readOnly: true
              }}
              InputLabelProps={{
                sx: {
                  fontWeight: 'bold' // Add this to make the label bold
                }
              }}
            />

            <CustomTextField
              fullWidth
              sx={{
                marginBottom: '1rem'
              }}
              label='Display Name'
              placeholder='Enter Display Name'
              value={displayname}
              onChange={e => setDisplayname(e.target.value)}
              InputLabelProps={{
                sx: {
                  fontWeight: 'bold' // Add this to make the label bold
                }
              }}
            />

            <CustomTextField
              fullWidth
              sx={{
                marginBottom: '1rem'
              }}
              label='Description'
              placeholder='Enter Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              InputLabelProps={{
                sx: {
                  fontWeight: 'bold' // Add this to make the label bold
                }
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  backgroundColor: '#f50606', // Background color
                  color: '#fff', // Text color
                  marginRight: '10px', // Right margin
                  padding: '10px 20px' // Padding
                }}
              >
                Update Permission
              </Button>

              <Button
                type='reset'
                variant='tonal'
                color='secondary'
                onClick={handleDialogToggle}
                sx={{
                  backgroundColor: '#e24040', // Background color
                  color: '#fff', // Text color
                  '&:hover': {
                    backgroundColor: '#c43131' // Hover background color
                  }
                }}

                // sx={{
                //   padding: '10px 20px', // Padding
                //   border: '1px solid #ff0000', // Border style
                // }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

PermissionsTable.acl = {
  action: 'sla:sla-settings-permissions:view',
  subject: 'sla:sla-settings-permissions:view'
}

export default PermissionsTable
