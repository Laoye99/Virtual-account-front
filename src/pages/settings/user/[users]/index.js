// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** Axios
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Config
import authConfig from 'src/configs/auth'
import InputLabel from '@mui/material/InputLabel'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

// import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import CustomChip from 'src/@core/components/mui/chip'
import {
  Input,
  Select,
  Space,
  Checkbox,
  Modal,
  Form,
  Radio,
  Popconfirm,
  Spin,

  // Button,
  message
} from 'antd'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Box, Collapse } from '@mui/material'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import api from 'src/apis'


const Guarantors = () => {
  const router = useRouter()
  const { users } = router.query
  console.log("router", router)
  console.log("userrrrr", users)

   // ** States
   const [open, setOpen] = useState(false)
   const [message, setMessage] = useState('')
   const handleDialogToggle = () => setOpen(!open)
   const [apiData, setApiData] = useState([])
   const [value, setValue] = useState('User-details')
   const [isLoading, setIsLoading] = useState(false)
   const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [userModal, setUserModal] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [role, setRole] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)

   const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

   const fetchData = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    setIsLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/switch/getusers?id=${users}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      setApiData(response.data.data[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  const fetchData2 = async () => {
    console.log("11111111111")
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      // Make a GET request to the specified endpoint
      const response = await axios.get(
        `${BASE_URL}/switch/getroles`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "http://localhost:3000/"

          }
        }
      );
      console.log("232222222")

      // Set the fetched data to the state
      console.log("here we go again", response.data.data);
      setRole(response.data.data)

    } catch (error) {
      console.log("222222")
      console.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    fetchData() // Invoke the function to fetch data
    fetchData2();
  }, [])




const handleCheckboxChange = event => {
    const { value, checked } = event.target;

    // If the checkbox is checked, set the selected role to the ID
    // If the checkbox is unchecked, set the selected role to null
    setSelectedRole(checked ? value : null);
  };

const handleSubmit = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    setSubmitLoading(true)

    const data = {
        user_id : parseInt(channel, 10),
        new_role_id : parseInt(selectedRole, 10) }
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${baseUrl}/switch/updateuserrole`, data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json',
          "ngrok-skip-browser-warning": "http://localhost:3000/"

        }
      })

      toast.success(response.data.message)
      console.log('Form submitted successfully', response)
      router.back()
    } catch (error) {
      // toast.error(error.response.data.message)
      console.error('Error submitting form', error)
      router.back()
    } finally {
      setSubmitLoading(false)
      setUserModal(false)
    }
  }




  return (

    <Card>
      <TabContext value={value}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
        >
          <Tab value='personal-info' label={<span style={{ color: '#f50606' }}>Loan Details</span>} />
        </TabList>
        <fieldset sx={{ marginBottom: '1200px' }}>
          <legend>Switch Provider Details</legend>
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
 null) : (
  <TableBody>
  <TableRow>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      Firstname:
    </TableCell>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      {apiData["firstname"]}
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      Lastname:
    </TableCell>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      {apiData["lastname"]}
    </TableCell>
  </TableRow>

  <TableRow>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      Email:
    </TableCell>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      {apiData["email"]}
    </TableCell>
  </TableRow>


  <TableRow>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      Current Role:
    </TableCell>
    <TableCell
      style={{ fontSize: "1.8rem", fontWeight: "600" }}
    >
      {apiData["role_name"]}
    </TableCell>
  </TableRow>

</TableBody>

    )
}


            </Table>
          </TableContainer>

          <button
        type="submit"
        style={{ marginRight: "10px", backgroundColor: "#d20303",color: "#fff", fontSize: "1.8rem", padding: "12px 18px", border: "none", cursor: "pointer", borderRadius: "5px" }}
        onClick={() => setUserModal(true)}
        >
        Assign Role
        </button>
        </fieldset>


      </TabContext>


  <Modal
        centered
        open={userModal}
        onOk={() => router.back()}
        onCancel={() => {
          router.back()
        }}
        className='our-modal add-page-modal'
        footer={null}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.6rem', color: '#d20303', textTransform: 'uppercase' }}>
           Roles
          </h1>
          <p style={{ fontSize: '1.8rem' }}>Update User Role</p>
        </div>

        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            name='Role'
            label={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Set Role</span>}
            className='heights'
            rules={[
              {
                required: true,
                message: 'Please select assign entity!'
              }
            ]}
            style={{
              maxHeight: '350px', // Set your desired max height
              overflowY: 'auto',
              scrollbarWidth: 'thin', // Firefox
              scrollbarColor: '#ccc #fff' // Firefox
            }}
          >
            <Checkbox.Group style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <Space direction='vertical'>
                {role.map((item, index) => (
                  <div key={index}>
                    <label style={{ fontSize: '16px' }}>
                      <input
                        type='checkbox'
                        value={item.id}
                        style={{
                          width: '20px', // Increase the width
                          height: '20px', // Increase the height
                          marginRight: '8px' // Add spacing between the checkbox and label
                        }}
                        onChange={handleCheckboxChange}
                      />
                      {item.role_name}
                    </label>
                  </div>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading}
                style={{ paddingTop: "6px" }}
                onClick={handleSubmit}
              >
              </Button>
            </Form.Item>


        </Form>
      </Modal>

    </Card>

  )
}

Guarantors.acl = {
  action: 'ADMIN',
  subject: 'ADMIN'
}

export default Guarantors
