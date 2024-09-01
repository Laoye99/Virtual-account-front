import { useState, useEffect } from 'react'

import Link from 'next/link'

// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'

// ** Demo Component Imports
import LoanList from './components/LoanList'
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import axios from 'axios'

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [submitLoading, setSubmitLoading] = useState(true)
  console.log(data)

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    axios
      .get(`${BASE_URL}/switch/uploadfile?module=inst_route&category=unapproved`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      .then(response => {
        console.log(response.data.data)
        setData(response.data.data)
        setSubmitLoading(false)
      })
      .catch(error => {
        // Handle the error here, e.g., show an error message or log the error
        console.error('Error fetching data:', error)
        setSubmitLoading(false)
      })
  }, []);

    // Filter data based on request_type
    const createData = data.filter(item => item.request_type === 'create');
    const deleteData = data.filter(item => item.request_type === 'delete');


    return (
      <ApexChartWrapper>
    <Grid container spacing={6}>
    <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>
            <Typography variant='h5'>Create Unapproved Documents</Typography>
          </Grid>

          {/* Render create data */}
          {createData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                  <Typography variant='h5' sx={{ mb: 2 }}>
                    {item.document_name} by {item.uploaded_by}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{item.upload_date}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {item.document_id}-{item.document_type}-{item.module_name}
                  </Typography>
                </CardContent>
                <Link href={`/router/uploaded-document/details/${item.document_id}`}>
                  <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: '#f50606', '&:hover': { backgroundColor: '#f50606' } }}>
                    View
                  </Button>
                </Link>
              </Card>
            </Grid>
          ))}
           </Grid>
           <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important`, mb: '1rem' }}>
            <Typography variant='h5'>Delete Unapproved Requests</Typography>
          </Grid>
          {/* Render delete data */}
          <Grid container spacing={6}>

          {deleteData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                  <Typography variant='h5' sx={{ mb: 2 }}>
                    {item.document_name} by {item.uploaded_by}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{item.upload_date}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {item.document_id}-{item.document_type}-{item.module_name}
                  </Typography>
                </CardContent>
                <Link href={`/router/uploaded-document/details/${item.document_id}`}>
                  <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: '#f50606', '&:hover': { backgroundColor: '#f50606' } }}>
                    View
                  </Button>
                </Link>
              </Card>
            </Grid>
          ))}
      </Grid>
      </ApexChartWrapper>
    )
}

Dashboard.acl = {
  action: 'user',
  subject: 'user'
}

export default Dashboard
