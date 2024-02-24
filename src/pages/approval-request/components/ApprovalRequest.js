import { useState, useEffect, useContext } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Component Imports
import { Ability, AbilityBuilder } from '@casl/ability'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Components
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { BASE_URL } from 'src/configs/constanst'
import authConfig from 'src/configs/auth'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import { CSVLink } from 'react-csv'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import axios from 'axios'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'



const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const userStatusObj = {
  1: 'success',
  0: 'warning',
  2: 'secondary'
}

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 20,
    headerName: 'Loan ID',
    renderCell: ({ row }) => <LinkStyled href={`/approval-request/${row?.id}`}>{`#${row?.loan_id}`}</LinkStyled>
  },
  {
    flex: 0.1,
    field: 'full_name',
    minWidth: 300,
    headerName: 'Loan Owner',
    renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.loan?.loan_owner?.full_name}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'approved',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row?.approved == 0 ? 'Action Pending' : row?.approved == 1 ? 'Approved' : 'Declined'}
          color={userStatusObj[row.approved]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    field: 'amount',
    minWidth: 120,
    headerName: 'Amount',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>
        ₦{row?.loan?.amount?.toLocaleString('en-US', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,}) || 0}
      </Typography>
    )    
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'created_at',
    headerName: 'Date',
    renderCell: ({ row }) => {
      const originalDate = new Date(row?.created_at)
      const formattedDate = originalDate.toLocaleDateString()

      return <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='View'>
          <IconButton size='small' component={Link} href={`/approval-request/${row?.id}`}>
            <Icon icon='tabler:eye' />
          </IconButton>
        </Tooltip>
      </Box>
    )
  }
]




const ApprovalRequest = () => {
  // ** State
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [searchValue, setSearchValue] = useState('') // Add state for search value
  const [selectedRows, setSelectedRows] = useState([])
  const [exportCSVClicked, setExportCSVClicked] = useState(false)
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] = useState(false)
  const [userRole, setUserRole] = useState('') // Add state for search value

  const ability = useContext(AbilityContext)

  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })
  
  
useEffect(() => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
  axios
    .get(`${BASE_URL}/autoloan/loan-approval`, {
      params: { q: searchValue },
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const approvalsData = response.data.approvals || [];
      const hrApprovalData = response.data.hr_approval || [];
      const ceoApprovalData = response.data.ceo_approval || [];
     // const approvalsDatas = response.data.approvals && response.data.hr_approval || [];
     // const approvalsDatas = [...response.data.approvals, ...response.data.hr_approval]  || [];
      const approvalsDatas = [...approvalsData, ...hrApprovalData, ...ceoApprovalData];
      console.log('new datasssssssss',approvalsDatas)
      // If approvalsDatas is empty, use data from ceo_approval
     if (approvalsDatas.length) {
        setData(approvalsDatas);
        setFilteredData(approvalsDatas);
        //console.log(hrApprovalData)
      } 
      else {
        setData(ceoApprovalData);
        setFilteredData(ceoApprovalData)
        //console.log('ceo nlaaaaa',ceoApprovalData)
      }

      // else if (!hrApprovalData.length && ceoApprovalData.length) {
      //   setData(ceoApprovalData);
      //   setFilteredData(ceoApprovalData)
      //   //console.log('ceo nlaaaaa',ceoApprovalData)
      // }
      //else if (!approvalsData.length && !hrApprovalData.length && ceoApprovalData.length) {
     
      //  else {
      //   setData(approvalsData);
      //   setFilteredData(approvalsData)
      //   //console.log('approval',approvalsData)
      // }
    })
    .catch(error => {
   
        if (error.code == "ERR_NETWORK"){
          window.location.reload()
        }
      console.error('Error fetching data:', error.code);
    });
}, [searchValue]);


  const handleFilter = val => {
    setSearchValue(val) // Update the search value
  }

  useEffect(() => {
    // Filter the original data based on the searchValue
    const searchString = searchValue.toLowerCase()

    const filtered = data.filter(row => {
      const statusText = row?.approved === 0 ? 'in-progress' : row?.approved === 1 ? 'approved' : 'declined'

      return (
        row?.id.toString().toLowerCase().includes(searchString) ||
        statusText.toLowerCase().includes(searchString) ||
        row?.amount?.toString().includes(searchString) ||
        row?.created_at.toLowerCase().includes(searchString)
      )
    })

    setFilteredData(filtered) // Update the filtered data
  }, [searchValue, data])

  const onRowsSelectionHandler = ids => {
    const selectedRowsData = ids.map(id => {
      const rowData = filteredData.find(row => row?.id === id)

      // Extract additional data from `rowData`
      const additionalData = {
        status: rowData?.approved,
        amount: rowData?.loan?.amount,

        //  Date: rowData.created_at,
        Date: new Date(rowData?.created_at).toLocaleDateString()
      }

      // Combine `id` and additional data into a new object
      return {
        id: rowData.id,

        ...additionalData
      }
    })

    console.log(selectedRowsData)
    setAtLeastOneCheckboxChecked(selectedRowsData.length > 0) // Update the atLeastOneCheckboxChecked state
    setSelectedRows(selectedRowsData) // Update the setSelectedRows data

    //setSelectedRows(selectedRowsData); // Update the setSelectedRows data
  }

  const formatDataForCSVExport = data => {
    return data.map(row => ({
      'Loan ID': `#${row?.id}`,

      Status: row?.approved === 0 ? 'Action Pending' : row?.approved === 1 ? 'Approved' : 'Declined',
      Amount: `₦${row?.loan?.amount || 0}`,
      Date: new Date(row?.created_at).toLocaleDateString()
    }))
  }

  return (
    <Card>
      <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant='h5'>ALL LOAN REQUEST</Typography>
        {/* {ability.can('user', 'user') && ( */}
          <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <CSVLink
              data={formatDataForCSVExport(filteredData)}
              headers={[
                { label: 'Loan ID', key: 'Loan ID' },
                { label: 'Status', key: 'Status' },
                { label: 'Amount', key: 'Amount' },
                { label: 'Date', key: 'Date' }
              ]}
              filename={'loan-approvaldetails.csv'}
            >
              <p
                style={{
                  backgroundColor: '#71ace0',
                  color: '#ffffff',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}
              >
                Export CSV
              </p>
            </CSVLink>

            {atLeastOneCheckboxChecked && (
              <CSVLink
                data={selectedRows} // Use selectedRows data
                filename={'loan-approvaldetails.csv'}
              >
                <p
                  style={{
                    backgroundColor: '#71ace0',
                    color: '#ffffff',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}
                >
                  Export Selected CSV
                </p>
              </CSVLink>
            )}

            <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <CustomTextField value={searchValue} placeholder='Search' onChange={e => handleFilter(e.target.value)} />
            </Box>
          </Box>
        {/* )} */}
      </CardContent>
      <DataGrid
        autoHeight
        pagination
        rows={filteredData || []} 
        rowHeight={62}
        columns={columns}
        checkboxSelection
        selectionModel={selectedRows} // Use selectedRows state
        onRowSelectionModelChange={ids => onRowsSelectionHandler(ids)}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  )
}

export default ApprovalRequest
