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
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'

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
import { Table } from 'antd'
import { DataGrid } from '@mui/x-data-grid'

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

// {
//   "service_provider_id": "code54",
//   "its_institution_id": "999002",
//   "id": "",
//   "document_id": "10406130-697a-4f93-aa00-fc9fb1df99e4",
//   "institution_name": "name",
//   "institution_id": "1234"
// }

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 60,
    headerName: 'ID',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.id}</Typography>
  },
  {
    flex: 0.1,
    field: 'institutionname',
    minWidth: 120,
    headerName: 'Institution Name',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.institutionname}</Typography>
  },

  {
    flex: 0.1,
    field: 'batchnumber',
    minWidth: 120,
    headerName: 'Batch Number',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.batchnumber}</Typography>
  },
  {
    flex: 0.1,
    field: 'transactionlocation',
    minWidth: 120,
    headerName: 'Transaction Location',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['transactionlocation']}</Typography>
  },
  {
    flex: 0.1,
    field: 'channelcode',
    minWidth: 120,
    headerName: 'Channel Code',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.channelcode}</Typography>
  },

  {
    flex: 0.1,
    field: 'category',
    minWidth: 120,
    headerName: 'Category',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.category}</Typography>
  },
  {
    flex: 0.1,
    field: 'document_id',
    minWidth: 120,
    headerName: 'Document id',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row['document_id']}</Typography>
  }
]

const FormLayoutsGuarantor = loanId => {
  const guarantor = loanId.loanId
  console.log(guarantor)

  // ** States
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const handleDialogToggle = () => setOpen(!open)
  const [apiData, setApiData] = useState([])
  const [value, setValue] = useState('personal-info')
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  console.log('nnnnnnnnnnnnnnnnnnnnnnn', apiData)
  const dataEntries = Object.entries(apiData)

  // ** Hooks
  const router = useRouter()

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const fetchData = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    setIsLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}/switch/uploadfile?module=fin_inst&document_id=${guarantor}&fetch-content=true&category=unapproved`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'http://localhost:3000/'
          }
        }
      )
      setApiData(response.data.data)
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

  const handleApprove = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      status: true,
      message: message
    }

    console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/switch/uploadfile/approve?document_id=${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'http://localhost:3000/'
        }
      })
      setButtonDisabled(false)
      toast.success(response.data.message)
      setMessage('')
      router.push('/institutions')
    } catch (error) {
      // Handle errors
      toast.error(error?.response?.data?.status?.message)
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    }
  }

  const handleDecline = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      status: false,
      message: message
    }

    console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/switch/uploadfile/approve?document_id=${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'http://localhost:3000/'
        }
      })
      setButtonDisabled(false)
      toast.success(response.data.message)
      setMessage('')
      router.push('/institutions/uploaded-document')
    } catch (error) {
      // Handle errors
      toast.error(error?.response?.data?.status?.message)
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    }
  }

  // const columns = [
  //   {
  //     title: 'id',
  //     dataIndex: 'id',
  //     key: 'id',
  //   },
  //   {
  //     title: 'institutionname',
  //     dataIndex: 'institutionname',
  //     key: 'institutionname',
  //   },
  //   {
  //     title: 'batchnumber',
  //     dataIndex: 'batchnumber',
  //     key: 'batchnumber',
  //   },
  //   {
  //     title: 'transactionlocation',
  //     dataIndex: 'transactionlocation',
  //     key: 'transactionlocation',
  //   },

  //   {
  //     title: 'institutioncode',
  //     dataIndex: 'institutioncode',
  //     key: 'institutioncode',
  //   },

  //   {
  //     title: 'channelcode',
  //     dataIndex: 'channelcode',
  //     key: 'channelcode',
  //   },

  //   {
  //     title: "category",
  //     dataIndex: "category",
  //     key: "category",

  //   },
  //   {
  //     title: "document_id",
  //     dataIndex: "document_id",
  //     key: "document_id",

  //   }
  // ]

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Uploaded file Details</span>} />
        </TabList>
        <fieldset sx={{ marginBottom: '1200px' }}>
          <legend>Uploaded file Details</legend>
          <TableContainer
            sx={{
              borderRadius: '6px !important',
              border: theme => `1px solid ${theme.palette.divider}`,
              borderBottom: theme => `2px solid ${theme.palette.divider}`,
              '& .MuiTab-root': { py: 3.5 },
              marginBottom: '20px'
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <DataGrid
                autoHeight
                pagination
                rows={apiData}
                rowHeight={62}
                columns={columns}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
              />
            </div>
          </TableContainer>
        </fieldset>
      </TabContext>

      <Divider />

      <CardContent sx={{ px: [6, 10] }}>
        <InputLabel htmlFor='invoice-note' sx={{ mb: 2, fontWeight: 500, fontSize: '1.5rem', lineHeight: 'normal' }}>
          Message:
        </InputLabel>
        <CustomTextField
          rows={2}
          value={message}
          fullWidth
          onChange={e => setMessage(e.target.value)}
          multiline
          id='invoice-note'
          defaultValue=''
        />
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', px: [6, 10], mb: '3rem' }}>
        <Button
          onClick={handleApprove}
          disabled={isButtonDisabled}
          type='submit'
          variant='contained'
          sx={{
            mr: 3,
            backgroundColor: '#71ace0',
            '&:hover': {
              backgroundColor: '#22668D'
            }
          }}
        >
          {isButtonDisabled ? 'Processing...' : 'Approve'}
        </Button>
        <Button
          onClick={handleDecline}
          disabled={isButtonDisabled}
          type='submit'
          variant='contained'
          sx={{
            mr: 3,
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606'
            }
          }}
        >
          {isButtonDisabled ? 'Processing...' : 'Decline'}
        </Button>
      </Box>
    </Card>
  )
}

FormLayoutsGuarantor.acl = {
  action: 'user',
  subject: 'user'
}

export default FormLayoutsGuarantor
