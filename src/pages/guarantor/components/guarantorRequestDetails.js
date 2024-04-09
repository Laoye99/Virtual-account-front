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
  const [filteredData, setFilteredData] = useState([])
  const [searchValue, setSearchValue] = useState('')
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
  }, [searchValue, paginationModel.page]);



    const handlePageChange = (newPage) => {
      const nextPageUrl = paginationLinks.next_page_url;
      const prevPageUrl = paginationLinks.prev_page_url;


      if (newPage > currentPage && nextPageUrl) {

        fetchDataFromUrl(nextPageUrl);
      } else if (newPage < currentPage && prevPageUrl) {

        fetchDataFromUrl(prevPageUrl);
      }

      setCurrentPage(newPage);


    }

  const handleFilter = val => {
    setSearchValue(val)
  }

  useEffect(() => {

    const searchString = searchValue.toLowerCase()

    const filtered = data.filter(row => {
      const statusText = row.status === 0 ? 'in-progress' : row.status === 1 ? 'approved' : 'declined'

      return (
        row.id.toString().toLowerCase().includes(searchString) ||
        statusText.toLowerCase().includes(searchString) ||


        row.created_at.toLowerCase().includes(searchString)
      )
    })

    setFilteredData(filtered)
  }, [searchValue, data])

  useEffect(() => {

    const searchString = searchValue.toLowerCase()

    const selected = data.filter(row => {
      const statusText = row.status === 0 ? 'in-progress' : row.status === 1 ? 'approved' : 'declined'

      return (
        row.id.toString().toLowerCase().includes(searchString) ||
        statusText.toLowerCase().includes(searchString) ||


        row.created_at.toLowerCase().includes(searchString)
      )
    })

    setSelectedRows(selected)
  }, [searchValue, data])

  const onRowsSelectionHandler = ids => {
    const selectedRowsData = ids.map(id => {
      const rowData = filteredData.find(row => row.id === id)

      const additionalData = {
        LoanRequestor: rowData?.loan?.loan_owner?.full_name,
        status: rowData?.loan?.status,

        // Date: rowData.created_at,
        Date: new Date(rowData?.created_at).toLocaleDateString()
      }


      return {
        id: rowData?.id,
        ...additionalData
      }
    })

    console.log(selectedRowsData)
    setAtLeastOneCheckboxChecked(selectedRowsData.length > 0)
    setSelectedRows(selectedRowsData)

  }

  const formatSelectedDataForCSVExport = selectedRows => {


    if (exportCSVClicked) {

      const selectedData = selectedRows.map(rowId => {
        const row = data.find(item => item.id === rowId)

        return {
          'Loan ID': `#${row?.loan_id}`,
          'Loan Requestor': row?.loan?.loan_owner?.full_name,
          Status: row.status === 0 ? 'Action Pending' : row.status === 1 ? 'Approved' : 'Declined',
          Date: new Date(row.created_at).toLocaleDateString()
        }
      })



      return selectedData
    } else {
      return []
    }
  }


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

          <CSVLink
            data={formatDataForCSVExport(filteredData)}

            headers={[
              { label: 'Loan ID', key: 'Loan ID' },
              { label: 'Loan Requestor', key: 'Loan Requestor' },
              { label: 'Status', key: 'Status' },
              { label: 'Date', key: 'Date' }
            ]}
            filename={'guarantors_requests.csv'}
            onClick={() => setExportCSVClicked(true)}
          >
            <p
              style={{
                backgroundColor: '#f50606',
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
              data={selectedRows}
              filename={'guarantors_requests.csv'}
            >
              <p
                style={{
                  backgroundColor: '#f50606',
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
        onRowSelectionModelChange={onRowsSelectionHandler}
        pageSize={paginationModel.per_page}
        rowCount={paginationModel.total}
        onPageChange={(newPage) => handlePageChange(newPage + 1)}
      />
    </Card>
  )
}

export default GuarantorRequestDetails
