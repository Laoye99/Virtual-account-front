import axios from 'axios'
import { forwardRef, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

import { styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

// ** Config
import TabContext from '@mui/lab/TabContext'
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
import Typography from '@mui/material/Typography'
import Link from 'next/link'


import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

// ** Icon Imports

// ** Icon CopyToClipboard
import { makeStyles } from '@material-ui/core/styles'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Click to select Date' autoComplete='off' />
})

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

const FormLayoutLoanCalculator = () => {
  const classes = useStyles()
  const [value, setValue] = useState('personal-info')
  const [apiData, setApiData] = useState([])
  const [apiDataa, setApiDataa] = useState([])
  const [data, setData] = useState([])
  const [issueDate, setIssueDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date())

  // const [frequency, setFrequency] = useState(null);
  const [tenor, setTenor] = useState('')
  const [loantype, setLoanType] = useState('')
  const [amountt, setAmount] = useState('')

  //const [selectedDate, setSelectedDate] = useState(null);
  const [monthlyPayment, setMonthlyPayment] = useState(0) // State to store monthly payment
  const [totalLoanAmount, setTotalLoanAmount] = useState(0) // State to store monthly payment
  const [interestRate, setInterestRate] = useState(0) // State to store interest_rate
  const [newAmount, setNewAmount] = useState(0) // State to store new amount
  const [totalInterest, setTotalInterest] = useState(0) // State to store sum_interests
  //const [endDate, setEndDate] = useState(null); // State to store end date
  const [storedToken, setStoredToken] = useState('your-auth-token') // Replace with your actual auth token
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [monthlyPaymentCopied, setMonthlyPaymentCopied] = useState(false)
  const [totalLoanAmountCopied, setTotalLoanAmountCopied] = useState(false)

  const formattedStartDate = issueDate.toISOString().split('T')[0]; // YYYY-MM-DD
  const formattedEndDate = dueDate.toISOString().split('T')[0]; // Add one year and format
  console.log(formattedStartDate, formattedEndDate)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    // ...
  }, [])

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
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
   * The function `calculateLoanDetails` is an asynchronous function that makes an HTTP POST request to a
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
      const response = await axios.get(`${BASE_URL}/switch/perf-stat?start-date=${formattedStartDate}T00:00:00&end-date=${formattedEndDate}T00:00:00&endpoint=NIPINFLWV2&total_tat=3`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      console.log(response)
      toast.success(response.data.message)

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
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Statistics</span>} />
        </TabList>
        <Button
          component={Link}
          variant='contained'
          // href='/switch-service/approved-switch'
          // startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          Veiw Approved Provider
        </Button>
        <form onSubmit={onSubmit}>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='personal-info'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Start Date:</Typography>
                <DatePicker
                  id='issue-date'
                  selected={issueDate}
                  customInput={<CustomInput />}
                  onChange={date => setIssueDate(date)}
                />
              </Box>
                  {/* <CustomTextField
                    fullWidth
                    label='Start Date'
                    placeholder='Loan amount'
                    value={amountt}
                    type='text' // Input type as number
                    inputProps={{ pattern: '[0-9]*' }}
                    onChange={handleAmount}
                    required
                  /> */}
                </Grid>
                <Grid item xs={12} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>End Date:</Typography>
                <DatePicker
                  id='due-date'
                  selected={dueDate}
                  customInput={<CustomInput />}
                  onChange={date => setDueDate(date)}
                />
              </Box>
                  {/* <CustomTextField
                    fullWidth
                    label='End Date'
                    placeholder='Maturity'
                    inputProps={{ pattern: '[0-9]*' }}
                    type='text' // Input type as number
                    value={tenor}
                    onChange={handleTenor}

                   // onChange={e => setTenor(e.target.value)}
                   required
                  /> */}
                </Grid>
                <Grid item xs={12} sm={3}>
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
                    <MenuItem value='collaterteralized'>Collaterteralized</MenuItem>
                    <MenuItem value='non-collaterteralized'>Non-Collaterteralized</MenuItem>
                  </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <CardActions sx={{ mb: 2, mt: 2 }}>
                    <Button
                      type='submit'
                      sx={{ mr: 2, backgroundColor: '#f50606' }}
                      variant='contained'
                      onClick={onSubmit}
                      disabled={isButtonDisabled}
                    >
                      {isButtonDisabled ? 'Processing...' : 'Calculate'}
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
    </Card>
  )
}

export default FormLayoutLoanCalculator
