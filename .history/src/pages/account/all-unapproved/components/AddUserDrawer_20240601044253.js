// ** React Imports
import { useState } from 'react'

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
  const [enq, setEnq] = useState("")
  const [prefix, setPrefix] = useState("")
  const [credit, setCredit] = useState("")
  const [debt, setDebt] = useState("")
  const [name, setName] = useState("")
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  console.log(apiData)




  const onSubmit = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      "acct-enq-url": enq,
      "acct-prefix": prefix,
      "credt-trf-url": credit,
      "debt-trf-url": debt,
      "service-provider": name
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
      const response = await axios.put('http://localhost:9897/vaccount/virtual-account', formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      toggle()
      setEnq('')
      setPrefix('')
      setCredit('')
      setDebt('')
      setName('')
      toast.success(response.data.message)
      router.push('/account/all-unapproved')
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
        <Typography variant='h5'>Add Virtual Account Config</Typography>
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
        fullWidth
        value={name}
        sx={{ mb: 4 }}
        label='Service'
        onChange={e => setEnq(e.target.value)}
        placeholder='xxxxxx'
      />

        <CustomTextField
        fullWidth
        value={enq}
        sx={{ mb: 4 }}
        label='Acct Enq Url'
        onChange={e => setEnq(e.target.value)}
        placeholder='xxxxxx'
      />


      <CustomTextField
        fullWidth
        value={prefix}
        sx={{ mb: 4 }}
        label='Acct Prefix'
        onChange={e => setPrefix(e.target.value)}
        placeholder='xxxxxx'
      />

      <CustomTextField
        fullWidth
        value={credit}
        sx={{ mb: 4 }}
        label='Credit Trf Url'
        onChange={e => setCredit(e.target.value)}
        placeholder='xxxxxx'
      />

      <CustomTextField
        fullWidth
        value={debt}
        sx={{ mb: 4 }}
        label='Debt Trf Url'
        onChange={e => setDebt(e.target.value)}
        placeholder='xxxxxx'
      />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button  disabled={isButtonDisabled} type='submit' variant='contained' sx={{ mr: 3, backgroundColor: '#71ace0',  '&:hover': {
                    backgroundColor: '#22668D'
                  } }}>
           {isButtonDisabled ? 'Processing...' : 'Submit'}
            </Button>
            {
              apiData?.isactive === "true" ? (<Button variant='contained'  onClick={handleActivate} sx={{ mr: 3, backgroundColor: '#f50606',  '&:hover': {
                backgroundColor: '#f50606'
              } }}>
       {isButtonDisabled ? 'Processing...' : 'Activate'}
        </Button>) : (   <Button variant='contained'  onClick={handleDeactivate} sx={{ mr: 3, backgroundColor: '#f50606',  '&:hover': {
                    backgroundColor: '#f50606'
                  } }}>
           {isButtonDisabled ? 'Processing...' : 'Deactivate'}
            </Button>)
            }


          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
