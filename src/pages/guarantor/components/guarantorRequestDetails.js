// ** React Imports
import { useEffect, useState } from 'react'

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
import { CSVLink } from 'react-csv'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

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

const userStatusObj = {
  1: 'success',
  0: 'warning',
  2: 'secondary'
}

const columns = [
  {
    flex: 0.2,
    field: 'loan_id',
    minWidth: 90,
    headerName: 'Loan ID',
    renderCell: ({ row }) => {
      return row.status == 0 ? (
        <LinkStyled href={`/guarantor/${row?.id}`}>{`#${row?.loan_id}`}</LinkStyled>
      ) : (
        <Typography sx={{ color: 'text.secondary' }}>{row?.loan_id}</Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: 'loan_owner',
    headerName: 'Loan Requestor',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.loan?.loan_owner?.full_name}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 80,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin='light'
          size='small'
          label={row.status == 0 ? 'Action Pending' : row.status == 1 ? 'Approved' : 'Declined'}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },

  {
    flex: 0.3,
    minWidth: 125,
    field: 'created_at',
    headerName: 'Date',
    renderCell: ({ row }) => {
      const originalDate = new Date(row?.created_at)
      const formattedDate = originalDate.toLocaleDateString()

      return <Typography sx={{ color: 'text.secondary' }}>{formattedDate}</Typography>
    }
  }
]

const GuarantorRequestDetails = () => {
  // ** State
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [searchValue, setSearchValue] = useState('') // Add state for search value
  const [selectedRows, setSelectedRows] = useState([])
  const [exportCSVClicked, setExportCSVClicked] = useState(false)
  const [atLeastOneCheckboxChecked, setAtLeastOneCheckboxChecked] = useState(false)
  const [paginationLinks, setPaginationLinks] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  const [value, setValue] = useState('')
 
const [paginationModel, setPaginationModel] = useState({
  page: 1, // Initial page number
  pageSize: 5, // Initial page size
  total: 0, // Initial total number of rows (should be updated based on API response)
});


  
  const fetchData = async (page) => {
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);

      const response = await axios.get(`${BASE_URL}/autoloan/loan/guarantor`, {
        params: { page: paginationModel.page, q: searchValue },
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      setData(response.data.data);
      setPaginationModel((prev) => ({
        ...prev,
        total: response.data.total,
      //  page: response.data.per_page,
        per_page: response.data.per_page,
        next_page_url: response.data.next_page_url,
        prev_page_url: response.data.prev_page_url,
      }));
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        window.location.reload();
      }

      console.error('An error occurred:', error.code);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue, paginationModel.page]); // Include paginationModel.page in dependencies

    // console.log('page size',paginationModel.pageSize)
    // console.log('page',paginationModel.page)
    // console.log('total rows',paginationModel.total)
    // console.log('rows per page',paginationModel.per_page)
    // console.log('next page url',paginationModel.next_page_url)
    // console.log('prev page url',paginationModel.prev_page_url)

    const handlePageChange = (newPage) => {
      const nextPageUrl = paginationLinks.next_page_url;
      const prevPageUrl = paginationLinks.prev_page_url;
     // console.log('next page url',paginationModel.next_page_url)
      if (newPage > currentPage && nextPageUrl) {
        // Handle next page
        fetchDataFromUrl(nextPageUrl);
      } else if (newPage < currentPage && prevPageUrl) {
        // Handle previous page
        fetchDataFromUrl(prevPageUrl);
      }
    
      setCurrentPage(newPage);
      // console.log('CCCCCCCCCCCCCCCCCCCCCCCC')
      // console.log('h New PAGE LAH',newPage)
      // console.log('h New PAGE LAH',page)
    }
  const handleFilter = val => {
    setSearchValue(val) // Update the search value
  }

  useEffect(() => {
    // Filter the original data based on the searchValue
    const searchString = searchValue.toLowerCase()

    const filtered = data.filter(row => {
      const statusText = row.status === 0 ? 'in-progress' : row.status === 1 ? 'approved' : 'declined'

      return (
        row.id.toString().toLowerCase().includes(searchString) ||
        statusText.toLowerCase().includes(searchString) ||
        // row.loan.loan_owner.full_name.toString().includes(searchString) ||
        row.created_at.toLowerCase().includes(searchString)
      )
    })

    setFilteredData(filtered) // Update the filtered data
  }, [searchValue, data])

  useEffect(() => {
    // Filter the original data based on the searchValue
    const searchString = searchValue.toLowerCase()

    const selected = data.filter(row => {
      const statusText = row.status === 0 ? 'in-progress' : row.status === 1 ? 'approved' : 'declined'

      return (
        row.id.toString().toLowerCase().includes(searchString) ||
        statusText.toLowerCase().includes(searchString) ||
        // row.loan.loan_owner.full_name.toString().includes(searchString) ||
        row.created_at.toLowerCase().includes(searchString)
      )
    })

    setSelectedRows(selected) // Update the filtered data
  }, [searchValue, data])

  const onRowsSelectionHandler = ids => {
    const selectedRowsData = ids.map(id => {
      const rowData = filteredData.find(row => row.id === id)

      // Extract additional data from `rowData`
      const additionalData = {
        LoanRequestor: rowData?.loan?.loan_owner?.full_name, // Extract loan_owner data from `rowData`
        status: rowData?.loan?.status,

        // Date: rowData.created_at,
        Date: new Date(rowData?.created_at).toLocaleDateString()
      }

      // Combine `id` and additional data into a new object
      return {
        id: rowData?.id,
        ...additionalData
      }
    })

    console.log(selectedRowsData)
    setAtLeastOneCheckboxChecked(selectedRowsData.length > 0) // Update the atLeastOneCheckboxChecked state
    setSelectedRows(selectedRowsData) // Update the setSelectedRows data
    //setSelectedRows(selectedRowsData); // Update the setSelectedRows data
  }

  const formatSelectedDataForCSVExport = selectedRows => {
    //console.log('Selected Data:', selectedRows)

    if (exportCSVClicked) {
      // Data generation logic here
      const selectedData = selectedRows.map(rowId => {
        const row = data.find(item => item.id === rowId)

        return {
          'Loan ID': `#${row?.loan_id}`,
          'Loan Requestor': row?.loan?.loan_owner?.full_name,
          Status: row.status === 0 ? 'Action Pending' : row.status === 1 ? 'Approved' : 'Declined',
          Date: new Date(row.created_at).toLocaleDateString()
        }
      })

      //console.log('New Data:', selectedData)

      return selectedData
    } else {
      return [] // Return an empty array if the button hasn't been clicked
    }
  }

  // Create a function to format the data for CSV export
  const formatDataForCSVExport = data => {
    return data.map(row => ({
      'Loan ID': `#${row?.loan_id}`,
      'Loan Requestor': row?.loan?.loan_owner?.full_name,
      Status: row.status === 0 ? 'Action Pending' : row.status === 1 ? 'Approved' : 'Declined',
      Date: new Date(row.created_at).toLocaleDateString()
    }))
  }

  const parsePaginationLinks = (links) => {
    const parsedLinks = {};

    links.forEach((link) => {
      const label = link.label.toLowerCase();
      parsedLinks[label] = link.url;
    })

    return parsedLinks;
  }

  

  return (
    <Card>
      <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant='h6'>ALL GUARANTOR REQUEST</Typography>
        <Box sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Use the formatDataForCSVExport and formatSelectedDataForCSVExport functions */}
          <CSVLink
            data={formatDataForCSVExport(filteredData)} // Use selectedRows data
            //data={[...formatDataForCSVExport(filteredData), ...formatSelectedDataForCSVExport(selectedRows)]}
            headers={[
              { label: 'Loan ID', key: 'Loan ID' },
              { label: 'Loan Requestor', key: 'Loan Requestor' },
              { label: 'Status', key: 'Status' },
              { label: 'Date', key: 'Date' }
            ]}
            filename={'guarantors_requests.csv'}
            onClick={() => setExportCSVClicked(true)} // Set the flag when the button is clicked
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
              filename={'guarantors_requests.csv'}
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
      </CardContent>
      <DataGrid
        autoHeight
        pagination
        paginationMode="server"
        rows={filteredData}
        rowHeight={62}
        columns={columns}
        checkboxSelection
        selectionModel={selectedRows}
        //  pageSizeOptions={[5, 10]}
        onRowSelectionModelChange={onRowsSelectionHandler}
        pageSize={paginationModel.per_page}
        rowCount={paginationModel.total}
        onPageChange={(newPage) => handlePageChange(newPage + 1)}
      />
    </Card>
  )
}

export default GuarantorRequestDetails
