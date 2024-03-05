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

const FormLayoutsGuarantor = loanId => {
  const guarantor = loanId.loanId
  console.log(guarantor)

  // ** States
  const [open, setOpen] = useState(false)
  const handleDialogToggle = () => setOpen(!open)
  const [isToastShown, setIsToastShown] = useState(false)
  const [apiData, setApiData] = useState([])

  const [storedToken, setStoredToken] = useState('your-auth-token') // Replace with your actual auth token
  const [value, setValue] = useState('personal-info')
  const [date, setDate] = useState(null)
  const [months, setmonths] = useState('')
  const [garantor1, setGarantor1] = useState(null)
  const [apiDataa, setApiDataa] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [value2, setValue2] = useState('1')
  const [guarantor1Info, setGuarantor1Info] = useState([])
  const [guarantor2Info, setGuarantor2Info] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [staffData, setStaffData] = useState([])
  const [guarantorInfo, setGuarantorInfo] = useState(null)

  const [isButtonDisabled, setButtonDisabled] = useState(false)

  // Create a state variable to track form submission
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  console.log('nnnnnnnnnnnnnnnnnnnnnnn', apiData)

  // ** Hooks
  const router = useRouter()

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const fetchData = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/autoloan/loan/view-loan/${guarantor}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      setApiData(response.data.data) // Update the state with the fetched data

      setGuarantor1Info(response.data.data[0]?.guarantors[0])

      setGuarantor2Info(response.data.data[0]?.guarantors[1])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  const handleSubmit2 = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    // You can access form values from the state (values, months, etc.)
    const formData = {
      loan_id: guarantor,
      guarantor_id: garantor1?.no_
    }

    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/autoloan/loan/guarantor`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      // Handle the response as needed
      toast.success(response.data.message)
      console.log('Form submitted successfully', response.data)
      fetchData()
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setButtonDisabled(false)
    }
  }

  useEffect(() => {
    fetchData() // Invoke the function to fetch data
  }, []) // Empty dependency array ensures this effect runs once after the component is mounted

  const handleSubmit = async e => {
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/autoloan/loan/submit/${guarantor}`, null, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      toast.success(response.data.message)
      console.log('Form submitted successfully', response.data)

      // Wait for 3 seconds before reloading the window
      setTimeout(() => {
        window.location.reload()
      }, 3000) // 3000 milliseconds = 3 seconds
    } catch (error) {
      if ((error.response.status = 403)) {
        toast.error('Please contact your guarantor to fill out the form.')
      } else toast.error(error.response.data.message)
      console.error('Error submitting form', error.response.status)
    }

    //  finally {
    //   setTimeout(() => {
    //     setButtonDisabled(false)
    //   }, 2000)
    // }
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    // console.log(storedToken)
    // console.log(guarantor)

    const fetchDataa = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/autoloan/loan/tracker/${guarantor}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'content-Type': 'application/json'
          }
        })
        setApiDataa(response.data) // Update the state with the fetched data
        // console.log('hhhhhhhhh')
        // console.log(response.data)

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataa() // Invoke the function to fetch data
  }, []) // Empty dependency array ensures this effect runs once after the component is mounted

  const handleDelete = async id => {
    setButtonDisabled(true)
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    //console.log(storedToken)

    try {
      // Make an HTTP POST request to your endpoint
      await axios.delete(`${BASE_URL}/autoloan/loan/guarantor/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      toast.success('Request Deleted Successfully')

      fetchData()
    } catch (error) {
      toast.error('Error Deleted Request')
      console.error('Error Deleted Request', error)
    } finally {
      setButtonDisabled(false)
    }
  }

  const handleSelectChangeGarantorOne = (event, newValue) => {
    setGarantor1(newValue)
  }

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
    setFetchCount(fetchCount + 1)
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

   // console.log(storedToken)

    if (fetchCount === 3) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/helper/users`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'content-Type': 'application/json'
            }
          })

          const data = response.data

          const dataStaff = Object.values(data)

         // console.log(dataStaff)

          setStaffData(dataStaff)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData() // Invoke the function to fetch data
    }
  }, [fetchCount])

  return submitLoading ? (
    <Skeleton height={300} count={10} baseColor='#f4f4f4' />
  ) : (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#71ace0' }}>Loan Details</span>} />
        </TabList>

        <fieldset sx={{ marginBottom: '1200px' }}>
          <legend>Loan Details</legend>

          {/* <Typography sx={{ mb: 6, color: 'text.secondary' }}>
           Loan Request Details.
          </Typography> */}

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
              {apiData[0] ? ( // Check if data property exists
                <TableBody key={apiData.id}>
                  <TableRow>
                    <TableCell>Applicant ID:</TableCell>
                    <TableCell>{apiData[0].staff_id}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Applied Maturity:</TableCell>
                    <TableCell>{apiData[0].maturity} Months</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Loan Amount:</TableCell>
                    <TableCell>
                      {parseFloat(apiData[0].amount).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'NGN'
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status:</TableCell>
                    <TableCell>
                      {apiData[0]?.status == 0 ? (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='In Progress'
                          color='warning'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ) : apiData[0]?.status == 1 ? (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Approved'
                          color='success'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ) : apiData[0]?.status == 2 ? (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Declined'
                          color='secondary'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ) : (
                        <span>Unknown</span>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>First Guarantor:</TableCell>
                    {apiData[0].guarantor1 == '' ? (
                      <TableCell>
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='add new guarantor'
                          color='primary'
                          sx={{ textTransform: 'capitalize' }}
                          style={{ cursor: 'pointer' }}
                          onClick={handleDialogToggle}
                        />
                      </TableCell>
                    ) : (
                      <TableCell>{apiData[0].guarantor1}</TableCell>
                    )}
                  </TableRow>

                  {apiData[0].maturity > 6 && (
                    <TableRow>
                      <TableCell>Second Guarantor:</TableCell>
                      {apiData[0].guarantor2 == '' ? (
                        <TableCell>
                          <CustomChip
                            rounded
                            skin='light'
                            size='small'
                            label='add new guarantor'
                            color='primary'
                            sx={{ textTransform: 'capitalize' }}
                            style={{ cursor: 'pointer' }}
                            onClick={handleDialogToggle}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>{apiData[0].guarantor2}</TableCell>
                      )}
                    </TableRow>
                  )}

                  <TableRow>
                    <TableCell>Created At:</TableCell>
                    <TableCell>
                      {apiData[0].created_at ? new Date(apiData[0].created_at).toLocaleString() : ''}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Updated At:</TableCell>
                    <TableCell>
                      {apiData[0].updated_at ? new Date(apiData[0].updated_at).toLocaleString() : ''}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : null}
            </Table>

            <Grid container spacing={6}>
              <Grid item xs={12} sx={{ pb: 4, mx: 5, pt: theme => `${theme.spacing(12.5)} !important` }}>
                <Typography variant='h4'>Guarantor Details</Typography>
              </Grid>
              {guarantor1Info && (
                <Grid item xs={12} md={6}>
                  <Card>
                    <TabContext value={value2}>
                      <TabList aria-label='card navigation example' sx={{ '& .MuiTab-root': { py: 3.5 } }}>
                        <Tab value='1' label={<span style={{ color: '#71ace0' }}>Guarantor One</span>} />
                      </TabList>
                      <CardContent>
                        <TabPanel value='1' sx={{ p: 0 }}>
                          <Typography variant='h4' sx={{ mb: 2 }}>
                            {guarantor1Info?.guarantor_id}
                          </Typography>
                          <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                              {guarantor1Info?.guarantor?.full_name}
                            </Typography>
                            {guarantor1Info?.status == '0' ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label='pending'
                                color='warning'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : guarantor1Info?.status == '1' ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label='Approved'
                                color='success'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : guarantor1Info?.status == '2' ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label='Declined'
                                color='secondary'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : (
                              <span>Unknown</span>
                            )}
                          </Box>

                          <Button
                            type='submit'
                            sx={{
                              mr: 2,
                              backgroundColor: '#BB2525',
                              '&:hover': {
                                backgroundColor: '#BB2525'
                              }
                            }}
                            variant='contained'
                            disabled={guarantor1Info?.status == '1' ? true : isButtonDisabled}
                            onClick={e => {
                              e.preventDefault() // Add this line
                              if (window.confirm('Are you sure you want to delete this guarantor?')) {
                                handleDelete(guarantor1Info.id)
                              } else {
                                // Handle the 'Cancel' case if needed
                              }
                            }}
                          >
                            {isButtonDisabled ? 'Processing...' : 'Delete Guarantor'}
                          </Button>
                        </TabPanel>
                      </CardContent>
                    </TabContext>
                  </Card>
                </Grid>
              )}

              {guarantor2Info && (
                <Grid item xs={12} md={6}>
                  <Card>
                    <TabContext value={value2}>
                      <TabList aria-label='card navigation example' sx={{ '& .MuiTab-root': { py: 3.5 } }}>
                        <Tab value='1' label={<span style={{ color: '#71ace0' }}>Guarantor Two</span>} />
                      </TabList>
                      <CardContent>
                        <TabPanel value='1' sx={{ p: 0 }}>
                          <Typography variant='h4' sx={{ mb: 2 }}>
                            {guarantor2Info?.guarantor_id}
                          </Typography>
                          <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                              {guarantor2Info?.guarantor?.full_name}
                            </Typography>
                            {guarantor2Info?.status == '0' ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label='pending'
                                color='warning'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : guarantor2Info?.status == '1' ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label='Approved'
                                color='success'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : guarantor2Info?.status == '2' ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label='Declined'
                                color='secondary'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : (
                              <span>Unknown</span>
                            )}
                          </Box>

                          <Button
                            type='submit'
                            sx={{
                              mr: 2,
                              backgroundColor: '#BB2525',
                              '&:hover': {
                                backgroundColor: '#BB2525'
                              }
                            }}
                            variant='contained'
                            disabled={guarantor2Info?.status == '1' ? true : isButtonDisabled}
                            onClick={e => {
                              e.preventDefault() // Add this line
                              if (window.confirm('Are you sure you want to delete this guarantor?')) {
                                handleDelete(guarantor2Info.id) // Pass the event object
                              } else {
                                // Handle the 'Cancel' case if needed
                              }
                            }}
                          >
                            {isButtonDisabled ? 'Processing...' : 'Delete Guarantor'}
                          </Button>
                        </TabPanel>
                      </CardContent>
                    </TabContext>
                  </Card>
                </Grid>
              )}
            </Grid>
          </TableContainer>
        </fieldset>
        <Divider sx={{ m: '0 !important' }} />

        <Divider sx={{ m: '0 !important' }} />
        {/* {apiDataa?.approved == 1 ? ( */}
        <Accordion>
          <AccordionSummary sx={{ backgroundColor: '#71ace0', color: 'white' }}>
            <Typography style={{ color: '#fff' }}>Loan Traking</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Staff Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                {apiDataa.map((item, index) => (
                  <TableBody key={index}>
                    <TableRow>
                      <TableCell>{item.approver_name}</TableCell>
                      <TableCell>
                        {item.approved == 0
                          ? 'In Progress'
                          : item.approved == 1
                          ? 'Approved'
                          : item.approved == 2
                          ? 'Declined'
                          : 'Unknown'}
                      </TableCell>
                      <TableCell>{item.updated_at ? new Date(item.updated_at).toLocaleString() : ''}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: '#71ace0',  color: '#040D12'}}>
                      <TableCell colSpan={3} sx={{ borderBottom: 'none' }}>
                        <details>
                        <summary sx={{ cursor: 'pointer', outline: 'none', textDecoration: 'underline', color: 'black', fontWeight: 'bold' }}>
                              {item.approver_name}'s Comment
                            </summary>
                        <p sx={{ margin: '0' }}>{item.comment}</p>
                        </details>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* ) : null} */}
      </TabContext>
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
            Add New Guarantor
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
            <Autocomplete
              placeholder='Select new Guarator'
              id='form-layouts-tabs-select'
              options={staffData}
              getOptionLabel={option => option.full_name}
              getOptionValue={option => option.no_}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              value={garantor1}
              onChange={handleSelectChangeGarantorOne}
              renderInput={params => <TextField {...params} label='Type Guarantor Name Here' fullWidth />}
              isOptionEqualToValue={(option, value) => option.no_ === value.no_}
              filterOptions={(options, state) => {
                if (state.inputValue === '') {
                  return options
                }

                return options.filter(option => option.full_name.toLowerCase().includes(state.inputValue.toLowerCase()))
              }}
              style={{ width: '100%' }}
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
                onClick={handleSubmit2}
              >
                Add Guarantor
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

FormLayoutsGuarantor.acl = {
  action: 'user',
  subject: 'user'
}

export default FormLayoutsGuarantor
