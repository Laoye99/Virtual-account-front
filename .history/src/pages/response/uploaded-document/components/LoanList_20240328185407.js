// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AvatarGroup from '@mui/material/AvatarGroup'
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'



// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'



// ** Third Party Imports
import axios from 'axios'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))






const LoanList = () => {
  // ** State
  const [data, setData] = useState([])
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })


  // useEffect(() => {
  //   const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  //   axios
  //     .get(`${BASE_URL}/switch/endpoint?approval-status=approved`, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //         'Content-Type': 'application/json',
  //         "ngrok-skip-browser-warning": "http://localhost:3000/"
  //       }
  //     })
  //     .then(response => {
  //       setData(response.data.data)
  //     })
  //     .catch(error => {
  //       // Handle the error here, e.g., show an error message or log the error
  //       console.error('Error fetching data:', error)
  //     })
  // }, [])



  return  (
    <Card>



    </Card>
  )
}

export default LoanList
