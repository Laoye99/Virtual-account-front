// ** React Imports
import { useState, Fragment, useEffect, forwardRef } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import Card from '@mui/material/Card'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from 'src/configs/constanst'
import { useRouter } from 'next/router'

// ** Custom Component Import
import CardContent from '@mui/material/CardContent'
import CustomTextField from 'src/@core/components/mui/text-field'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'







const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})


const SidebarOldValue = props => {

  const router = useRouter()
  // ** Props
  const {toggle, guarantor } = props
  const [open, setOpen] = useState(false)
  const [a, setApiData] = useState([])
  const [value, setValue] = useState('personal-info')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

   axios.get(`${BASE_URL}/auditLog/get?id=${guarantor}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      .then(response => {
        setData2(response.data)
        console.log('nnvv', data2)
      })
      .catch(error => {
        // Handle the error here, e.g., show an error message or log the error
        console.error('Error fetching data:', error)
      })
  }, [])



  useEffect(() => {
    fetchData() // Invoke the function to fetch data
  }, []) // Empty dependency array ensures this effect runs once after the component is mounted

  console.log('nnnnnnnnnnnnnnnnnnnnnnn', apiData)

  const oldValue = apiData?.old_value
  console.log('OLD VALUE', oldValue)

  const fields = [
    { label: 'App Code', value: oldValue?.app_code },
    { label: 'Switch Code', value: oldValue?.switch_code },
    { label: 'IP Address', value: oldValue?.ip_addr },
    { label: 'Trf Url', value: oldValue?.trf_url },
    { label: 'Tsq Url', value: oldValue?.tsq_url },
    { label: 'Private Keyfile', value: oldValue?.its_private_keyfile },
    { label: 'Public Keyfile', value: oldValue?.its_public_keyfile },
    { label: 'Switch Public Keyfile', value: oldValue?.switch_public_keyfile },
    { label: 'Creation Date', value: oldValue?.creation_date },
    { label: 'Created By', value: oldValue?.created_by },
    { label: 'Operated By', value: oldValue?.operated_by }
  ];

  return (
    <Card>
    <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
      <Button
          component={Link}
          variant='contained'
          href='/audit/${guarantor}'
          startIcon={<Icon icon='tabler:arrow-left' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          Back
        </Button>
      </CardContent>
      <TabContext value={value}>
      <TabList
        variant='scrollable'
        scrollButtons={false}
        onChange={handleTabsChange}
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
      >
        <Tab value='personal-info' label={<span style={{ color: '#f50606' }}> Details</span>} />
      </TabList>
      <fieldset sx={{ marginBottom: '1200px' }}>
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
<TableBody>
  {fields
    .filter(field => field.value) // Filter fields that have values
    .map((field, index) => (
      <TableRow key={index}>
      <TableCell>{field.label === '' ? 'No Values Present':field.label }:</TableCell>
      <TableCell>{field.value === '' ? 'No Values Present':field.value }</TableCell>
      </TableRow>
    ))}
      </TableBody>


            </Table>
          </TableContainer>
      </fieldset>
      </TabContext>
    </Card>
  )
}

export default SidebarOldValue
