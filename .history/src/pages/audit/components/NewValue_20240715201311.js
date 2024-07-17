// ** React Imports
import { useState, Fragment, useEffect } from 'react'

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







const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))





const SidebarAddUser = props => {

  const router = useRouter()
  // ** Props
  const { open, toggle, guarantor, apiData } = props
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
  } */}
  const handleClose = () => {
    toggle()
  }

  console.log(apiData)

  const oldValue = apiData?.old_value

  console.log('OLD VALUE', oldValue)

  const newValue = apiData?.new_value

  console.log('NEW VALUE', newValue)

  const fields = [
    { label: 'App Code', value: newValue?.app_code },
    { label: 'Switch Code', value: newValue?.switch_code },
    { label: 'IP Address', value: newValue?.ip_addr },
    { label: 'Trf Url', value: newValue?.trf_url },
    { label: 'Tsq Url', value: newValue?.tsq_url },
    { label: 'Private Keyfile', value: newValue?.its_private_keyfile },
    { label: 'Public Keyfile', value: newValue?.its_public_keyfile },
    { label: 'Switch Public Keyfile', value: newValue?.switch_public_keyfile },
    { label: 'Creation Date', value: newValue?.creation_date },
    { label: 'Created By', value: newValue?.created_by },
    { label: 'Operated By', value: newValue?.operated_by }
  ];

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>New Value Details</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <fieldset sx={{ marginBottom: '1200px' }}>
     <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
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
{
  apiData == [] ? (
 null) : ( <TableBody>
  {fields
    .filter(field => field.value) // Filter fields that have values
    .map((field, index) => (
      <TableRow key={index}>
        {<TableCell>{field.label}:</TableCell>
        <TableCell>{field.value}</TableCell> } === '' 
      </TableRow>
    ))}
      </TableBody>
      )
}
            </Table>
          </TableContainer>

      </Box>
      </fieldset>
    </Drawer>
  )
}

export default SidebarAddUser
