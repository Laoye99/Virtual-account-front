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


import 'react-datepicker/dist/react-datepicker.css'

// ** Icon Imports

// ** Icon CopyToClipboard
import { makeStyles } from '@material-ui/core/styles'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Payment Start Date' autoComplete='off' />
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

  // Create a state variable to track form submission
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  // Create a state variable to track form submission
  const [isFormDataValid, setIsFormDataValid] = useState(false)

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
  const calculateLoanDetails = async e => {
    // Disable the button
    setButtonDisabled(true)

    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(storedToken)

    // You can access form values from the state (amount, tenor, etc.)
    const principal = parseFloat(amountt)
    const maturity = parseInt(tenor)

    // const loantype = loantype;
    const formData = { principal: amountt, maturity: tenor, loantype: loantype }
    console.log(formData)

     // Check if all fields in the formData are not empty or null
     const isFormDataValid = Object.values(formData).every(value => value !== '' && value !== null)

    if (!isFormDataValid) {
      setTimeout(() => {
        // Re-enable the button
        setButtonDisabled(false)
      }, 2000) // Adjust the time (in milliseconds) to your desired delay
      // At least one field is empty or null, display an error message or handle it as needed.
      console.error('Oops!!! All fields are required')
      toast.error('Oops!!! All fields are required')

      return
    } else {}

    try {
      // Make an HTTP PUT request to your endpoint

      const response = await axios.post(`${BASE_URL}/autoloan/loan/calculator`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      console.log(response.status)

      if (response.status === 200) {
        console.log(response.data)
        console.log('iiiiiiiiiiiii', response.data.repayment)

        setApiData(response.data)

        // Map through the array and extract the 'repayment' property
        // const repaymentData = apiData.map(item => item.repayment);

        // Set your state with the extracted 'repayment' data
        //  setApiDataa(repaymentData);
        // setApiDataa(response.data.repayment)
        // console.log(response.data.repayment);
        console.log(typeof response.data.repayment)
        const repaymentArray = Object.values(response.data.repayment)

        // Now you can use map
        repaymentArray.map(item => item.repayment)

        // Set your state with the mapped data
        setApiDataa(repaymentArray)

        // Extract the keys from the object

        // const headerKeys = Object.keys(apiDataa);
        console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', apiData)
        console.log('Ammmmmmmmmm', response.data.amount)
        console.log('Ammmmmmmmmm', response.data.interest_rate)
        console.log('bbbbbbbbbbbbbfffffffffffffff', apiDataa)

        // Update the states with the fetched data
        setMonthlyPayment(response.data.installment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        setTotalLoanAmount(response.data.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        setInterestRate(response.data.interest_rate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        setNewAmount(response?.data?.amount)
        setTotalInterest(response.data.sum_interests.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))

        console.log('installment', response.data.installment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        console.log('total', response.data.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        console.log('interest_rate', response.data.interest_rate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        console.log('amount', response?.data?.amount)
        console.log('sum_interests', response.data.sum_interests.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
      } else {
        console.error('Request not successful:', response.status)
      }

      // console.log('Form submitted successfully', response.data)
    }
    catch (error) {
      if (error?.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flatMap(messages => messages);
        const errorMessage = errorMessages.join('and ');
        toast.error(errorMessage);
      } else {
        toast.error(error?.response?.data?.message || 'An error occurred');
      }
      console.error('Error processing Request', error);
      console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', error);
    }

    // catch (error) {
    //   toast.error(error?.response?.data?.message)
    //   console.error('Error processing Request', error)
    // }

    finally {
      setTimeout(() => {
        // Re-enable the button
        setButtonDisabled(false)
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
        <form onSubmit={calculateLoanDetails}>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='personal-info'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    label='Start Date'
                    placeholder='Loan amount'
                    value={amountt}
                    type='text' // Input type as number
                    inputProps={{ pattern: '[0-9]*' }}
                    onChange={handleAmount}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    label='End Date'
                    placeholder='Maturity'
                    inputProps={{ pattern: '[0-9]*' }}
                    type='text' // Input type as number
                    value={tenor}
                    onChange={handleTenor}

                   // onChange={e => setTenor(e.target.value)}
                   required
                  />
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
                      onClick={calculateLoanDetails}
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
