// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { BASE_URL } from 'src/configs/constanst'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

const data = {
  new: [
    {
      sender: {
        name: 'Micheal Hughes',
        address: '101 Boulder, California, 933130'
      },
      receiver: {
        name: 'Daisy Coleman',
        address: '939 Orange, California, 910614'
      }
    },
    {
      sender: {
        name: 'Glenn Todd',
        address: '1713 Garnet, California, 939573'
      },
      receiver: {
        name: 'Arthur West',
        address: '156 Blaze, California, 925878'
      }
    }
  ],
  preparing: [
    {
      sender: {
        name: 'Rose Cole',
        address: '61 Unions, California, 922523'
      },
      receiver: {
        name: 'Polly Spencer',
        address: '865 Delta, California, 932830'
      }
    },
    {
      sender: {
        name: 'Jerry Wood',
        address: '37 Marjory, California, 951958'
      },
      receiver: {
        name: 'Sam McCormick',
        address: '926 Reynolds, California, 910279'
      }
    }
  ],
  shipping: [
    {
      sender: {
        name: 'Alex Walton',
        address: '78 Judson, California, 956084'
      },
      receiver: {
        name: 'Eula Griffin',
        address: '56 Bernard, California, 965133'
      }
    },
    {
      sender: {
        name: 'Lula Barton',
        address: '95 Gaylord, California, 991955'
      },
      receiver: {
        name: 'Craig Jacobs',
        address: '73 Sandy, California, 954566'
      }
    }
  ]
}

const Timeline = styled(MuiTimeline)({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiTimelineDot-root': {
    border: 0,
    padding: 0
  }
})

const UserViewRight = ({ users }) => {
  // ** State
  const [value, setValue] = useState('new')
  const [no, setNo] = useState('')
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  console.log(storedToken)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/admin/users/edit/${users}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      console.log(response.data.user.no_)
      setNo(response.data.user.no_)

      // Extract the value from the first response
      const userNo = response.data.user.no_

      // Construct the URL or data for the second API call
      const secondUrl = `${BASE_URL}/admin/activitylog/${userNo}` // Adjust the URL as needed

      // Second API call using the extracted value
      const secondResponse = await axios.get(secondUrl, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      console.log(secondResponse.data.data)
      setApiData(secondResponse.data.data)
      setIsLoading(false)

      // You can now work with the data from the second response here.
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData() // Invoke the function to fetch data
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isLoading ? (
    <Skeleton height={300} count={10} baseColor='#f4f4f4' />
  ) : (
    <Card>
      <CardHeader
        sx={{ pb: 4 }}
        title='User Activities'
        subheader='View the users latest Activities'
      />
      <TabContext value={value}>
        <TabList variant='fullWidth' onChange={handleChange} aria-label='tabs in orders card'>
          <Tab value='new' label={`${no} Activities`} />
        </TabList>
        <TabPanel value={value}>
          {apiData.map((item, index) => {
            // Parse the ISO date string into a JavaScript Date object
            const createdAtDate = new Date(item.created_at)

            // Format the date as a string

            const formattedDate = createdAtDate.toLocaleString()

            return (
              <Fragment key={index}>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color='success' variant='outlined' sx={{ mt: 0 }}>
                        <Icon fontSize='1.25rem' icon='tabler:circle-check' />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ mt: 0, pt: 0, mb: theme => `${theme.spacing(1)} !important` }}>
                      <Typography
                        variant='body2'
                        sx={{
                          mb: 0.5,
                          fontWeight: 500,
                          lineHeight: 'normal',
                          color: 'success.main',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.activity}
                      </Typography>
                      <Typography sx={{ mb: 0.5 }} variant='h6'>
                        {formattedDate}
                      </Typography>
                      <Typography sx={{ color: 'text.disabled' }}>{item.user_id}</Typography>
                    </TimelineContent>
                  </TimelineItem>

                  {/* <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color='primary' variant='outlined' sx={{ mt: 1.5 }}>
                        <Icon fontSize='1.25rem' icon='tabler:map-pin' />
                      </TimelineDot>
                    </TimelineSeparator>
                    <TimelineContent sx={{ mt: 0, pb: 0 }}>
                      <Typography
                        variant='body2'
                        sx={{
                          mb: 0.5,
                          fontWeight: 500,
                          lineHeight: 'normal',
                          color: 'primary.main',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.activity}
                      </Typography>
                      <Typography sx={{ mb: 0.5 }} variant='h6'>
                        {item.created_at}
                      </Typography>
                      <Typography sx={{ color: 'text.disabled' }}>{item.created_at}</Typography>
                    </TimelineContent>
                  </TimelineItem> */}
                </Timeline>
                {index !== data[value].length - 1 && <Divider sx={{ my: 4, borderStyle: 'dashed' }} />}
              </Fragment>
            )
          })}
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default UserViewRight
