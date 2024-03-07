// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// ** Axios
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Config
import authConfig from 'src/configs/auth'
import withSessionExpiration from 'src/pages/settings/withSessionExpiration';

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
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
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
//import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomInput = forwardRef((props, ref) => {
  return (
    <CustomTextField fullWidth {...props} inputRef={ref} label='Date of Birth (e.g 2000-01-31)' autoComplete='off' />
  )
})

const FormLayoutsGuarantor = guarantorId => {
  const guarantor = guarantorId.guarantorId
  console.log(guarantor)

  // ** States
  const [isToastShown, setIsToastShown] = useState(false)
  const [apiData, setApiData] = useState([])
  const [storedToken, setStoredToken] = useState('your-auth-token') // Replace with your actual auth token
  const [value, setValue] = useState('personal-info')
  const [date, setDate] = useState(null)
  const [months, setmonths] = useState('')

  // const [guar_anyone, setGarantor1] = useState('')
  // const [running_lon, setGarantor2] = useState('')
  const [guar_anyone, setGuarantee] = useState('')
  const [running_lon, setRunningloan] = useState('')

  // const [amount, setAmount] = useState('')
  const [staffid, setStaffid] = useState('')
  const [staffname, setStaffname] = useState('')
  const [branch, setBranch] = useState('')
  const [dob, setDob] = useState('')
  const [isValidDate, setIsValidDate] = useState(true)
  const [tel_no, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [jobtitle, setJobtitle] = useState('')
  const [rel_with_app, setRel] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [guar_consent, setConsent] = useState('')
  const [isButtonDisabled, setButtonDisabled] = useState(false)

   //  console.log('badggggggeeejuudddddddddddddddd',apiData)
    // console.log('sttttttttttttttatttttsssssssssss',apiData?.data?.status)


  //console.log('my doobbbbbbbb',dob)
  const handleTelNoChange = e => {
    const value = e.target.value

    // Ensure only numeric characters are accepted
    if (/^\d*$/.test(value)) {
      setTel(value)
    }
  }

  const formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const handleDobChange = e => {
    // setDob(date);  // set the raw date to dob
    // setDate(date); // set the date object to the date state
    //console.log(formatDate(e))

    // const value = e.target.value
    // setDob('2023-03-03')
    setDob(formatDate(e))

    // console.log('gggg',dob)

    //Check if the input matches the 'yyyy-mm-dd' format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    if (dateRegex.test(e)) {
      setIsValidDate(true)
    } else {
      setIsValidDate(false)
    }
  }



  const handleEmailChange = e => {
    const value = e.target.value
    setEmail(value)

    // Regular expression for a simple email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if (emailRegex.test(value)) {
      setIsValidEmail(true)
    } else {
      setIsValidEmail(false)
    }
  }

  // Create a state variable to track form submission
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  // Create a state variable to track form submission
  const [isFormDataValid, setIsFormDataValid] = useState(false)

  // ** Hooks
  const router = useRouter()

  //const [showSecondGuarantor, setShowSecondGuarantor] = useState(false)

 // console.log(guar_anyone, running_lon, dob, tel_no, email, rel_with_app, homeAddress)

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSubmit = async e => {
    // Disable the button
    setButtonDisabled(true)

    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    //console.log(storedToken)

    // You can access form values from the state (values, months, etc.)
    const formData = {
      home_address: homeAddress,
      tel_no: tel_no,
      dob: dob,
      email: email,
      rel_with_app: rel_with_app,
      form_of_id: rel_with_app,
      running_lon: running_lon,
      guar_anyone: guar_anyone,
      guar_consent: guar_consent,
      status: guar_consent
    }

    //console.log(formData)

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
      const response = await axios.put(`${BASE_URL}/autoloan/loan/guarantor/${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      if (response.status === 200 && !isToastShown) {
        toast.success(response.data.message.charAt(0).toUpperCase() + response.data.message.slice(1));

       // toast.success(response.data.message)
        setIsToastShown(true)

        // Redirect to another page after successful submission
        router.push('/guarantor')
      } else {
        console.error('Form submission failed with status:', response.status)
      }

      console.log('Form submitted successfully', response.data)
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setTimeout(() => {
        // Re-enable the button
        setButtonDisabled(false)
      }, 2000) // Adjust the time (in milliseconds) to your desired delay
    }
  }

  const handleDecline = async e => {
    if (e) {
      e.preventDefault()
    }
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    //console.log(storedToken)

    const formData = {
      id: guarantor,
      status: 2
    }

   // console.log(formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.put(`${BASE_URL}/autoloan/loan/guarantor/${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      toast.success('Request Declined Successfully')

      // console.log('Request Declined successfully', response.data)
      router.push('/guarantor')
    } catch (error) {
      toast.error('Error Declining Request', error)
      console.error('Error Declining Request', error)
    }
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log('storedToken statussssssss',storedToken)
    if (storedToken == '' || storedToken == 'null') {

      toast.error('Session Expired')

     // setIsToastShown(true)

      // Redirect to login page after session expiration
      router.push('/login')
    } else {}

    //console.log(storedToken)

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/autoloan/loan/guarantor/${guarantor}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'content-Type': 'application/json'
          }
        })

       // console.log(response.data)
        setApiData(response.data) // Update the state with the fetched data
        // Set the staff ID field with the fetched data
        if (response.data.data) {
          setStaffid(response.data?.data?.guarantor?.no_)
          setStaffname(response.data?.data?.guarantor?.full_name)
          setBranch(response.data?.data?.guarantor?.branch_name)
          setJobtitle(response.data?.data?.guarantor?.job_title)
        }

        // console.log('record fetched', response.data.data.loan)
        // console.log(apiData.loan_owner)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Invoke the function to fetch data
  }, []) // Empty dependency array ensures this effect runs once after the component is mounted

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Loan Details</span>} />
        </TabList>

        <fieldset sx={{ marginBottom: '1200px' }}>
          <legend>Loan Details</legend>

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
              {apiData.data ? ( // Check if data property exists
                <TableBody key={apiData.data.id}>
                  <TableRow>
                    <TableCell>Applicant ID:</TableCell>
                    <TableCell>{apiData.data?.loan?.loan_owner?.no_}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Name of Applicant:</TableCell>
                    <TableCell>{apiData.data?.loan?.loan_owner?.full_name}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Requestor Branch:</TableCell>
                    <TableCell>{apiData.data?.loan?.loan_owner?.branch_name}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Requestor Job Title:</TableCell>
                    <TableCell>{apiData.data?.loan?.loan_owner?.job_title}</TableCell>
                    {/* Add more TableCell components for additional fields */}
                  </TableRow>

                  <TableRow>
                    <TableCell>Applied Maturity:</TableCell>
                    <TableCell>{apiData.data?.loan?.maturity} Month(s)</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Loan Amount:</TableCell>
                    <TableCell>
                      {parseFloat(apiData.data?.loan?.amount).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'NGN'
                      })}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Loan Type:</TableCell>
                    <TableCell>{apiData.data?.loan?.loan_type}</TableCell>
                  </TableRow>

                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
        </fieldset>
        {apiData?.data?.status == 0 ? (
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Guarantor's Form</span>} />
        </TabList>
         ): null}
          {apiData?.data?.status == 0 ? (
        <fieldset>
          <legend>Guarantor's Form</legend>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <TabPanel sx={{ p: 0 }} value='personal-info'>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Staff ID'
                      placeholder='Staff ID'
                      value={staffid}
                      onChange={e => setStaffid(e.target.value)}
                      InputProps={{
                        readOnly: true // Add the readOnly attribute to the input element
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <CustomTextField
                      fullWidth
                      label='Staff Name'
                      placeholder=''
                      value={staffname}
                      onChange={e => setStaffname(e.target.value)}
                      InputProps={{
                        readOnly: true // Add the readOnly attribute to the input element
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Job Title'
                      placeholder=''
                      value={jobtitle}
                      onChange={e => setJobtitle(e.target.value)}
                      InputProps={{
                        readOnly: true // Add the readOnly attribute to the input element
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Branch'
                      placeholder=''
                      value={branch}
                      onChange={e => setBranch(e.target.value)}
                      InputProps={{
                        readOnly: true // Add the readOnly attribute to the input element
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ mb: 5 }}>
                      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label='Date of Birth (e.g 2000-01-31)'
                          customInput={<CustomInput />}
                          selected={date}
                          onChange={date => handleDobChange(date)}
                          placeholder='Date of Birth'
                          helperText={!isValidDate ? 'Invalid date format (yyyy-mm-dd)' : ''}
                          value={dob}
                          maxDate={dayjs()}

                        // maxDate={new Date()} // Set maxDate to disable future dates
                        />
                      </LocalizationProvider>



                      </DatePickerWrapper>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Telephone Number'
                      placeholder='08022445577'
                      value={tel_no}
                      onChange={handleTelNoChange}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }} // Regular expression pattern
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Email Address'
                      placeholder='abc@ab-mfbnigeria.com'
                      value={email}
                      onChange={handleEmailChange}
                      error={!isValidEmail}
                      helperText={!isValidEmail ? 'Invalid email format' : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Have Running Loan?'
                      placeholder='Have Running Loan?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: running_lon,
                        onChange: e => setRunningloan(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Guaranteeing Any Loan?'
                      placeholder='Guaranteeing Any Loan?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: guar_anyone,
                        onChange: e => setGuarantee(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='Relationship with Applicant'
                      placeholder='friend'
                      value={rel_with_app}
                      onChange={e => setRel(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <CustomTextField
                      fullWidth
                      label='Home Address'
                      placeholder='Ikeja, Lagos'
                      value={homeAddress}
                      onChange={e => setHomeAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label="Guarantor's consent?"
                      placeholder="Guarantor's consent?"
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: guar_consent,
                        onChange: e => setConsent(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                </Grid>
              </TabPanel>
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <CardActions>
              <Button
                type='submit'
                sx={{ mr: 2, backgroundColor: '#f50606' }}
                variant='contained'
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? 'Processing...' : 'Submit'}
              </Button>

              <Button
                type='submit'
                sx={{ mr: 2, backgroundColor: '#BB2525' }}
                variant='contained'
                disabled={isButtonDisabled}
                onClick={e => {
                  e.preventDefault() // Add this line
                  if (window.confirm('Are you sure you want to decline this request?')) {
                    handleDecline(e) // Pass the event object
                  } else {
                    // Handle the 'Cancel' case if needed
                  }
                }}
              >
                {isButtonDisabled ? 'Processing...' : 'Decline'}
              </Button>
            </CardActions>
          </form>
        </fieldset>
        ): null}
      </TabContext>
    </Card>
  )
}

export default FormLayoutsGuarantor;
