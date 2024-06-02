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
  // ** Props
  const { open, toggle, guarantor, apiData } = props
  const [enq, setEnq] = useState("")
  const [prefix, setPrefix] = useState("")
  const [credit, setCredit] = useState("")
  const [debt, setDebt] = useState("")
  const [isButtonDisabled, setButtonDisabled] = useState(false)




  const onSubmit = async e => {
    // Disable the button
    setButtonDisabled(true)
    e.preventDefault()
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      "service-provider": name === "" ? apiData["service-provider-id"] : name,
      "acct-prefix": prefix === "" ? apiData["acct-prefix"] : prefix,
      "acct-enq-url": enq === "" ? apiData["acct-enq-url"] : enq,
      "credt-trf-url": credit === "" ? apiData["credt-trf-url"] : credit,
      "debt-trf-url": debt === "" ? apiData["debt-trf-url"] : debt

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
      const response = await axios.post('http://localhost:9897/vaccount/virtual-account?action=update&id=${guarantor}', formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setButtonDisabled(false)
      toggle()
      toast.success(response.data.message)
      setEnq('')
      setPrefix('')
      setCredit('')
      setDebt('')


    } catch (error) {
      // Handle errors
      toast.error('Please try again')
      console.error('Error submitting form', error)
      setButtonDisabled(false)
    } finally {
      setTimeout(() => {
        // Re-enable the button
        window.location.reload()
      }, 3000) // Adjust the time (in milliseconds) to your desired delay
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
        <Typography variant='h5'>Add Account Configuration</Typography>
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
