// ** React Imports
import { useEffect, useState, useContext } from 'react'
import { BASE_URL } from 'src/configs/constanst'

// ** Next Import
import Link from 'next/link'

// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports

import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// ** Icon Imports

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const cardData = [
  { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { totalUsers: 7, title: 'Manager', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { totalUsers: 3, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
  { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
]

const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [apiData, setApiData] = useState([])
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([])
  const [apiData2, setApiData2] = useState([])
  const [roleName, setRoleName] = useState('')
  const [roleDescription, setRoleDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [deleteRole, setDeleteRole] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [apiData3, setApiData3] = useState([])
  const ability = useContext(AbilityContext)

  const initialSelectedPermissions = apiData2.filter(i => i.assigned).map(i => `${i.id}-read`)

  const handleRoleNameChange = event => {
    setRoleName(event.target.value)
  }

  const handleRoleDescriptionChange = event => {
    setRoleDescription(event.target.value)
  }

  const handleSetDeleteID = itemId => {
    setDeleteRole(itemId)
  }

  const handleClickOpen = itemId => {
    setEditingRole(itemId) // Set the editing role to the itemId
    // Rest of your function remains the same
    if (itemId) {
      // Fetch data based on the itemId if needed
      setDialogTitle('Edit')

      // ... rest of your code
    } else {
      setDialogTitle('Add')
    }
    setOpen(true)
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(storedToken)

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/roles`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'content-Type': 'application/json'
          }
        })

        console.log(response)
      } catch (error) {
        if (error.code == 'ERR_NETWORK') {
          window.location.reload()
        }

        console.error('An error occurred:', error.code)
      }
    }

    fetchData() // Invoke the function to fetch data
  }, [])

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id)
, 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)

      setSelectedCheckbox([...arr])
    }
  }

  useEffect(() => {
    // Create an array of selected permission IDs as numbers
    const newSelectedPermissionIds = selectedCheckbox.map(id => {
      // Transform the ID to remove '-read' suffix and parse it as a number
      return parseInt(id.replace('-read', ''), 10)
    })
    setSelectedPermissionIds(newSelectedPermissionIds)
  }, [selectedCheckbox])

  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  console.log(storedToken)

  const fetchData = async () => {
    setIsLoading(true)
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/admin/roles`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      setApiData(response.data.data) // Update the state with the fetched data
      setIsLoading(false)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)

      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Invoke the function to fetch data
  }, [])

  const addRole = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const data = {
      name: roleName,
      description: roleDescription,
      permissions: selectedPermissionIds,
      display_name: roleName
    }

    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/admin/roles/add`, data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      handleClose()
      toast.success(response.data.message)
      fetchData()
      setRoleName('')
      setRoleDescription('')
    } catch (error) {
      handleClose()
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setIsLoading(false)
    }
  }

  const editRole = async itemId => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(itemId)

    const data = {
      name: displayName,
      name: displayName,
      description: roleDescription,
      permissions: selectedPermissionIds,
      display_name: displayName
    }

    console.log(data)

    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/admin/roles/update/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      handleClose()
      toast.success(response.data.message)
      fetchData()
      setRoleName('')
      setRoleDescription('')
    } catch (error) {
      handleClose()
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = () => {
    if (editingRole) {
      editRole(editingRole)
    } else {
      addRole()
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const fetchData2 = async editingRoleId => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/roles/edit/${editingRoleId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      setDisplayName(response.data.model.display_name)
      setDisplayName(response.data.model.display_name)
      setApiData2(response.data.permissions) // Update the state with the fetched data
      console.log(response.data.permissions)
      setSelectedCheckbox(initialSelectedPermissions)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData2(editingRole)
  }, [editingRole])

  const fetchData3 = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/permission`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      setApiData3(response.data[0].data)
      console.log('ttttttttttttttttttttttttt', response.data[0].data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData3()
  }, [])

  const deleteRoleNow = async itemId => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(itemId)

    setIsLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/admin/roles/delete/${itemId}`, null, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      handleClose()
      toast.success(response.data.message)
      fetchData()
    } catch (error) {
      handleClose()
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitDelete = () => {
    deleteRoleNow(deleteRole)
  }

  const renderCards = () =>
    apiData.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>{`${item.permissions_count} permissions`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h4' sx={{ mb: 1, textTransform: 'uppercase' }}>
                  {item.display_name}
                </Typography>

                {ability.can('sla:sla-settings-permissions-group:edit', 'sla:sla-settings-permissions-group:edit') && (
                  <Typography
                    href='/'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                    onClick={e => {
                      e.preventDefault()
                      handleClickOpen(item.id)
                      setDialogTitle('Edit')
                    }}
                  >
                    Edit Role
                  </Typography>
                )}
              </Box>

              {ability.can(
                'sla:sla-settings-permissions-group:delete',
                'sla:sla-settings-permissions-group:delete'
              ) && (
                <IconButton
                  onClick={e => {
                    e.preventDefault()
                    handleSetDeleteID(item.id)
                    const confirmation = window.confirm('Are you sure you want to delete this role?')
                    if (confirmation) {
                      handleSubmitDelete()
                    }
                  }}
                  size='small'
                  sx={{ color: 'text.disabled' }}
                >
                  <Icon icon='tabler:trash' />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return isLoading ? (
    <Skeleton height={300} count={10} baseColor='#f4f4f4' />
  ) : (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <img height={122} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
              </Box>
            </Grid>

            {ability.can('sla:sla-settings-permissions-group:create', 'sla:sla-settings-permissions-group:create') && (
              <Grid item xs={7}>
                <CardContent sx={{ pl: 0, height: '100%' }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      variant='contained'
                      sx={{ mb: 3, whiteSpace: 'nowrap', backgroundColor: '#71ace0' }}
                      onClick={() => {
                        handleClickOpen()
                        setDialogTitle('Add')
                      }}
                    >
                      Add New Role
                    </Button>
                    <Typography sx={{ color: 'text.secondary' }}>Add role, if it doesn't exist.</Typography>
                  </Box>
                </CardContent>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <Card>
          {/* <CustomAvatar skin='light' sx={{ width: 42, height: 42, color: '' }}>
            <Icon icon='tabler:edit' fontSize='1.8rem' />
          </CustomAvatar> */}
          <CardHeader title={`${dialogTitle} Role`} />
        </Card>
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
          {/* <Typography variant="body2" sx={{ color: 'gray', mt: 10, ml: 1 , alignItems: 'left'}}>
        <b>
          <em>Edit permission as per your requirements.</em>
        </b>
      </Typography> */}
        </DialogTitle>

        {/* <DialogTitle
          component='div'
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h3'></Typography>
          <Typography color='text.secondary'>Set Role Permissions</Typography>
        </DialogTitle> */}
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          {dialogTitle == 'Add' && (
            <Box sx={{ my: 0 }}>
              <FormControl fullWidth>
                <CustomTextField
                  fullWidth
                  label='Role Name'
                  placeholder='Enter Role Name'
                  value={roleName}
                  onChange={handleRoleNameChange}
                />
              </FormControl>
            </Box>
          )}

          {dialogTitle == 'Edit' && (
            <Box sx={{ my: 0 }}>
              <CardHeader title={displayName} />
            </Box>
          )}

          <Box sx={{ my: 4 }}>
            <FormControl fullWidth>
              <CustomTextField
                fullWidth
                label='Description'
                placeholder='Enter description'
                value={roleDescription}
                onChange={handleRoleDescriptionChange}
              />
            </FormControl>
          </Box>

          <Typography variant='h4'>Role Permissions</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}></TableCell>
                  <TableCell colSpan={3}></TableCell>
                </TableRow>
              </TableHead>
              {dialogTitle == 'Add' ? (
                <TableBody>
                  {apiData2?.map((i, index) => {
                    const id = i.id
                    const isChecked = selectedCheckbox.includes(`${id}-read`)
                    console.log(isChecked)

                    return (
                      <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            fontSize: theme => theme.typography.h6.fontSize
                          }}
                        >
                          {i.display_name}
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            label='Add'
                            sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                            control={
                              <Checkbox
                                size='small'
                                id={`${id}-read`}
                                onChange={() => togglePermission(`${id}-read`)}
                                checked={isChecked}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              ) : (
                <TableBody>
                  {apiData2?.map((i, index) => {
                    const id = i.id
                    const isChecked = i.assigned
                    console.log(isChecked)

                    return (
                      <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            fontSize: theme => theme.typography.h6.fontSize
                          }}
                        >
                          {i.display_name}
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            label='Add'
                            sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                            control={
                              <Checkbox
                                size='small'
                                id={`${id}-read`}
                                onChange={() => togglePermission(`${id}-read`)}
                                checked={isChecked}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button
              type='submit'
              variant='contained'
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#71ace0',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#22668D'
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button color='secondary' variant='tonal' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default RolesCards