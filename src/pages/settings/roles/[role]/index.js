import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'
import AnalyticsDashboard from 'src/pages/guarantor/index'
import Button from '@mui/material/Button'

// ** Config
import authConfig from 'src/configs/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

import {
  Input,
  Select,
  Space,
  Checkbox,
  Table,
  Modal,
  Form,
  Radio,
  Skeleton,
  DatePicker,
  Popconfirm,
  Spin,

  // Button,
  message
} from 'antd'

// ** MUI Import
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import FormLayoutsGuarantor from 'src/views/forms/form-layouts/formLoanDetails'
import user from 'src/store/apps/user'

// ** Demo Components Imports

import UserViewRight from 'src/views/apps/user/view/UserViewRight'

const Guarantors = () => {
  // ** States
  const [apiData, setApiData] = useState([])
  const [roles, setRoles] = useState('')
  const [permissionsModal, setPermissionsModal] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [permission, setPermission] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])

  const router = useRouter()
  const { role } = router.query

  useEffect(() => {
    setPermissionsModal(true)
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(storedToken)

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/roles/edit/${role}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'content-Type': 'application/json'
          }
        })

        setApiData(response.data) // Update the state with the fetched data
        setPermission(response.data.permissions)
        setRoles(response.data.model)
        console.log(response.data.permissions)

        const initialSelectedPermissions = response.data.permissions.filter(item => item.assigned).map(item => item.id)
        setSelectedPermissions(initialSelectedPermissions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Invoke the function to fetch data
  }, [role])

  const handleCheckboxChange = event => {
    const { value, checked } = event.target

    // Find the item associated with the checkbox
    const selectedItem = permission.find(item => item.id.toString() === value.toString())

    if (selectedItem && selectedItem.assigned) {
      // Do not include default-checked checkboxes in the array when they are unchecked
      setSelectedPermissions(prevSelected => prevSelected.filter(item => item !== value))
    }
  }

  const handleSubmit = async () => {
    setSubmitLoading(true)
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log(selectedPermissions)
    const data = { permissions: selectedPermissions }
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/admin/roles/update/${role}`, data, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
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
      setPermissionsModal(false)
    }
  }

  return (
    <div>
      <Modal
        centered
        open={permissionsModal}
        onOk={() => router.back()}
        onCancel={() => {
          router.back()
        }}
        className='our-modal add-page-modal'
        footer={null}
      >
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.6rem', color: '#22668D', textTransform: 'uppercase', marginBottom: '-1rem' }}>
            {roles.display_name}
          </h4>
          <p style={{ fontSize: '1.2rem' }}>{roles.description ? roles.description : 'Role Permissions'}</p>
        </div>

        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            name='permissions'
            label={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Set Role Permissions</span>}
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
                {permission.map((item, index) => (
                  <div key={index}>
                    <label style={{ fontSize: '16px' }}>
                      <input
                        type='checkbox'
                        value={item.id}
                        defaultChecked={item.assigned}
                        style={{
                          width: '20px', // Increase the width
                          height: '20px', // Increase the height
                          marginRight: '8px' // Add spacing between the checkbox and label
                        }}
                        onChange={handleCheckboxChange}
                      />
                      {item.display_name}
                    </label>
                  </div>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              sx={{
                backgroundColor: '#f50606',
                color: 'white',
                mb: 4,
                '&:hover': {
                  backgroundColor: '#22668D'
                }
              }}
              className={submitLoading ? 'our-btn-fade w-100 mt-4 mb-4' : 'w-100 mt-4 mb-4'}
              disabled={submitLoading}
              onClick={handleSubmit}
            >
              {submitLoading ? (
                <Spin
                  className='white-spinner d-flex align-items-center justify-content-center'
                  style={{ color: 'white' }}
                />
              ) : (
                <>Update Permission</>
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default Guarantors
