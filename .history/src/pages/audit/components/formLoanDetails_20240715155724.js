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

import TableHeader from './TableHeader'
import SidebarAddUser from './AddUserDrawer'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import api from 'src/apis'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsGuarantor = userID => {
  const guarantor = userID.userID
  console.log(guarantor)

  // ** States
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)
  const [apiData, setApiData] = useState([])
  const [value, setValue] = useState('personal-info')
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const router = useRouter()

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

//   function findServiceProviderById(guarantor) {
//     return data.data.find(item => item['service-provider-id'] === guarantor);
// }

  const fetchData = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/auditLog/get?id=${guarantor}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setApiData(response.data);
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

  console.log('nnnnnnnnnnnnnnnnnnnnnnn', apiData)

   {/* const handleActivate = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      "disabled": "false" // true or false
  }

    console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.put(`${BASE_URL}/apiRegistry/enable_disable?id=${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      console.log(response.data)
      toast.success("Successfully Enabled")
      router.push('/api-reg')

    } catch (error) {
      // Handle errors
      toast.error('Please try again')
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    }
  }

  const handleDeactivate = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      "disabled": "true" // true or false
  }

    console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.put(`${BASE_URL}/apiRegistry/enable_disable?id=${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      console.log(response.data)
      toast.success("Successfully Disabled")
      router.push('/api-reg')

    } catch (error) {
      // Handle errors
      toast.error('Please try again')
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    }
  } */}

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  return  (
    <Card>
    <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
      <Button
          component={Link}
          variant='contained'
          href='/audit'
          startIcon={<Icon icon='tabler:arrow-left' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          Back
        </Button>
      </CardContent>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>API Configuration Details</span>} />
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
  <TableRow>
        <TableCell>ID:</TableCell>
        <TableCell>
          {apiData?.['audit_id']}
        </TableCell>
      </TableRow>
  <TableRow>
        <TableCell>Table Name:</TableCell>
        <TableCell>
          {apiData?.['table_name']}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Operation:</TableCell>
        <TableCell>
        {apiData?.operation']}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Operated By:</TableCell>
        <TableCell>
          {apiData?.operated_by}
        </TableCell>
      </TableRow>
      </TableBody>)
}


            </Table>
          </TableContainer>
        </fieldset>


      </TabContext>

      <Divider />


      <Box sx={{ display: 'flex', alignItems: 'center', px: [6, 10], my: '1rem' }}>

     {
    /* apiData?.['disabled'] === "true" ? (<Button variant='contained'  onClick={handleActivate} sx={{ mr: 3, backgroundColor: '#f50606',  '&:hover': {
    backgroundColor: '#f50606'
    } }}>
    {isButtonDisabled ? 'Processing...' : 'Enable'}
    </Button>) : (   <Button variant='contained'  onClick={handleDeactivate} sx={{ mr: 3, backgroundColor: '#f50606',  '&:hover': {
      backgroundColor: '#f50606'
    } }}>
    {isButtonDisabled ? 'Processing...' : 'Disable'}
    </Button>) */
    }


                <TableHeader toggle={toggleAddUserDrawer} />
                <SidebarAddUser open={addUserOpen} toggle={toggleAddUserDrawer} guarantor={guarantor} apiData={apiData} />
                </Box>

    </Card>
  )
}

FormLayoutsGuarantor.acl = {
  action: 'user',
  subject: 'user'
}

export default FormLayoutsGuarantor
