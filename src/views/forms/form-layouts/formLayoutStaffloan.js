// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
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
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsStaffLoan = () => {
  // ** States
  const [value, setValue] = useState('personal-info')
  const [date, setDate] = useState(null)
  const [months, setmonths] = useState([])

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  // Handle Select
  const handleSelectChange = event => {
    setmonths(event.target.value)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label='Loan Request Form' />
        </TabList>
        <form onSubmit={e => e.preventDefault()}>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='personal-info'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Applied amount' placeholder='Applied amount' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Applied maturity'
                    id='form-layouts-tabs-multiple-select'
                    SelectProps={{
                      multiple: true,
                      value: months,
                      onChange: e => handleSelectChange(e)
                    }}
                  >
                    <MenuItem value='1'>1 month</MenuItem>
                    <MenuItem value='3'>3 months</MenuItem>
                    <MenuItem value='6'>6 months</MenuItem>
                    <MenuItem value='12'>12 months</MenuItem>
                    {/* Add more options as needed */}
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label='First Guarantor'
                    id='form-layouts-tabs-select'
                    defaultValue=''
                  >
                    <MenuItem value='ABN-00571'>ABN-00571</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Second Guarantor'
                    id='form-layouts-tabs-select'
                    defaultValue=''
                  >
                    <MenuItem value='ABN-00572'>ABN-00572</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField fullWidth label='Home Address' placeholder='11 Bariga Road Lagos' />
                </Grid>
              </Grid>
            </TabPanel>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <CardActions>
            <Button type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button type='reset' variant='tonal' color='secondary'>
              Reset
            </Button>
          </CardActions>
        </form>
      </TabContext>
    </Card>
  )
}

export default FormLayoutsStaffLoan
