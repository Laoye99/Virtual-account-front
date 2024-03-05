// ** React Imports
import { forwardRef, useState, useEffect, useCallback, useContext } from 'react'

// ** Component Imports
import { Ability, AbilityBuilder } from '@casl/ability'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { AuthContext } from 'src/context/AuthContext'

// ** Axios
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config

import authConfig from 'src/configs/auth'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'

const CustomInput = forwardRef((props, ref) => {
  return (
    <CustomTextField fullWidth {...props} inputRef={ref} label='Date of Birth (e.g 2000-01-31)' autoComplete='off' />
  )
})

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)
  const [name, setName] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [description, setDescription] = useState('')
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [searchValue, setSearchValue] = useState('') // Add state for search value
  const [data, setData] = useState([])

  const authContext = useContext(AuthContext)
  const ability = useContext(AbilityContext)

  // const onSubmit = e => {
  //   setOpen(false)
  //   e.preventDefault()

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
      console.error('An error occurred:', error)
    }
  }, [searchValue])

  useEffect(() => {
    // Fetch data on initial render
    fetchData()
  }, [fetchData])

  const onSubmit = async e => {
    setOpen(false)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    //console.log(storedToken)

    // Gather the data to be sent
    const permissionData = {
      name: name, // Replace with the actual data from your form
      display_name: displayname,
      description: description
    }

   // console.log(permissionData)

    // Make a POST request to your API endpoint
    try {
      // Make an HTTP PUT request to your endpoint
      const response = await axios.post(`${BASE_URL}/admin/permission/create`, permissionData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        toast.success(response.data.message)

        // // Wait for 3 seconds before reloading the window
        // setTimeout(() => {
        //   window.location.reload()
        // }, 2000) // 3000 milliseconds = 3 seconds

        // Redirect to another page after successful submission
        // router.push('/guarantor');
        fetchData()
      } else {
        console.error('Form submission failed with status:', response.status)
      }

      console.log('Form submitted successfully', response.data)
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    }
  }

  return (
    <>
      {/* {ability.can('sla:sla-settings-permissions:create', 'sla:sla-settings-permissions:create') && ( */}
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Permission'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2, backgroundColor: '#71ace0' }} variant='contained' onClick={handleDialogToggle}>
          Add Permission
        </Button>
      </Box>

      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
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
            Add New Permission
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
            component='form'
            onSubmit={e => onSubmit(e)}
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
            <CustomTextField
              fullWidth
              sx={{
                marginBottom: '1rem',
                '& .MuiInputBase-input': {
                  // Input text styles
                  fontSize: '16px' // Adjust the font size as needed
                }
              }}
              label='Permission Name'
              placeholder='Enter Permission Name'
              value={name}
              onChange={e => setName(e.target.value)}
              InputLabelProps={{
                sx: {
                  fontWeight: 'bold' // Add this to make the label bold
                }
              }}
            />

            <CustomTextField
              fullWidth
              sx={{
                marginBottom: '1rem',
                '& .MuiInputBase-input': {
                  // Input text styles
                  fontSize: '16px' // Adjust the font size as needed
                }
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
                marginBottom: '1rem',
                '& .MuiInputBase-input': {
                  // Input text styles
                  fontSize: '16px' // Adjust the font size as needed
                }
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
              >
                Create Permission
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
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {/* )} */}
    </>
  )
}

export default TableHeader
