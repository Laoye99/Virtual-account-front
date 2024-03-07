// ** React Imports
import { forwardRef, useState, useEffect, useCallback, useContext } from 'react'

// ** Component Imports
import { Ability, AbilityBuilder } from '@casl/ability'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { AuthContext } from 'src/context/AuthContext'

// ** Axios
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

// ** Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles';

// ** Config

import authConfig from 'src/configs/auth'

// ** MUI Imports
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'

// ** Custom Components Imports
import { ExcelRenderer } from 'react-excel-renderer'; // Used for Excel rendering

import CustomAvatar from 'src/@core/components/mui/avatar'

const CustomInput = forwardRef((props, ref) => {
  return (
    <CustomTextField fullWidth {...props} inputRef={ref} label='Date of Birth (e.g 2000-01-31)' autoComplete='off' />
  )
})

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'



// Define a custom styled component for the table container
const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
  border: 1px solid #e0e0e0;
`;

const StyledFileInput = styled('input')({
  display: 'none',
});

const FileInputLabel = styled('label')({
  backgroundColor: '#f50606',
  color: '#ffffff',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'inline-block',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const FileInputContainer = styled('div')({
  marginTop: '16px',
});

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  // ** State
  const [open, setOpen] = useState(false)

  //const handleDialogToggle = () => setOpen(!open)
  const [name, setName] = useState('')
  const [displayname, setDisplayname] = useState('')
  const [description, setDescription] = useState('')
  const [filteredData, setFilteredData] = useState([]) // Add state for filtered data
  const [searchValue, setSearchValue] = useState('') // Add state for search value
  const [data, setData] = useState([])
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [excelData, setExcelData] = useState([])
  const [editDialogOpen, setEditDialogOpen] = useState(false) // Initially set to false
  const authContext = useContext(AuthContext)
  const ability = useContext(AbilityContext)


const StyledFileInput = styled('input')({
  display: 'none', // Hide the original file input
})

const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const handleFileChange = (e) => {
    e.preventDefault(); // Prevent the default behavior
    setEditDialogOpen(false)
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const isExcelFile =
        selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.xlsx');

      if (isExcelFile) {
        setFileName(selectedFile.name);

        // Use the react-excel-renderer library to parse Excel file
        ExcelRenderer(selectedFile, (err, resp) => {
          if (err) {
            console.log(err);
          } else {
            setExcelData(resp.rows);
            handleDialogToggle(); // Open the dialog to display Excel data
          }
        });
      } else {
        alert('Please choose a valid Excel file.');
        e.target.value = null;
        setFileName('');
      }
      setEditDialogOpen(true)
    }
    setEditDialogOpen(true)
  };

  const fetchData = useCallback(async () => {
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

      const response = await axios.get(`${BASE_URL}/admin/permission?page=1`, {
        params: { q: searchValue },
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      })
      setData(response.data[0]?.data)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }, [searchValue])

  useEffect(() => {
    // Fetch data on initial render
    fetchData()
  }, [fetchData])

  //  const handleFileChange = (e) => {
  //   const file = e.target.files[0]

  //   // Do something with the selected file, for example, store it in state
  //   setFile(file)
  // }


  const onSubmit = async e => {
    setOpen(false)

  //   e.preventDefault()
  //   const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  //   console.log(storedToken)

        // Gather the data to be sent
        const permissionData = {
          // name: name,
          // display_name: displayname,
          // description: description,
          excelData: excelData, // Include the Excel data in the payload
        }

     console.log(permissionData)

  //   // Make a POST request to your API endpoint
  //   try {
  //     // Make an HTTP PUT request to your endpoint
  //     const response = await axios.post(`${BASE_URL}/admin/permission/create`, permissionData, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //         'content-Type': 'application/json'
  //       }
  //     })

  //     if (response.status === 200) {
  //       toast.success(response.data.message)

  //       // // Wait for 3 seconds before reloading the window
  //       // setTimeout(() => {
  //       //   window.location.reload()
  //       // }, 2000) // 3000 milliseconds = 3 seconds

  //       // Redirect to another page after successful submission
  //       // router.push('/guarantor');
  //       fetchData()
  //     } else {
  //       console.error('Form submission failed with status:', response.status)
  //     }

  //     console.log('Form submitted successfully', response.data)
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //     console.error('Error submitting form', error)
  //   }
 }

  return (
    <>
      {/* {ability.can('sla:sla-settings-permissions:create', 'sla:sla-settings-permissions:create') && ( */}
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Data'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2, backgroundColor: '#f50606' }} variant='contained' onClick={handleDialogToggle}>
          Upload Excel
        </Button>
      </Box>

      <Dialog fullWidth maxWidth='md'onClose={() => {}} open={editDialogOpen}
      >
        <DialogTitle
          sx={{
            backgroundColor: '', // Background color
            color: '#fff', // Text color
            textAlign: 'center',
            padding: '16px', // Adjust the padding as needed
            display: 'flex', // Display as a flex container
            alignItems: 'center', // Vertically align items
            justifyContent: 'center' // Horizontally center item
          }}
        >
          <CustomAvatar skin='light' sx={{ width: 26, height: 26, color: '#007aff' }}>
            <Icon icon='tabler:file' fontSize='1.5rem' />
          </CustomAvatar>
          <Typography variant='h5' component='span' sx={{ mb: 2, color: 'gray', ml: 4, mt: 2 }}>
          Excel Data: {fileName}
          </Typography>
        </DialogTitle>
        <Divider sx={{ m: '0 !important' }} />
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            component='form'
            onSubmit={e => onSubmit(e)}
            sx={{
              mt: 4,
              mx: 'auto',
              width: '100%',
              maxWidth: 360,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
           <InputLabel sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Choose Excel File</InputLabel>
                <FileInputContainer>
                  <StyledFileInput
                    type="file"
                    accept=".xls, .xlsx"
                    onChange={handleFileChange}
                    id="excel-file-input"

                  />
                  <FileInputLabel htmlFor="excel-file-input">
                    {fileName ? `Selected: ${fileName}` : 'Browse File'}
                  </FileInputLabel>
                </FileInputContainer>
                       {/* <Button variant="contained" onClick={handleDialogToggle}>
                          Browse Excel
                        </Button> */}

                <label htmlFor="excel-file-input">
                  {/* Styled label to mimic the appearance of a button */}
                  <div
                    sx={{
                      backgroundColor: '#f50606',
                      color: '#ffffff',
                      padding: '10px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      display: 'inline-block',
                    }}
                  >
                    {fileName ? `Selected: ${fileName}` : 'Browse'}
                  </div>
                </label>


          </Box>
            {excelData.length > 0 ? (
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {excelData[0].map((header, index) => (
                    <TableCell key={index}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {excelData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {typeof cell === 'number'
                          ? cell.toFixed(2) // Format numbers to two decimal places
                          : cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        ) : (
          <Typography>No data to display</Typography>
        )}

            <Box className='demo-space-x' sx={{ '& > :last-child': { mr: '0 !important' } }}>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  backgroundColor: '#f50606', // Background color
                  color: '#fff', // Text color
                  '&:hover': {
                    backgroundColor: '#0056b3' // Hover background color
                  }
                }}
              >
                Upload
              </Button>

              <Button
                type='reset'
                variant='tonal'
                color='secondary'
                onClick={handleDialogToggle}
                sx={{
                  backgroundColor: '#e24040', // Background color
                  color: '#fff', // Text color
                  '&:hover': {
                    backgroundColor: '#c43131' // Hover background color
                  }
                }}

              >
                Close
              </Button>
            </Box>
        </DialogContent>
      </Dialog>
      {/* )} */}
    </>
  )
}

export default TableHeader
