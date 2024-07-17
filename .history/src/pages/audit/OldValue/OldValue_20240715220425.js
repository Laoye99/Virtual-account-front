// ** React Imports
import { useState, Fragment, useEffect, forwardRef }
from 'react'

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
  const { open, toggle, guarantor, oldValue } = props
  const [value, setValue] = useState('personal-info')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [isButtonDisabled, setButtonDisabled] = useState(false)




 {/*  const onSubmit = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      "app_name": name === "" ? apiData["app_name"] : name,
      "app_code": code === "" ? apiData["app_code"] : code
    }
    // const isFormDataValid = Object.values(formData).every(value => value !== '' && value !== null)

    // if (!isFormDataValid) {
    //     setButtonDisabled(false)
    //   console.error('Oops!!! All fields are required')
    //   toast.error('Oops!!! All fields are required')

    //   return
    // } else {}

    console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.put(`${BASE_URL}/apiRegistry/update?id=${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      toggle()
      setCode('')
      setName('')
      toast.success(response.data.message)
      router.push('/api-reg')
    } catch (error) {
      // Handle errors
      toast.error('Please try again')
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    }
  }
  const handleClose = () => {
    toggle()
  }*/}


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
        <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>API Configuration Details</span>} />
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
