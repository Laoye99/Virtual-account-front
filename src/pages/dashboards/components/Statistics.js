// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { DataGrid } from '@mui/x-data-grid'
import { BASE_URL } from 'src/configs/constanst'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import axios from 'axios'
import { AuthContext } from 'src/context/AuthContext'

// ** Config
import authConfig from 'src/configs/auth'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const Statistics = () => {
  const [data, setData] = useState([])
  const [dataa, setDataa] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)


        const response = await axios.get(`${BASE_URL}/helper/stats`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        })


        if (response.data.length > 0) {
          const responseData = response.data[0]

          const dataa = [
            {
              stats: responseData.pending_loans,
              title: 'Pending Loans',
              color: 'primary',
              icon: 'tabler:chart-pie-2'
            },
            {
              stats: responseData.approved_loans,
              title: 'Approved Loans',
              color: 'info',
              icon: 'tabler:users'
            },
            {
              stats: responseData.guarantor_request,
              title: 'Guarantor Requests',
              color: 'success',
              icon: 'tabler:credit-card'
            }
          ]
          setDataa(dataa)

        }
      }catch (error) {
        if (error.code == "ERR_NETWORK"){
          window.location.reload()
        }

        console.error('An error occurred:', error.code)
      }
    }
    fetchData()
  }, [])


  const renderStats = () => {
   // console.log('Rendering Stats:', dataa)

    return dataa.map((item, index) => (
      <Grid item xs={6} md={4} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' color={item.color} sx={{ mr: 4, width: 42, height: 42 }}>
            <Icon icon={item.icon} fontSize='1.5rem' />
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h5'>{item.stats}</Typography>
            <Typography variant='body2'>{item.title}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistics'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            Real-time Update
          </Typography>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Statistics
