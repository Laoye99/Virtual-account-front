// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

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
  const [apiData, setApiData] = useState([])
  const [value, setValue] = useState('personal-info')
  const [isLoading, setIsLoading] = useState(false)


  console.log('nnnnnnnnnnnnnnnnnnnnnnn', apiData)

  // ** Hooks
  const router = useRouter()

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const fetchData = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const loantype = window.localStorage.getItem('loanType')
   console.log(loantype)

    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/switch/transactions?switch-type=${loantype}&session-id=${guarantor}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setApiData(response.data.data.transactions[0])
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






  return  (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Transaction Details</span>} />
        </TabList>
        <fieldset sx={{ marginBottom: '1200px' }}>
          <legend>Transaction Details</legend>
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
        <TableCell>Name Enquiry Ref:</TableCell>
        <TableCell>
          {apiData?.nameenquiryref}
        </TableCell>
      </TableRow>
       <TableRow>
        <TableCell>c24_rev_rsp_flg:</TableCell>
        <TableCell>
          {apiData?.c24_rev_rsp_flg}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Payment Reference:</TableCell>
        <TableCell>
          {apiData?.paymentreference}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>tsq_2_count:</TableCell>
        <TableCell>
        {apiData?.tsq_2_count}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>tsq_2_rsp_code:</TableCell>
        <TableCell>
        {apiData?.tsq_2_rsp_code}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>c24_rsp_date:</TableCell>
        <TableCell>
        {apiData?.c24_rsp_date}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>reversal_rsp_code:</TableCell>
        <TableCell>
        {apiData?.reversal_rsp_code}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Originator Account Number:</TableCell>
        <TableCell>
        {apiData?.originatoraccountnumber}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Destination Institution Code:</TableCell>
        <TableCell>
        {apiData?.destinationinstitutioncode}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>c24_num_trial:</TableCell>
        <TableCell>
        {apiData?.c24_num_trial}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>c24_rsp_code:</TableCell>
        <TableCell>
        {apiData?.c24_rsp_code}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Response Date:</TableCell>
        <TableCell>
        {apiData?.responsedate}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Beneficiary Account Number:</TableCell>
        <TableCell>
        {apiData?.beneficiaryaccountnumber}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>reversal_num_trial:</TableCell>
        <TableCell>
        {apiData?.reversal_num_trial}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Amount:</TableCell>
        <TableCell>
        {apiData?.amount}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Beneficiary Account Name:</TableCell>
        <TableCell>
        {apiData?.beneficiaryaccountname}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>Originator Account Name:</TableCell>
        <TableCell>
        {apiData?.originatoraccountname}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>tsq_2_date:</TableCell>
        <TableCell>
        {apiData?.tsq_2_date}
        </TableCell>
      </TableRow>
	  
	  <TableRow>
        <TableCell>sessionid:</TableCell>
        <TableCell>
        {apiData?.sessionid}
        </TableCell>
      </TableRow>
	  
      </TableBody>)
}


            </Table>
          </TableContainer>
        </fieldset>


      </TabContext>


    </Card>
  )
}

FormLayoutsGuarantor.acl = {
  action: 'user',
  subject: 'user'
}

export default FormLayoutsGuarantor
