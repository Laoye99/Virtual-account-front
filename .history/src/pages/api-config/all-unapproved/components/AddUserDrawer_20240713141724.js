// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from 'axios'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from 'src/configs/constanst'
import { useRouter } from 'next/router'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

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
  const [app, setApp] = useState("")
  const [code, setCode] = useState("")
  const [tsq, setTsq] = useState("")
  const [trf, setTrf] = useState("")
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  console.log(apiData)


  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/apiConfig/get_approved`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      .then(response => {
        setData(response.data)
        console.log('nnvv', data)
      })
      .catch(error => {
        // Handle the error here, e.g., show an error message or log the error
        console.error('Error fetching data:', error)
      })
  }, [])



  const onSubmit = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      "app_code": app,
      "switch_code": code,
      "tsq_url": tsq,
      "trf_url": trf
    }


    const isFormDataValid = Object.values(formData).every(value => value !== '' && value !== null)

    if (!isFormDataValid) {
        setButtonDisabled(false)
      console.error('Oops!!! All fields are required')
      toast.error('Oops!!! All fields are required')

      return
    } else {}

    console.log('newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/apiConfig/create`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      toggle()
      setApp('')
      setCode('')
      setTsq('')
      setTrf('')

      toast.success("Successfully Created Pending Approval by Admin")
      router.push('/api-config/all-unapproved')
    } catch (error) {
      // Handle errors
      toast.error('Please try again')
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    }
  }

  const handleClose = () => {
    toggle()
  }

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
        <Typography variant='h5'>Add Third Party API Config</Typography>
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
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={onSubmit}>

        <CustomTextField
        select
        fullWidth
        defaultValue=''
        label='App Code'
        placeholder='App Code'
        id='form-layouts-tabs-multiple-select'
        SelectProps={{
          multiple: false,
          value: app,
          onChange: e => setApp(e.target.value)
        }}
        required
      >
      <MenuItem value='up_outflow'>data</MenuItem>
      </CustomTextField>

        {/* <CustomTextField
        fullWidth
        value={app}
        sx={{ mb: 4 }}
        label='App Code'
        onChange={e => setApp(e.target.value)}
        placeholder='xxxxxx'
      /> */}

      <CustomTextField
        fullWidth
        value={code}
        sx={{ mb: 4 }}
        label='Switch Code'
        onChange={e => setCode(e.target.value)}
        placeholder='xxxxxx'
      />

        <CustomTextField
        fullWidth
        value={tsq}
        sx={{ mb: 4 }}
        label='Tsq Url'
        onChange={e => setTsq(e.target.value)}
        placeholder='xxxxxx'
      />

      <CustomTextField
        fullWidth
        value={trf}
        sx={{ mb: 4 }}
        label='Trf Url'
        onChange={e => setTrf(e.target.value)}
        placeholder='xxxxxx'
      />

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button  disabled={isButtonDisabled} type='submit' variant='contained' sx={{ mr: 3, backgroundColor: '#f50606',  '&:hover': {
              backgroundColor: '#f50606'
            } }}>
     {isButtonDisabled ? 'Processing...' : 'Submit'}
      </Button>
      <Button variant='tonal' color='secondary' onClick={handleClose}>
        Cancel
      </Button>
    </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
