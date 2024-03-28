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
    minWidth: 60,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='View'>
          <IconButton size='small' component={Link} href={`/n/${row.sessionid}`}>
            <Icon icon='tabler:eye' />
          </IconButton>
        </Tooltip>
      </Box>
    )
  },

  // {
  //   flex: 0.1,
  //   field: 'sessionid',
  //   minWidth: 60,
  //   headerName: 'sessionid',
  //   renderCell: ({ row }) => <LinkStyled href={`/transaction/${row.sessionid}`}>{`#${row.sessionid}`}</LinkStyled>
  // },

  {
    flex: 0.1,
    field: 'originatoraccountnumber',
    minWidth: 60,
    headerName: 'originatoraccountnumber',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.originatoraccountnumber || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'beneficiaryaccountnumber',
    minWidth: 120,
    headerName: 'beneficiaryaccountnumber',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["beneficiaryaccountnumber"] || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'originatoraccountname',
    minWidth: 120,
    headerName: 'originatoraccountname',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.originatoraccountname || ""}</Typography>
  },

  {
    flex: 0.1,
    field: 'amount',
    minWidth: 60,
    headerName: 'amount',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.amount || 0}</Typography>
  },
  {
    flex: 0.1,
    field: 'c24_rsp_date',
    minWidth: 60,
    headerName: 'c24_rsp_date',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["c24_rsp_date"] || 0}</Typography>
  },

  {
    flex: 0.1,
    field: 'responsedate',
    minWidth: 120,
    headerName: 'responsedate',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row["responsedate"] || 0}</Typography>
  },

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
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 10, totalCount: 0 });
  const [tenor, setTenor] = useState('')
  const [loantype, setLoanType] = useState('')
  const [amountt, setAmount] = useState('')
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)



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

  const handlePageChange = (newPage) => {
    setPaginationModel((prevPaginationModel) => ({
      ...prevPaginationModel,
      page: newPage,
    }));

    // Fetch data from backend with the new page number
    setPage(newPage);
  };





  /**
   * The function `calculateLoanDetails` is an asynchronous function that makes an HTTP POST request to a
   * specified endpoint with form data, retrieves the response data, and updates the state with the
   * fetched data.
   */
  const onSubmit = async (pageNumber) => {
    // Disable the button
    setButtonDisabled(true)

    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.get(`${BASE_URL}/switch/transactions?switch-type=${loantype}&start-date=${formattedStartDate}&end-date=${formattedEndDate}&page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      console.log(response.data.data.transactions)
      setData(response.data.data.transactions)
      setTotalPage(parseInt(response.data.data["total-pages"]))
      toast.success(response.data.message)
      window.localStorage.setItem('loanType', loantype)
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


  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
      onSubmit(page + 1); // Fetch data for the next page
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      onSubmit(page - 1); // Fetch data for the previous page
    }
  };

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
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Transactions</span>} />

        </TabList>
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

<Grid item xs={12} sm={3}>
    <CustomTextField
      select
      fullWidth
      defaultValue=''
      label='Switch type'
      placeholder='Loan Type?'
      id='form-layouts-tabs-multiple-select'
      SelectProps={{
        multiple: false,
        value: loantype,
        onChange: e => setLoanType(e.target.value)
      }}
      required
    >
    <MenuItem value='up_outflow'>up_outflow</MenuItem>
      <MenuItem value='nip_inflow'>nip_inflow</MenuItem>
      <MenuItem value='nip_outflow'>nip_outflow</MenuItem>
    </CustomTextField>
  </Grid>
                <Grid item xs={12} sm={3}>
                  <CardActions sx={{ mb: 2, mt: 2 }}>
                    <Button
                      type='submit'
                      sx={{ mr: 2, backgroundColor: '#f50606',  '&:hover': {
                        backgroundColor: '#f50606'
                      } }}
                      variant='contained'
                      onClick={() => onSubmit(page)}
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


        <DataGrid
        getRowId={data.sessionid}
          autoHeight
          rows={newData}
          rowHeight={62}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />

        {/* Pagination Buttons */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
  <button
    onClick={handlePrevPage}
    disabled={page === 1}
    style={{
      padding: '8px 12px',
      marginRight: '5px',
      backgroundColor: '#f2f2f2',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: page === 1 ? 'not-allowed' : 'pointer',
      color: page === 1 ? '#999' : '#333'
    }}
  >
    Previous
  </button>
  <span style={{ margin: '0 10px' }}>Page {page} of {totalPage}</span>
  <button
    onClick={handleNextPage}
    disabled={page === totalPage}
    style={{
      padding: '8px 12px',
      marginLeft: '5px',
      backgroundColor: '#f2f2f2',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: page === totalPage ? 'not-allowed' : 'pointer',
      color: page === totalPage ? '#999' : '#333'
    }}
  >
    Next
  </button>
</div>




    </Card>
  )
}

export default FormLayoutLoanCalculator
