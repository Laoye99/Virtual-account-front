// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { makeStyles, Paper } from '@material-ui/core'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

//import LoanRequestTable from 'src/views/loan-request/loanRequestDetails'

import LoanRequestTable from 'src/pages/loan-request/components/loanRequestDetails'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'

// ** React Imports
import { forwardRef, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { BASE_URL } from 'src/configs/constanst'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

// ** Config
import authConfig from 'src/configs/auth'

// ** MUI Imports
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DropzoneArea } from 'material-ui-dropzone'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { ExcelRenderer } from 'react-excel-renderer'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import TableContainer from '@mui/material/TableContainer'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, deleteInvoice } from 'src/store/apps/invoice'
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* Set the width to 100% */

  & .MuiTableHead-root {
    background-color: #71ace0;
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2)
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  preview: {
    margin: theme.spacing(1),
    maxWidth: '100%',
    maxHeight: 200,
    objectFit: 'contain'
  },
  cardContent: {
    padding: theme.spacing(2),
    backgroundColor: '#f0f0f0', // Add a background color
    borderRadius: theme.spacing(1) // Add some border radius
  },
  fileName: {
    // Customize the styling for file names
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1) // Add some spacing between file names
  }
}))

const userStatusObj = {
  1: 'success',
  0: 'warning',
  2: 'secondary'
}

const defaultColumns = [
  {
    flex: 0.2,
    field: 'id',
    minWidth: 90,
    headerName: 'Loan ID',
    renderCell: ({ row }) => <LinkStyled href={`/loan-request/${row.id}`}>{`#${row.id}`}</LinkStyled>
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status == 0 ? 'In Progress' : row.status == 1 ? 'Approved' : 'Declined'}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>₦{row.amount}</Typography>
  },
  {
    flex: 0.3,
    minWidth: 125,
    field: 'created_at',
    headerName: 'Date',
    renderCell: ({ row }) => {
      const originalDate = new Date(row.created_at)
      const formattedDate = originalDate.toLocaleDateString()

      return <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
    }
  }
]

const LoanRequestPage = () => {
  // ** States
  const [value, setValue] = useState('personal-info')
  const [open, setOpen] = useState(false)
  const [months, setMonths] = useState('')
  const [garantor1, setGarantor1] = useState(null)
  const [garantor2, setGarantor2] = useState(null)
  const [amount, setAmount] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [showSecondGuarantor, setShowSecondGuarantor] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')
  const [staffData, setStaffData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [fetchCount, setFetchCount] = useState(0)
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [value2, setValue2] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 6 })
  const [loan_type, setConsent] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const classes = useStyles()
  const [fileData, setFileData] = useState([])
  const [fileDataa, setFileDataa] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [filePreview, setFilePreview] = useState(null)
  const [excelData, setExcelData] = useState([])

  //console.log('nowwwwwwwwwwwwwwwwwwwww', showUpload)

   const number =selectedFiles.length - 1
  console.log('lllsdfedre',number)

  const handleDialogToggle = () => setOpen(!open)
  console.log('Na my file data be this o o o', fileDataa);
  console.log('Checking my file data nanannanannananna', fileData);

  // Ensure fileDataa is always an array
  // const filesArray = Array.isArray(fileData) ? fileData : [fileData]
  // console.log('filesArray', filesArray)
  // console.log('filesArraytypeppppppppppppppppppppp', typeof filesArray)
  // console.log('comeeeeeeeeeeeeeeeeeeeeeeeee', typeof comment)

  const handleAmount = e => {
    const value = e.target.value

    // Ensure only numeric characters are accepted
    if (/^\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const dispatch = useDispatch()
  const store = useSelector(state => state.invoice)
  useEffect(() => {
    dispatch(
      fetchData({
        q: value2,
        status: statusValue
      })
    )
  }, [dispatch, statusValue, value2])
  const tableRef = useRef()
  const useStatus = store.data

  // Check if any item has status equal to 0
  const hasStatusZero = useStatus.some(item => item.status == 0)

  const handleExcelFile = file => {
    console.log('Excel file:', file.name)

    // Use the react-excel-renderer library to parse Excel file
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        // Handle the parsed Excel data
        setExcelData(resp.rows)

        // For demonstration purposes, let's set the preview to a success message
        setFilePreview('Excel file parsed successfully')

        //setOpenPreviewDialog(true);
        handleDialogToggle() // Open the dialog to display Excel data

        // console.log(typeof file);
        // const fileArray = Object.values(file);
        // // Now you can use map
        // fileArray.map(item => item.file)
        // // Set your state with the mapped data
        // setFileData(fileArray);
      }
    })
  }

  const handlePdfFile = file => {
    console.log('PDF file:', file.name)

    // Implement logic for PDF files
    // Example: Open the PDF in a new tab
    // window.open(URL.createObjectURL(file));
    // For demonstration purposes, let's just set the preview to the file name
    setFilePreview(file.name)

    //setOpenPreviewDialog(true);
    handleDialogToggle() // Open the dialog to display Excel data
  }

  const handleImageFile = file => {
    console.log('Image file:', file.name)

    // Implement logic for image files
    // Example: Display the image using an HTML img element
    // setFilePreview(URL.createObjectURL(file));
    setFilePreview(URL.createObjectURL(file))

    //setOpenPreviewDialog(true);
    handleDialogToggle() // Open the dialog to display Excel data
  }

  const handleFileChange = files => {
    //console.log('typeofvfssssssssssssssssssssssssssss', typeof files)
    setSelectedFiles(files)
    setFilePreview(null) // Reset the filePreview state
   // console.log('vvvvvvvvvvvvvvv', selectedFiles)
    setFileDataa(files)

    //setFileDataa(files.map(file => file.name));

    setFileData(files.map(file => file.name))

   console.log('Na my file data be this naananananna', fileData);
   console.log('Na my file data be this yyyyrrrrrrrrrrrrrrrrrrre', typeof fileData);
    files.forEach(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase()

    if (fileExtension === 'pdf') {
        // Handle PDF file logic
        console.log('PDF file:', file.name)

        // Implement logic for PDF files
        handlePdfFile(file)
      }
      else if (['docx'].includes(fileExtension)) {
        // Handle image file logic
        console.log('Image file:', file.name)

        // Implement logic for image files
        handleImageFile(file)
      }
       else {
        // Unsupported file type
        console.log('Unsupported file type:', file.name)
        alert('Please choose a valid file with the following extensions: pdf, docx')
        files.target.value = null
        setSelectedFiles('')
      }
    })
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Tooltip title='Delete Invoice'>
            <IconButton size='small' onClick={() => dispatch(deleteInvoice(row.id))}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip> */}
          <Tooltip title='View'>
            <IconButton size='small' component={Link} href={`/loan-request/${row.id}`}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          {/* <OptionsMenu
            iconButtonProps={{ size: 'small' }}
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon='tabler:download' fontSize='1.25rem' />
              },
              {
                text: 'Edit',
                href: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon='tabler:pencil' fontSize='1.25rem' />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='tabler:copy' fontSize='1.25rem' />
              }
            ]}
          /> */}
        </Box>
      )
    }
  ]

  const handleReload = () => {
    tableRef.current = <LoanRequestTable />
  }

 // console.log(amount, months, garantor1, garantor2, homeAddress)

  //console.log(months)

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    if (metaTag) {
      setCsrfToken(metaTag.getAttribute('content'))
    }
  }, [])

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  // Handle Select
  const handleSelectChange = event => {
    setMonths(event.target.value)

    // Check if the selected maturity is 6 months or more
    if (event.target.value > 6) {
      setShowSecondGuarantor(true)
    } else {
      setShowSecondGuarantor(false)
    }
  }

  const handleLoanTypeChange = e => {
    const selectedLoanType = e.target.value
    setConsent(selectedLoanType)

    // Update showUpload based on the selected loan type
    setShowUpload(selectedLoanType === 'collateralized')
  }

  // Generate the menu items for applied maturity from 1 to 24 months
  const maturityOptions = Array.from({ length: 24 }, (_, i) => i + 1)

  const handleSelectChangeGarantorOne = (event, newValue) => {
    setGarantor1(newValue)
  }

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
    setFetchCount(fetchCount + 1)
  }

  const handleSelectChangeGarantorTwo = (event, newValue) => {
    setGarantor2(newValue)
  }

  const handleInputChange2 = (event, newInputValue) => {
    setInputValue2(newInputValue)
  }

  const handleSubmit = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    //console.log(storedToken)

    // You can access form values from the state (values, months, etc.)
    const formData = {
      amount: amount,
      maturity: months,
      guarantor1: garantor1?.no_,
      guarantor2: garantor2?.no_,
      loan_type: loan_type,
      home_address: homeAddress,
      document: showUpload && fileDataa
    }

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

    //console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', formData)

    // const headers = {
    //   Authorization: `Bearer ${storedToken}`,
    //   'content-Type': 'application/json'
    // }

    // console.log(headers)

    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/autoloan/loan/loan-request`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      // Handle the response as needed
      toast.success(response.data.message)

     // console.log('Form submitted successfully', response.data)

      // Clear user inputs after successful submission
      setAmount('')
      setMonths('')
      setGarantor1(null)
      setGarantor2(null)
      setHomeAddress('')

      // Reload the page
      handleReload()
      setValue2(store)
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.message)
      console.error('Error submitting form', error)
    } finally {
      setTimeout(() => {
        // Re-enable the button
        setButtonDisabled(false)
      }, 2000) // Adjust the time (in milliseconds) to your desired delay
    }
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(storedToken)

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

          setStaffData(dataStaff)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchData() // Invoke the function to fetch data
    }
  }, [fetchCount])


  // Function to handle file deletion
  const handleDeleteFile = (index) => {
    const updatedFiles = [...fileDataa];
    updatedFiles.splice(index, 1); // Remove the file at the specified index
    setFileData(updatedFiles); // Update the state
    setFileDataa(updatedFiles); // Update the setFileDataa state as well, case closed
    setSelectedFiles(updatedFiles);
  };


  return (
    <DatePickerWrapper>
      {hasStatusZero ? null : (
        <Grid container spacing={6} sx={{ marginBottom: '40px' }}>
          <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
            <Typography variant='h5'>LOAN REQUEST (to be filled in by applicant)</Typography>
          </Grid>
          <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
            <Card>
              <TabContext value={value}>
                <TabList
                  variant='scrollable'
                  scrollButtons={false}
                  onChange={handleTabsChange}
                  sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
                >
                  <Tab value='personal-info' label={<span style={{ color: '#71ace0' }}>Loan Request Form</span>} />
                </TabList>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <TabPanel sx={{ p: 0 }} value='personal-info'>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>

                          <CustomTextField
                            fullWidth
                            label='Applied amount'
                            placeholder='Applied amount'
                            value={amount}
                            onChange={handleAmount}
                            type='text' // Input type as number
                            inputProps={{ pattern: '[0-9]*' }} // Regular expression pattern
                          />
                          {/* <CustomTextField
                            fullWidth
                            label='Applied amount'
                            placeholder='Applied amount'
                            inputProps={{ pattern: '[0-9]*' }}
                            //type="number"
                            value={amount}
                            onChange={e => {
                              const newValue = parseInt(e.target.value);
                              if (!isNaN(newValue) && newValue >= 1) {
                                setAmount(newValue);
                              }
                            }}
                          /> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            select
                            fullWidth
                            defaultValue=''
                            label='Applied maturity'
                            id='form-layouts-tabs-multiple-select'
                            SelectProps={{
                              multiple: false,
                              value: months,
                              onChange: handleSelectChange
                            }}
                          >
                            {maturityOptions.map(month => (
                              <MenuItem key={month} value={month}>
                                {`${month} month${month !== 1 ? 's' : ''}`}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            placeholder='Select First Guarator'
                            id='form-layouts-tabs-select'
                            options={staffData}
                            getOptionLabel={option => option.full_name}
                            getOptionValue={option => option.no_}
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            value={garantor1}
                            onChange={handleSelectChangeGarantorOne}
                            renderInput={params => (
                              <TextField {...params} label='Type First Guarantor Name Here' fullWidth />
                            )}
                            isOptionEqualToValue={(option, value) => option.no_ === value.no_}
                            filterOptions={(options, state) => {
                              if (state.inputValue === '') {
                                return options
                              }

                              return options.filter(option =>
                                option.full_name.toLowerCase().includes(state.inputValue.toLowerCase())
                              )
                            }}
                          />
                        </Grid>
                        {showSecondGuarantor && (
                          <Grid item xs={12} sm={6}>
                            <Autocomplete
                              placeholder='Select Second Guarator'
                              id='form-layouts-tabs-select'
                              options={staffData}
                              getOptionLabel={option => option.full_name}
                              getOptionValue={option => option.no_}
                              inputValue={inputValue2}
                              onInputChange={handleInputChange2}
                              value={garantor2}
                              onChange={handleSelectChangeGarantorTwo}
                              renderInput={params => (
                                <TextField {...params} label='Type Second Guarantor Name Here' fullWidth />
                              )}
                              isOptionEqualToValue={(option, value) => option.no_ === value.no_}
                              filterOptions={(options, state) => {
                                if (state.inputValue === '') {
                                  return options
                                }

                                return options.filter(option =>
                                  option.full_name.toLowerCase().includes(state.inputValue.toLowerCase())
                                )
                              }}
                            />
                          </Grid>
                        )}

                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            select
                            fullWidth
                            defaultValue=''
                            label='Loan Type'
                            placeholder='select loan type'
                            id='form-layouts-tabs-multiple-select'
                            SelectProps={{
                              multiple: false,
                              value: loan_type,
                              onChange: handleLoanTypeChange
                            }}
                          >
                            <MenuItem value='non-collateralized'>non-collateralized</MenuItem>
                            <MenuItem value='collateralized'>collateralized</MenuItem>
                          </CustomTextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            fullWidth
                            label='Home Address'
                            placeholder='28 Akintoye Shogunle, Ikeja, Lagos'
                            value={homeAddress}
                            onChange={e => setHomeAddress(e.target.value)}
                          />
                        </Grid>
                        {showUpload && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <CardActions>
                              <fieldset style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <legend>Attached Document</legend>
                                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <CardContent>
                                    <Paper elevation={3} className={classes.root}>
                                      <CloudUploadIcon className={classes.icon} color='primary' />
                                      <Typography variant='h6' color='primary'>
                                        Upload Files
                                      </Typography>
                                      <div>
                                        <DropzoneArea

                                          // acceptedFiles={['image/*', '.pdf', '.xls', '.xlsx']}
                                          acceptedFiles={[ '.pdf', '.docx']}
                                          onChange={handleFileChange}
                                          showAlerts={false}
                                          dropzoneText="Drag and drop  PDFs, docx files here or Click to Upload, File Shouldn't be more than 1MB"
                                          showPreviewsInDropzone={false}
                                          showPreviews={false}
                                          filesLimit={10} // Set your preferred limit
                                        />
                                      </div>

                                      <Dialog fullWidth maxWidth='md' onClose={handleDialogToggle} open={open}>
                                        <DialogTitle>File Preview: {filePreview}</DialogTitle>
                                        <Divider />
                                        <DialogContent>
                                          {filePreview && (
                                            <div>
                                              <Typography>Preview:</Typography>
                                              {/* Render the file preview based on its type */}
                                              {selectedFiles[0]?.type === 'application/pdf' ? (
                                                <iframe
                                                  title='PDF Preview'
                                                  src={URL?.createObjectURL(selectedFiles[number])}
                                                  width='100%'
                                                  height='500px'
                                                  style={{ border: 'none' }}
                                                />
                                              ) : (
                                                <img
                                                  src={filePreview}
                                                  alt='File Preview'
                                                  style={{ maxWidth: '100%', maxHeight: '400px' }}
                                                />
                                              )}
                                            </div>
                                          )}
                                        </DialogContent>
                                      </Dialog>
                                    </Paper>
                                  </CardContent>
                                  {/* Display the selected file names in CardContext */}
                                  <CardContent className={classes.cardContent}>
                                    <Typography variant='body1' color='textSecondary'>
                                      Selected Files:
                                    </Typography>
                                    {selectedFiles.map((file, index) => (
                                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="body2" color="textSecondary" className={classes.fileName}>
                                          {file.name}
                                        </Typography>
                                        {/* Delete icon */}
                                        <IconButton onClick={() => handleDeleteFile(index)} color="error">
                                          <Icon icon='tabler:trash' />
                                        </IconButton>
                                      </div>
                                    ))}
                                  </CardContent>
                                </Box>
                              </fieldset>
                            </CardActions>
                          </div>
                        )}
                      </Grid>
                    </TabPanel>
                  </CardContent>
                  <Divider sx={{ m: '0 !important' }} />
                  <CardActions>
                    <Button
                      type='submit'
                      sx={{ mr: 2, backgroundColor: '#71ace0' }}
                      variant='contained'
                      disabled={isButtonDisabled}
                    >
                      {isButtonDisabled ? 'Processing...' : 'Submit'}
                    </Button>
                    <Button type='reset' variant='tonal' color='secondary' style={{ display: 'none' }}>
                      Reset
                    </Button>
                  </CardActions>
                </form>
              </TabContext>
            </Card>
          </Grid>
        </Grid>
      )}

      {value2 == '' ? (
        <LoanRequestTable />
      ) : (
        <Card>
          <CardContent
            sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Button
              component={Link}
              variant='contained'
              href='/loan-request'
              startIcon={<Icon icon='tabler:plus' />}
              sx={{
                backgroundColor: '#71ace0',
                '&:hover': {
                  backgroundColor: '#4f7ea9' // Change the background color on hover
                }
              }}
            >
              New Loan Request
            </Button>
            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* <CustomTextField value={value} placeholder='Search Loan' onChange={e => setValue(e.target.value)} /> */}
              <CustomTextField
                select
                sx={{ pr: 4, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                SelectProps={{
                  displayEmpty: true,
                  value: statusValue,
                  onChange: e => setStatusValue(e.target.value)
                }}
              >
                <MenuItem value=''>Select Status</MenuItem>
                <MenuItem value='downloaded'>In-Progress</MenuItem>
                <MenuItem value='downloaded'>Approved</MenuItem>
                <MenuItem value='downloaded'>Declined</MenuItem>
              </CustomTextField>
            </Box>
          </CardContent>
          <DataGrid
            autoHeight
            rowHeight={54}
            rows={store.data}
            columns={columns}
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            pageSizeOptions={[6, 10, 25, 50]}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      )}
    </DatePickerWrapper>
  )
}

LoanRequestPage.acl = {
  action: 'user',
  subject: 'user'
}

export default LoanRequestPage
