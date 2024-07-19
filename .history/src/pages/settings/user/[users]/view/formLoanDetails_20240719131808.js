// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import Link from 'next/link'

// ** Axios
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Config
import authConfig from 'src/configs/auth'
import InputLabel from '@mui/material/InputLabel'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'

// import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Box, Collapse } from '@mui/material'

// import TableHeader from './TableHeader'
// import SidebarAddUser from './AddUserDrawer'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import api from 'src/apis'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsGuarantor = switchID => {
  const guarantor = switchID.switchID
  console.log(guarantor)

  // ** States
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const handleDialogToggle = () => setOpen(!open)
  const [dialogTitle, setDialogTitle] = useState('Assign')
  const [apiData, setApiData] = useState([])
  const [value, setValue] = useState('personal-info')
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([])


  console.log('nnnnnnnnnnnnnnnnnnnnnnn', apiData)

  const branch = [
    {
      "id": 1,
      "name": "GUEST",
  },
  {
    "id": 2,
    "name": "INITIATOR",
},
{
  "id": 3,
  "name": "APPROVER",
},
{
  "id": 4,
  "name": "ADMIN",
},
  ]

  // ** Hooks
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])

    // setSelectedCheckbox([])
    // setIsIndeterminateCheckbox(false)
  }



  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const fetchData = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/user?id=${guarantor}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setApiData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }



  useEffect(() => {
    fetchData() // Invoke the function to fetch data
  }, []) // Empty dependency array ensures this effect runs once after the component is mounted



  useEffect(() => {
    // Create an array of selected permission IDs as numbers
    const newSelectedPermissionIds = selectedCheckbox.map(id => {
      // Transform the ID to remove '-read' suffix and parse it as a number
      return parseInt(id.replace('-read', ''), 10)
    })
    setSelectedPermissionIds(newSelectedPermissionIds)
  }, [selectedCheckbox])

  const formatDateString = (isoString) => {
    const date = new Date(isoString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return date.toLocaleString('en-US', options);
  };

  const formatKeyString = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };


  const handleSubmit = async () => {
    setSubmitLoading(true)
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  //   const data = {
  //     branches_id : selectedPermissionIds[0],
  //     user_id : guarantor
  // }

  const data = {
      "username": apiData.username,
      "role": selectedCheckbox[0],

  }
  console.log(data)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/user/changeUserRole`, data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      handleClose()
      toast.success("Role updated successfully")
      console.log('Form submitted Successfully', response)
      fetchData() // Invoke the function to fetch data
    } catch (error) {
      toast.error("please try again")
      console.error('Error submitting form', error)
    } finally {
      setSubmitLoading(false)
    }
  }

  const renderTableRows = (data) => {
    // Filter out the fields you don't want to display
    const filteredData = Object.entries(data).filter(([key]) =>
      !['email_verified_at', 'created_at', 'updated_at', 'branches_id', 'branch'].includes(key)
    );

    return filteredData.map(([key, value]) => (
      <TableRow key={key}>
        <TableCell>
          {formatKeyString(key)}:
        </TableCell>
        <TableCell>
          {value?.toString()}
        </TableCell>
      </TableRow>
    ));
  };

  const handleCheckboxChange = (name) => {
    setSelectedCheckbox(prevSelectedCheckbox => {
      if (prevSelectedCheckbox.includes(name)) {
        return prevSelectedCheckbox.filter(roleName => roleName !== name);
      } else {
        return [...prevSelectedCheckbox, name];
      }
    });
  };



  return  (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>User Details</span>} />
        </TabList>
        <fieldset sx={{ marginBottom: '1200px' }}>
          <TableContainer
            sx={{
              borderRadius: '6px !important',
              border: theme => `1px solid ${theme.palette.divider}`,
              borderBottom: theme => `2px solid ${theme.palette.divider}`,
              '& .MuiTab-root': { py: 3.5 },
              marginBottom: '20px'
            }}
          >
            <Table sx={{ minWidth: 200 }}>
{
  apiData == [] ? (
 null) : ( <TableBody>
     {renderTableRows(apiData)}
      </TableBody>)
}


            </Table>
          </TableContainer>
          <Button
                onClick={() => {
                  handleClickOpen()
                  setDialogTitle('Assign')
                }}
                style={{ background: '#f50606', color: '#FFF' }}
              >
                Assign Role
              </Button>
        </fieldset>


      </TabContext>

      <Divider />

      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleDialogToggle} open={open}>
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
          <Typography color='text.secondary'>You can only select one Role</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}></TableCell>
                  <TableCell colSpan={3}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {branch?.map((i, index) => {
        const name = i.name;

        return (
          <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
            <TableCell
              sx={{
                fontWeight: 600,
                whiteSpace: 'nowrap',
                fontSize: theme => theme.typography.h6.fontSize
              }}
            >
              {name}
            </TableCell>
            <TableCell>
              <FormControlLabel
                label='Add'
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size='small'
                    id={`${name}-read`}
                    onChange={() => handleCheckboxChange(name)}
                    checked={selectedCheckbox.includes(name)}
                  />
                }
              />
            </TableCell>
          </TableRow>
        );
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
                backgroundColor: '#f50606',
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

    </Card>
  )
}

FormLayoutsGuarantor.acl = {
  action: 'user',
  subject: 'user'
}

export default FormLayoutsGuarantor
