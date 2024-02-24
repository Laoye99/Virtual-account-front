// ** React Imports
import { useState, useEffect, useContext } from 'react'
import { BASE_URL } from 'src/configs/constanst'
import { useRouter } from 'next/router'

// ** Next Import
import Link from 'next/link'

// ** Component Imports
import { Ability, AbilityBuilder } from '@casl/ability'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { Button as MuiButton } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'

import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import FormControl from '@mui/material/FormControl'

import AvatarGroup from '@mui/material/AvatarGroup'

import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
}

const roleColors = {
  admin: 'error',
  ceo: 'info',
  hr: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}))

const UserViewLeft = ({ users }) => {
  // ** States
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const handleDialogToggle = () => setOpen2(!open2)
  const [dialogTitle, setDialogTitle] = useState('Assign')
  const [apiData, setApiData] = useState([])
  const [roles, setRoles] = useState('')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [permission, setPermission] = useState([])
  const [userRole, setUserRole] = useState([])
  const [staffData, setStaffData] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [reliever, setReliever] = useState('null')
  const [inputValue, setInputValue] = useState('')
  const [relieverAction, setRelieverAction] = useState('1')
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([])
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [selectedRole, setSelectedRow] = useState(null)
  const router = useRouter()
  const ability = useContext(AbilityContext)
  console.log(relieverAction)

  // console.log(apiData?.roles[0]?.name)

  const handleRelieverChange = event => {
    setRelieverAction(event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const togglePermission = id => {
    // If the clicked checkbox is already selected, unselect it
    if (selectedCheckbox.includes(id)) {
      setSelectedCheckbox([])
    } else {
      // If the clicked checkbox is not selected, clear the selection and select the clicked one
      setSelectedCheckbox([id])
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

        console.log(response.data.data)
        setUserRole(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Invoke the function to fetch data
  }, [])

  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  console.log(storedToken)

  const fetchData = async () => {
    setSubmitLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/admin/users/edit/${users}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      setApiData(response.data.user) // Update the state with the fetched data
      setPermission(response.data.permissions)
      setRoles(response.data.user.roles[0]?.name)
      setSubmitLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    fetchData() // Invoke the function to fetch data
  }, [])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const data = { roles: selectedPermissionIds }
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/admin/users/update/${users}`, data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      handleClose()
      toast.success(response.data.message)
      console.log('Form submitted successfully', response)
      fetchData() // Invoke the function to fetch data
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleSelectChangeGarantorOne = (event, newValue) => {
    setReliever(newValue)
  }

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
    setFetchCount(fetchCount + 1)
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(storedToken)

    if (fetchCount === 3) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/helper/users`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'content-Type': 'application/json'
            }
          })

          const data = response.data

          const dataStaff = Object.values(data)

          console.log(dataStaff)

          setStaffData(dataStaff)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData() // Invoke the function to fetch data
    }
  }, [fetchCount])

  const handleSubmit2 = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(storedToken)

    // You can access form values from the state (values, months, etc.)
    const formData = {
      delegate: relieverAction,
      reliever: reliever?.no_
    }

    console.log(formData)
    console.log(users)

    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.put(`${BASE_URL}/admin/delegate/${users}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      // Handle the response as needed
      toast.success(response.data.message)
      setReliever('')
      console.log('Form submitted successfully', response.data)
      fetchData()
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setButtonDisabled(false)
      handleDialogToggle()
    }
  }

  return submitLoading ? (
    <Skeleton height={300} count={10} baseColor='#f4f4f4' />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CustomAvatar
              skin='light'
              variant='rounded'
              color={data.avatarColor}
              sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
            >
              {/* {getInitials(apiData?.full_name)} */}
            </CustomAvatar>

            <Typography variant='h4' sx={{ mb: 3 }}>
              {apiData?.full_name}
            </Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={roles ? roles : 'User'}
              color={roleColors[roles]}
              sx={{ textTransform: 'capitalize' }}
            />
          </CardContent>
          <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>1.23k</Typography>
                    <Typography variant='body2'>Task Done</Typography>
                  </div>
                </Box> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                </CustomAvatar>
                <div>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{apiData?.job_title}</Typography>
                  {/* <Typography variant='body2'></Typography> */}
                </div>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Full Name:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData?.full_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Staff ID:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData.no_}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Gender:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData.gender == 1 ? 'Male' : 'Female'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Job Title:</Typography>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                  {apiData?.job_title}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Department Name:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData?.department_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Supervisor Name:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData?.supervisor_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Supervisor ID:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData?.supervisor_id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Current Reliever:</Typography>
  {apiData?.reliever?.full_name ? (
    <Typography sx={{ color: 'text.secondary' }}>{apiData?.reliever?.full_name}</Typography>
  ) : (
    <Typography sx={{ color: 'text.secondary' }}>No reliever assigned</Typography>
  )}
</Box>


              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Branch Name:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{apiData.branch_name}</Typography>
              </Box>
            </Box>
          </CardContent>
          {ability.can('sla:sla-settings-manage-users:assign-role', 'sla:sla-settings-manage-users:assign-role') && (
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 3, px: 5 }}>
              <Button
                onClick={() => {
                  handleClickOpen()
                  setDialogTitle('Assign')
                }}
                style={{ background: '#22668D', color: '#FFF' }}
              >
                Assign Role
              </Button>

              <Button onClick={handleDialogToggle} style={{ background: '#22668D', color: '#FFF' }}>
                Assign/Remove Relief
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>

      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <Card>
          <CardHeader title={`${dialogTitle} Role`} />
        </Card>

        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Typography variant='h4'>Roles</Typography>
          <Typography color='text.secondary'>You can only select one role</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}></TableCell>
                  <TableCell colSpan={3}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userRole?.map((i, index) => {
                  const id = i.id

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
                              checked={selectedCheckbox.includes(`${id}-read`)}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
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
              disabled={submitLoading}
            >
              {submitLoading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button color='secondary' variant='tonal' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open2}>
        <DialogTitle
          sx={{
            backgroundColor: '', // Background color
            color: '#fff', // Text color
            textAlign: 'center',
            padding: '16px', // Adjust the padding as needed
            display: 'flex', // Display as a flex container
            alignItems: 'center', // Vertically align items
            justifyContent: 'center' // Horizontally center item
          }}
        >
          <CustomAvatar skin='light' sx={{ width: 26, height: 26, color: '#007aff' }}>
            <Icon icon='tabler:file' fontSize='1.5rem' />
          </CustomAvatar>
          <Typography variant='h5' component='span' sx={{ mb: 2, color: 'gray', ml: 4, mt: 2 }}>
            Set Reliever
          </Typography>
        </DialogTitle>
        <Divider sx={{ m: '0 !important' }} />
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              mt: 4,
              mx: 'auto',
              width: '100%',
              maxWidth: 360,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Autocomplete
              placeholder='Select Reliever'
              id='form-layouts-tabs-select'
              options={staffData}
              getOptionLabel={option => option.full_name}
              getOptionValue={option => option.no_}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              value={reliever}
              onChange={handleSelectChangeGarantorOne}
              renderInput={params => <TextField {...params} label='Type Reliever Name Here' fullWidth />}
              isOptionEqualToValue={(option, value) => option.no_ === value.no_}
              filterOptions={(options, state) => {
                if (state.inputValue === '') {
                  return options
                }

                return options.filter(option => option.full_name.toLowerCase().includes(state.inputValue.toLowerCase()))
              }}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <RadioGroup
              row
              value={relieverAction}
              onChange={handleRelieverChange}
              aria-label='Reliever Action'
              name='reliever-action-radio'
            >
              <FormControlLabel value='1' control={<Radio />} label='Set Reliever' />
              <FormControlLabel value='0' control={<Radio />} label='Remove Reliever' />
            </RadioGroup>

            <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  backgroundColor: '#71ace0', // Background color
                  color: '#fff', // Text color
                  '&:hover': {
                    backgroundColor: '#0056b3' // Hover background color
                  }
                }}
                onClick={handleSubmit2}
              >
                {isButtonDisabled ? 'Processing...' : 'Submit'}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default UserViewLeft
