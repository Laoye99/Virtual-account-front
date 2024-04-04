import axios from 'axios'
import { forwardRef, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'
import Link from 'next/link'

import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

// ** Config
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { TableContainer } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Tab from '@mui/material/Tab'
import CustomTextField from 'src/@core/components/mui/text-field'
import authConfig from 'src/configs/auth'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Icon CopyToClipboard
import { makeStyles } from '@material-ui/core/styles'
import CustomInput from './PickersCustomInput'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTableRow-root:nth-of-type(odd)': {
      backgroundColor: 'transparent' // Set the background color to transparent for odd rows
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: 'transparent' // Set the background color to transparent for hover effect
    }
  }
}))


const columns = [
  {
    flex: 0.1,
    field: 'credit_tat',
    minWidth: 60,
    headerName: 'credit_tat',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.credit_tat || ""}</Typography>
  },

  {
    flex: 0.1,
    field: 'debit_tat',
    minWidth: 60,
    headerName: 'debit_tat',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.debit_tat || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'endpoint',
    minWidth: 120,
    headerName: 'endpoint',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["endpoint"] || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'msg_type',
    minWidth: 120,
    headerName: 'msg_type',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.msg_type || ""}</Typography>
  },

  {
    flex: 0.1,
    field: 'total_tat',
    minWidth: 60,
    headerName: 'total_tat',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.total_tat || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'val_tat',
    minWidth: 60,
    headerName: 'val_tat',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["val_tat"] || 0}</Typography>
  },

  {
    flex: 0.1,
    field: 'entrydate',
    minWidth: 120,
    headerName: 'entrydate',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["entrydate"] || 0}</Typography>
  },


  // {
  //   flex: 0.1,
  //   minWidth: 100,
  //   sortable: false,
  //   field: 'actions',
  //   headerName: 'Actions',
  //   renderCell: ({ row }) => (
  //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //       <Tooltip title='View'>
  //         <IconButton size='small' component={Link} href={`/switch-service/${row.id}`}>
  //           <Icon icon='tabler:eye' />
  //         </IconButton>
  //       </Tooltip>
  //     </Box>
  //   )
  // }
]

const FormLayoutLoanCalculator = () => {
  const classes = useStyles()
  const [value, setValue] = useState('personal-info')
  const [months, setMonths] = useState('')
  const [apiData, setApiData] = useState([])
  const [apiDataa, setApiDataa] = useState([])
  const [data, setData] = useState([])
  const [issueDate, setIssueDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date())
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // const [frequency, setFrequency] = useState(null);
  const [tenor, setTenor] = useState('')
  const [loantype, setLoanType] = useState('')
  const [amountt, setAmount] = useState('')



  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const formattedStartDate = issueDate.toISOString().slice(0, 19); // YYYY-MM-DD
  const formattedEndDate = dueDate.toISOString().slice(0, 19); // Add one year and format
console.log(formattedEndDate, formattedStartDate)
  console.log(issueDate, dueDate)

  console.log(data)

  const newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
});

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    // ...
  }, [])

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSelectChange = event => {
    setMonths(event.target.value)
    setLoanType(event.target.value)
  }



  // Define a custom styled component for the table container

  const StyledTableContainer = styled(TableContainer)`
    margin-top: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    & .MuiTableHead-root {
      background-color: #f50606;
      color: #fff;
    }

    & .MuiTableCell-root {
      border-bottom: 2px solid #fff;
      font-weight: 600;
    }

    & .MuiTableRow-root:nth-of-type(odd) {
      background-color: #f5f5f5;
    }

    & .MuiTableRow-root:hover {
      background-color: #eff8ff;
    }
  `


  const handleAmount = e => {
    const value = e.target.value

    // Ensure only numeric characters are accepted
    if (/^\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleTenor = e => {
    const value = e.target.value

    // Ensure only numeric characters are accepted
    if (/^\d*$/.test(value)) {
      setTenor(value)
    }
  }

  /**
   * The function calculateLoanDetails is an asynchronous function that makes an HTTP POST request to a
   * specified endpoint with form data, retrieves the response data, and updates the state with the
   * fetched data.
   */
  const onSubmit = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.get(`${BASE_URL}/switch/perf-stat?start-date=${formattedStartDate}&end-date=${formattedEndDate}&endpoint=${loantype}&total_tat=3`, {
        headers: {
          Authorization: Bearer ${storedToken},
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      console.log(response.data.data)
      setData(response.data.data)

      if (response.data.data[0] && response.data.data[0].hasOwnProperty('sessionid')) {
        toast.success(response.data.message)
    } else {
      toast.success("Please select endpoint to view Performance statistics")
    }



    } catch (error) {
      // Handle errors
      toast.error('Please try again')
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    } finally {
      setTimeout(() => {
        // Re-enable the button
        // window.location.reload()
      }, 2000) // Adjust the time (in milliseconds) to your desired delay
    }
  }

  // Map through the array and extract the 'repayment' property
  // const repaymentData = response.data?.repayment || [];
  const headerKeys = Object.keys(apiDataa[0] || {})
  console.log('table head', headerKeys)





  return (
    <Card>
      <TabContext value={value}>
      <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => 1px solid ${theme.palette.divider}, '& .MuiTab-root': { py: 3.5 } }}
          >


          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Statistics</span>} />


        <Button
          component={Link}
          variant='contained'
          href='/statistics/unapproved-statistics'
          startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          View Unapproved Statistics
        </Button>
        </CardContent>

        <form onSubmit={onSubmit}>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='personal-info'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Start Date:</Typography>
                <DatePicker
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          selected={issueDate}
          id='date-time-picker'
          dateFormat='MM/dd/yyyy h:mm aa'
          onChange={date => setIssueDate(date)}
          customInput={<CustomInput label='Start Date & Time' />}
        />
              </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>End Date:</Typography>
                <DatePicker
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          selected={dueDate}
          id='date-time-picker'
          dateFormat='MM/dd/yyyy h:mm aa'
          onChange={date => setDueDate(date)}
          customInput={<CustomInput label='End Date & Time' />}
        />
              </Box>
                </Grid>

{
  data[0] ? (null) : ( <Grid item xs={12} sm={3}>
    <CustomTextField
      select
      fullWidth
      defaultValue=''
      label='Endpoint'
      placeholder='Loan Type?'
      id='form-layouts-tabs-multiple-select'
      SelectProps={{
        multiple: false,
        value: loantype,
        onChange: e => setLoanType(e.target.value)
      }}
      required
    >
      <MenuItem value='summary'>summary</MenuItem>
    </CustomTextField>
  </Grid>)
}


                {
                  data[0] ? (<Grid item xs={12} sm={3}>
                    <CustomTextField
                                               select
                                               fullWidth
                                               defaultValue=''
                                               label='select endpoint'
                                               id='form-layouts-tabs-multiple-select'
                                               SelectProps={{
                                                 multiple: false,
                                                 value: months,
                                                 onChange: handleSelectChange
                                               }}
                                             >
                                               {newData.map(month => (
                                                 <MenuItem key={month.id} value={month.endpoint}>
                                                   {month.endpoint}, count-{month.count}
                                                 </MenuItem>
                                               ))}
                                             </CustomTextField>
                                     </Grid>) : (
                  null
                  )
                }



                <Grid item xs={12} sm={3}>
                  <CardActions sx={{ mb: 2, mt: 2 }}>
                    <Button
                      type='submit'
                      sx={{ mr: 2, backgroundColor: '#f50606',  '&:hover': {
                        backgroundColor: '#f50606'
                      } }}
                      variant='contained'
                      onClick={onSubmit}
                      disabled={isButtonDisabled}
                    >
                      {isButtonDisabled ? 'Processing...' : 'Submit'}
                    </Button>
                  </CardActions>
                </Grid>

                <br></br>
                <Divider sx={{ m: '5 !important' }} />
              </Grid>
            </TabPanel>
          </CardContent>
          {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              type='submit'
              sx={{ mr: 2, backgroundColor: '#f50606' }}
              variant='contained'
              onClick={calculateLoanDetails}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? 'Processing...' : 'Calculate'}
            </Button>
          </CardActions> */}
          <Divider sx={{ m: '0 !important' }} />

        </form>
      </TabContext>

      {
        (data[0] && data[0].hasOwnProperty('sessionid')) &&
        <DataGrid
        getRowId={data.sessionid}
          autoHeight
          pagination
          rows={newData}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      }



    </Card>
  )
}

export default FormLayoutLoanCalculator;
