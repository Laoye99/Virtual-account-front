import { Fragment, useState, useEffect } from 'react'
import { BASE_URL } from 'src/configs/constanst'
import Pagination from '@mui/material/Pagination'

// ** MUI Imports
import DOMPurify from 'dompurify'
import Box from '@mui/material/Box'
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
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'

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

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4.25),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0,
    '& .MuiMenuItem-root': {
      margin: 0,
      borderRadius: 0,
      padding: theme.spacing(4, 6),
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)({
  fontWeight: 500,
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

// const EcommerceOrders = ({ users }) => {
const Notifications = props => {
  // ** Props
  const { settings, notifications } = props

  // ** State
  const [no, setNo] = useState('')
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiDataa, setApiDataa] = useState([])

  const [value, setValue] = useState('new') // assuming you have state for tab value
  const itemsPerPage = 5 // Change this value to adjust the number of items per page
  const [page, setPage] = useState(1)

  const handleChange = (event, newValue) => {
    setPage(newValue)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const notificationsToDisplay = apiDataa.slice(startIndex, endIndex)

  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/notifications/view-all`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
        },
      });
  
      // Check if the response data is an array before updating the state
      if (Array.isArray(response.data)) {
        setApiDataa(response.data) // Update the state with the fetched data
      } else {
        console.error('Invalid data format:', response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }  

  useEffect(() => {
    fetchData() // Invoke the function to fetch data
  }, [])

  return (
    <Card>
      <CardHeader
        sx={{ pb: 2 }}
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size='small' sx={{ mr: 1 }}>
              <Icon icon='tabler:notification' />
            </IconButton>
            Recent Notifications
          </div>
        }
        subheader=''
        action={
          <OptionsMenu options={['Refresh']} iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }} />
        }
      />
      <Divider sx={{ m: '0 !important' }} />
      <TabContext value={value}>
        <TabPanel value={value}>
          <ScrollWrapper hidden={false}>
          {console.log('apiDataa type:', typeof notificationsToDisplay)}
            {notificationsToDisplay?.map((item, index) => {
              const createdAtDate = new Date(item?.created_at)

              const formattedDate = new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }).format(createdAtDate)

              return (
                <MenuItem key={index}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}
                    >
                     <MenuItemSubtitle
                        variant='body2'
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item?.data?.message.toString()) }}
                      />
                    </Box>
                    <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                      {formattedDate}
                    </Typography>
                  </Box>
                </MenuItem>
              )
            })}
         
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Pagination count={Math.ceil(apiDataa?.length / itemsPerPage)} page={page} onChange={handleChange} />
            </Box>
          </ScrollWrapper>
        </TabPanel>
      </TabContext>
    </Card>
  )
}

Notifications.acl = {
  action: 'user',
  subject: 'user'
}

export default Notifications
