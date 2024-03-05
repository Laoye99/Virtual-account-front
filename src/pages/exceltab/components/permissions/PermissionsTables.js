// ** React Imports
import { forwardRef, useState, useEffect } from 'react'


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
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import { CSVLink } from 'react-csv'
import FormGroup from '@mui/material/FormGroup'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Date of Birth (e.g 2000-01-31)' autoComplete='off' />
})

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [open, setOpen] = useState(false)
  const [editValue, setEditValue] = useState('')
  const handleDialogToggle = () => setOpen(!open)
  const [name, setName] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [description, setDescription] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const authContext = useContext(AuthContext)
  const ability = useContext(AbilityContext)

  // const onSubmit = e => {
  //   setOpen(false)
  //   e.preventDefault()

  const onSubmit = async (e) => {
    setOpen(false)
    e.preventDefault();
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(storedToken)

    // Gather the data to be sent
    const permissionData = {
      name: name, // Replace with the actual data from your form
      display_name: displayname,
      description: description
    };

    console.log(permissionData)

    // Make a POST request to your API endpoint
    try {
      // Make an HTTP PUT request to your endpoint
      const response = await axios.post(`${BASE_URL}/admin/permission/create`, permissionData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
        },
      });

      if (response.status === 200 ) {
        toast.success(response.data.message);

        // Redirect to another page after successful submission
       // router.push('/permissions');
      } else {
        console.error('Form submission failed with status:', response.status);
      }

      console.log('Form submitted successfully', response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error submitting form', error);
    }
  }

  return (
    <>

       {ability.can('sla:sla-settings-permissions:edit', 'sla:sla-settings-permissions:edit') && (
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={false}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Edit Permission
          </Typography>
          <Typography variant='body2'>Edit permission as per your requirements.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Alert severity='warning' sx={{ maxWidth: '500px' }}>
            <AlertTitle>Warning!</AlertTitle>
            By editing the permission name, you might break the system permissions functionality. Please ensure you're
            absolutely certain before proceeding.
          </Alert>

          <Box component='form' sx={{ mt: 8 }} onSubmit={onSubmit}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <CustomTextField
                fullWidth
                value={editValue}
                label='Permission Name'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                placeholder='Enter Permission Name'
                onChange={e => setEditValue(e.target.value)}
              />

              <Button type='submit' variant='contained' sx={{ mt: 4 }}>
                Update
              </Button>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
       )}
    </>
  )
}

export default TableHeader
