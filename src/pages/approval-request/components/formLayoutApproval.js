// React Imports
import { forwardRef, useState, useEffect, useContext } from 'react'
import { Input, Select, Space, Checkbox, Form, Radio, Modal, Popconfirm, Spin, message } from 'antd'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'

//import { MuiFileInput } from 'mui-file-input'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneArea } from 'material-ui-dropzone';

//import mammoth from 'mammoth';

//import { Modal } from '@material-ui/core';
//  Axios
import axios from 'axios'
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'

//  Next Import
import { useRouter } from 'next/router'
import { BASE_URL } from 'src/configs/constanst'

//  Config
import authConfig from 'src/configs/auth'
import { AuthContext } from 'src/context/AuthContext'

//  Context
import { useAuth } from 'src/hooks/useAuth'


// MUI Imports
import { CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//import DeleteIcon from '@mui/icons-material/Delete';
// import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import CustomChip from 'src/@core/components/mui/chip'
import TableRow from '@mui/material/TableRow'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import Card from '@mui/material/Card'
import TabPanel from '@mui/lab/TabPanel'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'; // Import the PDF icon

import OpenInNewIcon from '@material-ui/icons/OpenInNew'; // Import an appropriate icon

// import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CustomAvatar from 'src/@core/components/mui/avatar'

//  Custom Component Import
//  Third Party Imports
//import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { styled } from '@mui/system';
import {  Paper, Typography } from '@material-ui/core';
import { ExcelRenderer } from 'react-excel-renderer'; // Used for Excel rendering
import { makeStyles } from '@material-ui/core/styles'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomInput = forwardRef((props, ref) => {
  return (
    <CustomTextField fullWidth {...props} inputRef={ref} label='Date of First Installment' autoComplete='off' />
  )
})

const CustomInputt = forwardRef((props, ref) => {
  return (
    <CustomTextField fullWidth {...props} inputRef={ref} label='Date of Employment' autoComplete='off' />
  )
})

const StyledFileInput = styled('input')({
  // display: 'none',
 });



 const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   padding: theme.spacing(3),
  // },
  root: {
    '& .MuiTableRow-root:nth-of-type(odd)': {
      backgroundColor: 'transparent' // Set the background color to transparent for odd rows
    },
    '& .MuiTableRow-root:hover': {
      backgroundColor: 'transparent' // Set the background color to transparent for hover effect
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2),
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  preview: {
    margin: theme.spacing(1),
    maxWidth: '100%',
    maxHeight: 200,
    objectFit: 'contain',
  },
  cardContent: {
    padding: theme.spacing(2),
    backgroundColor: '#f0f0f0', // Add a background color
    borderRadius: theme.spacing(1), // Add some border radius
  },
  fileName: {
    // Customize the styling for file names
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1), // Add some spacing between file names
  },
}));



const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;

  & .MuiTableHead-root {
    background-color: ${(props) =>
      props.theme.palette.type === 'dark' ? 'transparent' : '#fff'};
    color: ${(props) => (props.theme.palette.type === 'dark' ? '#fff' : '#000')};
  }

  & .MuiTableCell-root {
    border-bottom: 2px solid #fff; /* You may adjust this */
    font-weight: 600;
  }

  & .MuiTableRow-root:nth-of-type(odd) {
    background-color: ${(props) =>
      props.theme.palette.type === 'dark' ? '#333' : '#f5f5f5'};
  }

  & .MuiTableRow-root:hover {
    background-color: ${(props) =>
      props.theme.palette.type === 'dark' ? '#555' : '#eff8ff'};
  }
`;

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },

    // ... other palette settings
  },
});

// const StyledButton = styled(Button)({
//   backgroundColor: '#1976D2',
//   color: '#fff',
//   padding: '4px 8px',
//   borderRadius: '2px',
//   boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
//   transition: 'background-color 0.3s, transform 0.2s',
//   '&:hover': {
//     backgroundColor: '#135193',
//     transform: 'scale(0.85)',
//   },
// });

// const MuiFileInputStyled = styled(MuiFileInput)`
//   & input + span {
//     backgroundColor: '#1976D2',
//     color: red;
//   }
// `



// Function to format the date (you can replace this with your specific date formatting logic)
const formatDateAndTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Use 24-hour clock
  };

return new Date(dateString).toLocaleString('en-US', options);
};

const FormLayoutsGuarantor  =  inboxId  => {
  const guarantor = inboxId.inboxId
  console.log(guarantor)

  //  States
  const [isToastShown, setIsToastShown] = useState(false)
  const [darkMode, setDarkMode] = useState(true);
  const [apiData, setApiData] = useState([])
  const [apiDatas, setApiDatas] = useState([])
  const [apiDataa, setApiDataa] = useState([])
  const [fileData, setFileData] = useState([])
  const [fileDataa, setFileDataa] = useState(null)
  const [apiDat, setApiDat] = useState([])
  const [apiDoc, setApiDoc] = useState([])
  const [apiElg, setApiElg] = useState([])
  const [value, setValue] = useState('personal-info')
  const [comment, setComment] = useState('')
  const [isValidDate, setIsValidDate] = useState(true)
  const [observation, setObservation] = useState('')
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [userRole, setUserRole] = useState('') // Add state for search value
  const authContext = useContext(AuthContext)
  const [months, setmonths] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false) // Initially set to false
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [open, setOpen] = useState(false)

    // const [amount, setAmount] = useState('')
    const [overdue_in_past_loan, setOverdue] = useState('')

    //const [outstanding_loan, setRunningloan] = useState('')
    const [ongoing_loan, setOngoingloan] = useState('')
    const [outstanding_loan, setOustandingloan] = useState('')
    const [probation, setProbation] = useState('')
    const [discipline, setDiscipline] = useState('')
    const [date, setDate] = useState(null)
    const [gross, setGross] = useState('')  //current_gross
    const [bonus, setBonus] = useState('')  //avg_net_bonus
    const [totalded, setTotalDeductions] = useState('')  //total_deductions
    const [totalnet, setTotalNet] = useState('')  //total_net_income
    const [avgnet, setAverageNet] = useState('')  //average_net_bonus
    const [installval, setInstallmentVal] = useState('') //set Installment Value
    const [emptenor, setEmpTenor] = useState('') //set Employment Tenor
    const [credapproved, setCreditCommApproved] = useState('') //set Credit Comm Approved
    const [appamt, setApprovedAmt] = useState('')  //set Approved Amount
    const [appmaturity, setApprovedMaturity] = useState('')  //set Approved Maturity
    const [appintrate, setApprovedIntRate] = useState('')  //set Approved Interest Rate
    const [appinstall, setApprovedInstallment] = useState('')  //set Approved Installment
    const [firstinst, setDateFirstInstall] = useState('')  //set Date First Install
    const [monthg, setMonthGross] = useState('')  //average_net_bonus
    const [monthp, setMonthPay] = useState('')  //average_net_bonus
    const [empdate, setDateOfEmployment] = useState('')  //set Date First Install
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [excelData, setExcelData] = useState([]);
    const [filePreview, setFilePreview] = useState(null);


  // console.log('jjjjjjjjjjjj',apiData)
  // console.log('ttttttttttttttt',apiDataa)
   console.log('pppppppppppppp',apiDat)
   console.log('check dataatatatatat',apiData)
   console.log('check dataatatatatat',apiDatas)
   console.log('documents yapaaaaaaaaaaa',apiDoc)
  console.log('Na my file data be this o o o', fileDataa);

  // console.log(typeof fileData);
  // console.log('file Data forgetttttt', fileDataa?.[0]);
  // console.log('my filedata type is shown:', typeof fileDataa?.[0]);

   // Ensure fileDataa is always an array
   const filesArray = Array.isArray(fileData) ? fileData : [fileData];

  //  console.log('filesArray', filesArray)
  //  console.log('filesArraytypeppppppppppppppppppppp', typeof filesArray)
  //  console.log('comeeeeeeeeeeeeeeeeeeeeeeeee', typeof comment)

  // ** Hooks
  const router = useRouter()

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  //const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)



  const formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }


  const handleDate = e => {
    console.log(formatDate(e))

    // const value = e.target.value
    // handleDate('2023-03-03')
    setDateFirstInstall(formatDate(e))

    // console.log('gggg',dob)

    //Check if the input matches the 'yyyy-mm-dd' format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    if (dateRegex.test(e)) {
      setIsValidDate(true)
    } else {
      setIsValidDate(false)
    }
  }



  const handleDatee = e => {
    //console.log(formatDate(e))

    // const value = e.target.value
    // handleDate('2023-03-03')
    setDateOfEmployment(formatDate(e))

    // console.log('gggg',dob)

    //Check if the input matches the 'yyyy-mm-dd' format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    if (dateRegex.test(e)) {
      setIsValidDate(true)
    } else {
      setIsValidDate(false)
    }
  }

  const handleMonthGross = e => {
    const value = e.target.value

    // Ensure only numeric characters are accepted
    if (/^\d*$/.test(value)) {
      setMonthGross(value)
    }
  }

  const handleMonthPay = e => {
    const value = e.target.value

    // Ensure only numeric characters are accepted
    if (/^\d*$/.test(value)) {
      setMonthPay(value)
    }
  }


  const handleInputChange = (e, setterFunction) => {
    const value = e.target.value;

    // Ensure only numeric characters are accepted
    if (/^\d*$/.test(value)) {
      setterFunction(value);
    }
  };

  const handleInputChange2 = (e, setValue) => {
    const value = e.target.value;

    // Ensure only numeric characters and at most one decimal point are accepted
    if (/^\d*\.?\d*$/.test(value)) {
      setApprovedIntRate(value);
    }
  };




  // Create a state variable to track form submission
  const [isFormDataValid, setIsFormDataValid] = useState(false)


  const [file, setFile] = React.useState(null)

  const handleChange = (newFile) => {
    setFile(newFile)
  }

  const { user } = authContext

  //console.log(user.role)
  const approvalHandler = user.role

  //console.log('approvalHandlerbbbbbbbbbbbbbbb',approvalHandler)
  useEffect(() => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)


    const fetchData = async () => {
      try {
        //const response = await axios.get(`${BASE_URL}/autoloan/loan/view-loan/${guarantor}`, {
        const response = await axios.get(`${BASE_URL}/autoloan/loan-approval/${guarantor}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'content-Type': 'application/json'
          }
        })

       // setApiData(response.data.data) // Update the state with the fetched data
        //console.log(typeof response.data.data);
        const loanArray = Object.values(response?.data?.data);

      // Now you can use map
      loanArray.map(item => item.data)

      // Set your state with the mapped data
        // setApiData(loanArray);
        // console.log('xxxxxxxxxxxx',apiData)
      //  console.log('loanArray',loanArray)
      //   console.log('record fetched', response.data.data)

      //  console.log(response.data.data.loan.status)
      //  console.log('apiData',apiData)
        // console.log('kkkkkkkkkkk',response?.data?.data[0])
        // console.log('ayueeeeeeeeeeyy',response?.data?.data[0].loan)
        const dataa = response?.data?.data[0]?.loan
        const datas = response?.data?.data[0]
        const repayment = response?.data?.data[0]?.loan_details
        const repaymentt = response?.data?.data[0]?.loan_details?.repayment
        const document = response?.data?.data[0]?.loan?.documents
        setApiData(dataa)
        setApiDatas(datas)
        setApiDataa(repayment)
        setApiDat(repaymentt)
        setApiDoc(document)

         // console.log(typeof response.data.repaymentt);
      const repaymentArray = Object.values(response?.data?.repaymentt);

      // Now you can use map
      repaymentArray.map(item => item.repaymentt)

      // Set your state with the mapped data
        setApiDataa(repaymentArray);


      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }


    fetchData() // Invoke the function to fetch data
  }, []) // Empty dependency array ensures this effect runs once after the component is mounted



  const calculateLoanDetails = async e => {
    // Disable the button
    setButtonDisabled(true)

e.preventDefault()
const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  // You can access form values from the state (amount, tenor, etc.)
  const monthly_gross_pay = parseFloat(monthg);
  const monthly_net_pay = parseFloat(monthp);

 // const loantype = loantype;
  const formData = { date_of_employment: empdate, monthly_gross_pay: monthg, monthly_net_pay: monthp}

   // Check if all fields in the formData are not empty or null
   const isFormDataValid = Object.values(formData).every(value => value !== '' && value !== null)

   if (!isFormDataValid) {
     setTimeout(() => {
       // Re-enable the button
       setButtonDisabled(false)
     }, 2000) // Adjust the time (in milliseconds) to your desired delay
     // At least one field is empty or null, display an error message or handle it as needed.
     console.error('Oops!!! All fields are required')
     toast.error('Oops!!! All fields are required')

     return
   } else {}

try {
  // Make an HTTP PUT request to your endpoint

  const response = await axios.post(`${BASE_URL}/autoloan/loan/eligibility`, formData, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
      'content-Type': 'application/json',
    },
  })

  console.log(response.status)

  if (response.status === 200 ) {

   // console.log('response checkingggggggggg', response.data)

    setApiElg(response.data)


  } else {
    console.error('Request not successful:', response.status)
  }
} catch (error) {
  toast.error(error?.response?.data?.message)
  console.error('Error processing Request', error)
}
  finally {
  setTimeout(() => {
    // Re-enable the button
    setButtonDisabled(false)
  }, 2000) // Adjust the time (in milliseconds) to your desired delay
}

}

const [modalData, setModalData] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [modalUrl, setModalUrl] = useState(null);
const handleDialogToggle = () => setOpen(!open);

//const openModal = () => setOpen(!open);

const classes = useStyles();
const [selectedFiles, setSelectedFiles] = useState([]);


const number =selectedFiles.length - 1
  console.log('lllsdfedre',number)

const handleFileChange = (files) => {
  //console.log('typeofvfssssssssssssssssssssssssssss', typeof files)
  setSelectedFiles(files);
  setFilePreview(null); // Reset the filePreview state
  //console.log('vvvvvvvvvvvvvvv', selectedFiles);
  setFileDataa(files);

  //setFileDataa(files.map(file => file.name));

  setFileData(files.map(file => file.name));

 // console.log('Na my file data be this o o o', fileData);
  files.forEach((file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();

   if (fileExtension === 'pdf') {
      // Handle PDF file logic
      //console.log('PDF file:', file.name);
      // Implement logic for PDF files
      handlePdfFile(file);
    } else if (['docx'].includes(fileExtension)) {
      // Handle image file logic
     // console.log('Image file:', file.name);
      // Implement logic for image files
      handleImageFile(file);

     // await handleDocxFile(file);
    } else {
      // Unsupported file type
     //console.log('Unsupported file type:', file.name);
      alert('Please choose a valid file with the following extensions: pdf, docx');
      files.target.value = null;
      setSelectedFiles('');
    }
  });
};


// const handleExcelFile = (file) => {
//   console.log('Excel file:', file.name);

//   // Use the react-excel-renderer library to parse Excel file
//   ExcelRenderer(file, (err, resp) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // Handle the parsed Excel data
//       setExcelData(resp.rows);

//       setFilePreview('Excel file parsed successfully');
//       //setOpenPreviewDialog(true);
//       handleDialogToggle(); // Open the dialog to display Excel data

//     }
//   });
// };

// Function to handle Docx file
// const handleDocxFile = async file => {
//   const reader = new FileReader();

//   reader.onload = async function (e) {
//     const result = e.target.result;

//     // Use mammoth to convert Docx to HTML
//     const { value } = await mammoth.extractRawText({ arrayBuffer: result });

//     // Display the HTML content
//     setFilePreview(value);
//   }

//   reader.readAsArrayBuffer(file)
// }

const handlePdfFile = (file) => {
console.log('PDF file:', file.name);

// Implement logic for PDF files
// Example: Open the PDF in a new tab
// window.open(URL.createObjectURL(file));
// For demonstration purposes, let's just set the preview to the file name
setFilePreview(file.name);

//setOpenPreviewDialog(true);
handleDialogToggle(); // Open the dialog to display Excel data
};

const handleImageFile = (file) => {
console.log('Image file:', file.name);

// Implement logic for image files
// Example: Display the image using an HTML img element
// setFilePreview(URL.createObjectURL(file));
setFilePreview(URL.createObjectURL(file));

//setOpenPreviewDialog(true);
handleDialogToggle(); // Open the dialog to display Excel data
};

const handleClosePreviewDialog = () => {
setOpenPreviewDialog(false);
setFilePreview(null);
};



  const handleSubmitHr = async e => {
    // Disable the button
    setButtonDisabled(true)

    if (e) {
      e.preventDefault()
    }

    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const formData = {
      outstanding_loan: outstanding_loan,
      ongoing_loan: ongoing_loan,
      overdue_in_past_loan: overdue_in_past_loan,
      probation: probation,
      discipline: discipline,
      current_gross: gross,
      avg_net_bonus: bonus,
      total_deductions: totalded,
      total_net_income: totalnet,
      average_net_bonus: avgnet,
      max_installment_val: installval,
      emp_tenor: emptenor,
      cred_comm_app: credapproved,
      appr_amount: appamt,
      appr_maturity: appmaturity,
      appr_int_rate: appintrate,
      appr_intsallment: appinstall,
      date_first_insall: firstinst,
      observations: guarantor,
      approved: 1,
      comment: comment

    }


      // Check if all fields in the formData are not empty or null
    const isFormDataValid = Object.values(formData).every(value => value !== '' && value !== null)

    if (!isFormDataValid) {
      setTimeout(() => {
        // Re-enable the button
        setButtonDisabled(false)
      }, 2000) // Adjust the time (in milliseconds) to your desired delay
      // At least one field is empty or null, display an error message or handle it as needed.
      console.error('Oops!!! All fields are required')
      toast.error('Oops!!! All fields are required')

      return
    } else {}


     console.log('hereeee2222222222')
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/autoloan/loan-approval/hr/${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })

      if (response.status === 200 && !isToastShown) {
        toast.success('Hr Approval successful', response.data)
        console.log('Hr Approval successful', response.data)
        setIsToastShown(true)

              // Redirect to another page after successful submission
              router.push('/approval-request')
            } else {
              console.error('Form submission failed with status:', response.status)
            }

            console.log('Form submitted successfully', response.data)

      // Redirect to another page after successful submission

    } catch (error) {
      toast.error( error?.response?.data?.message)
      console.error('Error Approving Request', error)
      console.error('Error Approving Request haaaaaaaahhahah', error.response.data.message)
    }
    finally {
        setButtonDisabled(false)

    }
  }


  const handleSubmit = async e => {

     // Disable the button
     setButtonDisabled(true)

    if (e) {
      e.preventDefault()
    }


    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  // Ensure fileDataa is always an array
    const filesArray = Array.isArray(fileDataa) ? fileDataa : [fileDataa];

  const formData = {
    id: guarantor,
    approved: 1,
    comment: comment,
    document: fileDataa
  }

  // const formData = new FormData();
  // formData.append('id', guarantor);
  // formData.append('approved', 1);
  // formData.append('comment', comment);

  // fileDataa.forEach((file, index) => {
  //   formData.append(`document[${index}]`, file);
  // });
   console.log('formData',formData)
    console.log(formData)

     // Check if all fields in the formData are not empty or null
     const isFormDataValid = Object.values(formData).every(value => value !== '' && value !== null)

     if (!isFormDataValid) {
       setTimeout(() => {
         // Re-enable the button
         setButtonDisabled(false)
       }, 2000) // Adjust the time (in milliseconds) to your desired delay
       // At least one field is empty or null, display an error message or handle it as needed.
       console.error('Oops!!! All fields are required')
       toast.error('Oops!!! All fields are required')

       return
     } else {}

    try {
      const response = await axios.post(`${BASE_URL}/autoloan/loan-approval/${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Request Approved successfully')
      console.log('Request Approved successfully', response.data)

      // Redirect to another page after successful submission
      router.push('/approval-request')
    } catch (error) {
      toast.error( error?.response?.data?.message)
      console.error('Error Approving Request', error?.response?.data?.message)
    }
    finally {
      setButtonDisabled(false)
    }
  }

  const handleDecline = async e => {
    setButtonDisabled(true)
    if (e) {
      e.preventDefault()
    }
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)


    const formData = {
      id: guarantor,
      approved: 2,
      comment: comment,
      document: fileDataa
    }

    //console.log(formData)
    try {
      // Make an HTTP POST request to your endpoint
      const response = await axios.post(`${BASE_URL}/autoloan/loan-approval/${guarantor}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'application/json'
        }
      })
      toast.success('Request Declined Successfully')
      console.log('Request Declined successfully', response.data)
      router.push('/approval-request')
    } catch (error) {
      toast.error( error?.response?.data?.message)
      console.error('Error Declining Request', error)
    } finally {
      setButtonDisabled(false)
    }
  }

     // Map through the array and extract the 'repayment' property
     const headerKeys = Object.keys(apiDat?.[0] ?? {});

  //console.log('table head',headerKeys)

  const headerKeyss = Object.keys(apiDoc[0] ?? {});

  //console.log('file upload preview head',headerKeyss)



  const handleModalClose = () => {
    // Add any additional cleanup logic if needed
    setOpenModal(false);
  };

  // const handleModalClose = () => {
  //   setIsModalVisible(false);
  // };

  const showCustomModal = () => {
    setIsModalVisible(true);

    // Add any additional logic you need when showing the modal
  };



  // Function to handle button click
  const handleButtonClick = (url) => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${storedToken}`,

        // Add other headers if required by the API
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Check if the response is a PDF, image, excel or other binary data
      const contentType = response.headers.get('content-type');

      if (contentType.includes('application/pdf')) {
        // Handle PDF files
        return response.blob();
      } else if (contentType.startsWith('image/')) {
        // Handle image files (e.g., image/jpeg, image/png, etc.)
        return response.blob();
      } else if (
        contentType === 'application/vnd.ms-excel' ||
        contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        // Handle Excel files
        return response.arrayBuffer();
      } else {
        // Handle other types as plain text
        return response.text();
      }

      })
      .then(data => {
        //console.log(data);

        // Handle the response data or update state as needed
        if (typeof data === 'string') {
          // Handle text data
          // For example, setModalUrl(data) if data is a URL string
        } else {
          // Handle binary data
          const blobUrl = URL.createObjectURL(data);
          setModalUrl(blobUrl);
        }

        setOpenModal(true);
      })
      .catch(error => {
        // Handle errors, e.g., show an error message to the user
        console.error('Error:', error.message);
      });
  }


  // Function to handle file deletion
  const handleDeleteFile = (index) => {
    const updatedFiles = [...fileDataa];
    updatedFiles.splice(index, 1); // Remove the file at the specified index
    setFileData(updatedFiles); // Update the state
    setFileDataa(updatedFiles); // Update the setFileDataa state as well, case closed
    setSelectedFiles(updatedFiles); //  Update the setSelectedFiles state as well, case closed
  };


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
          <legend>Loan Details</legend>
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
              {apiData ? ( // Check if data property exists
                <TableBody key={apiData?.id}>
                  <TableRow>
                    <TableCell>Applicant ID:</TableCell>
                    <TableCell>{apiData?.staff_id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applicant Name:</TableCell>
                    <TableCell>{apiData?.loan_owner?.full_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Applied Maturity:</TableCell>
                    <TableCell>{apiData?.maturity} Month(s)</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Loan Amount:</TableCell>
                    <TableCell>
                      {parseFloat(apiData?.amount).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'NGN'
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status:</TableCell>
                    <TableCell>
                      {apiData?.status == 0 ? (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='In Progress'
                          color='warning'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ) : apiData?.status == 1 ? (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Approved'
                          color='success'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ) : apiData?.status == 2 ? (
                        <CustomChip
                          rounded
                          skin='light'
                          size='small'
                          label='Declined'
                          color='secondary'
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ) : (
                        <span>Unknown</span>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Loan Type:</TableCell>
                    <TableCell>{apiData?.loan_type}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>First Guarantor:</TableCell>
                    <TableCell>{apiDatas?.guarantor1}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Second Guarantor:</TableCell>
                    <TableCell>{apiDatas?.guarantor2}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Created At:</TableCell>
                    <TableCell>{apiDatas?.created_at ? new Date(apiDatas?.created_at).toLocaleString() : ''}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Updated At:</TableCell>
                    <TableCell>{apiDatas?.updated_at ? new Date(apiDatas?.updated_at).toLocaleString() : ''}</TableCell>
                  </TableRow>
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
        </fieldset>

        <Divider sx={{ m: '0 !important' }} />
        {apiData?.status == 0 ? (
          <Accordion>
            <AccordionSummary sx={{ backgroundColor: '#f50606', color: 'white' }}>
              <Typography style={{ color: '#fff' }}>View Repayment Schedule</Typography>
            </AccordionSummary>
            <AccordionDetails >
            <div style={{ display: 'block', width: '100%',  '@media screen and (max-width: 780px)': {
                  display: 'block'
                  }, }}>
             <CardActions style={{ display: 'flex', flexDirection: 'column', overflowX: "scroll", flex: '1', width: '100%' }}>
               <fieldset style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <legend>Preview</legend>
                     <StyledTableContainer component={Paper} className={classes.root}>
                        {apiData ? ( // Check if data property exists
                    //  console.log('Api Data',apiData)
                      <Table >
                        <TableBody key={apiDataa}>
                            <TableRow >
                                <TableCell >Amount</TableCell>
                                <TableCell>&#8358;
                                  {typeof apiDataa?.total === 'number'
                                    ? apiDataa?.total.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : apiDataa?.total}
                                </TableCell>
                                <TableCell >interest rate</TableCell>
                                <TableCell >{apiDataa?.interest_rate}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell >sum capital</TableCell>
                                <TableCell>&#8358;
                                  {typeof apiDataa?.amount === 'number'
                                    ? apiDataa?.amount?.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : apiDataa?.amount}
                                </TableCell>
                                <TableCell >sum interests</TableCell>
                                <TableCell>&#8358;
                                  {typeof apiDataa?.sum_interests === 'number'
                                    ? apiDataa?.sum_interests?.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : apiDataa?.sum_interests}
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell >installment</TableCell>
                                <TableCell>&#8358;
                                  {typeof apiDataa?.installment === 'number'
                                    ? apiDataa?.installment?.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : apiDataa?.installment}
                                </TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableBody>
                      </Table>
                  ) : null}
                  </StyledTableContainer>
                {apiDat?.length > 0 ? (
                    <StyledTableContainer component={Paper} className={classes.root}>
                      <Table>
                      <TableHead>
                    <TableRow>
                      {headerKeys.map((header, index) => (
                        <TableCell key={index}>{header}(&#8358;)</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                        <TableBody>
                          {apiDat?.slice(0)?.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                              <TableCell key={cellIndex}>
                              {typeof cell === 'number'
                                ? cell.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })
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
                </fieldset>
                </CardActions>
                <CardActions style={{ display: 'flex', flexDirection: 'column', flex: '1', mt: 15}}>
                {approvalHandler == 'Hr' && (
                <fieldset style={{ display: 'flex', flexDirection: 'column', width: '100%', mb:5}} >
                <legend>Eligibility Check</legend>
                <StyledTableContainer component={Paper} className={classes.root}>
                <form onSubmit={calculateLoanDetails}>
                  <CardContent>
                    <TabPanel sx={{ p: 0 }} value='personal-info'>
                      <Grid container spacing={5}  sx={{ p: 0 }} >
                      <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                          <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label='Date of Employment (e.g 2000-01-31)'
                              customInput={<CustomInputt />}
                              selected={date}
                              onChange={date => handleDatee(date)}
                              placeholder='Date of Employment'
                              helperText={!isValidDate ? 'Invalid date format (yyyy-mm-dd)' : ''}
                              value={empdate}
                              maxDate={dayjs()}

                              // filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} // weekends cancel
                              // showYearDropdown // year show and scrolldown alos
                              // scrollableYearDropdown
                            />
                         </LocalizationProvider>
                          </DatePickerWrapper>
                        </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                fullWidth
                                label='Monthly Gross Pay'
                                placeholder='Monthly Gross Pay'
                                value={monthg}
                                type='text' // Input type as number
                               // onChange={e => setMonthGross(e.target.value)}
                                inputProps={{ pattern: '[0-9]*' }}
                                onChange={(e) => handleInputChange(e, setMonthGross)}

                              // onChange={handleMonthGross}
                              />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomTextField
                              fullWidth
                              label='Monthly Net Pay'
                              placeholder='Monthly Net Pay'
                              value={monthp}
                              type='text' // Input type as number
                             // onChange={e => setMonthPay(e.target.value)}
                              inputProps={{ pattern: '[0-9]*' }}
                              onChange={(e) => handleInputChange(e, setMonthPay)}

                             // onChange={handleAmount}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <CardActions sx={{  mb: 2, mt: 2 }}>
                            <Button
                              type='submit'
                              sx={{ mr: 2, backgroundColor: '#f50606' }}
                              variant='contained'
                              onClick={calculateLoanDetails}
                              disabled={isButtonDisabled}
                            >
                              {isButtonDisabled ? 'Processing...' : 'Check'}
                            </Button>
                            </CardActions>
                        </Grid>
                      </Grid>
                    </TabPanel>
                  </CardContent>
                </form>
                </StyledTableContainer >
                <StyledTableContainer component={Paper} className={classes.root}>
                {apiElg ? ( // Check if data property exists
              //  console.log('Api Data',apiData)
                      <Table>
                        <TableBody key={apiElg}>
                            <TableRow >
                                <TableCell >Maximum Installment</TableCell>
                                <TableCell>&#8358;
                                  {typeof apiElg?.maximum_installment === 'number'
                                    ? apiElg?.maximum_installment.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : apiElg?.maximum_installment}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >Tenure in Months</TableCell>
                                <TableCell >{apiElg?.tenure_in_months}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell >Maximum Installment (60%)</TableCell>
                                <TableCell>&#8358;
                                  {typeof apiElg?.maximum_installment_60 === 'number'
                                    ? apiElg?.maximum_installment_60.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : apiElg?.maximum_installment_60}
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell >Maximum Installment (70%)</TableCell>
                                <TableCell>&#8358;
                                  {typeof apiElg?.maximum_installment_70 === 'number'
                                    ? apiElg?.maximum_installment_70.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })
                                    : apiElg?.maximum_installment_70}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                      </Table>
                  ) : null}
                  </StyledTableContainer>

                </fieldset>
                )}
              </CardActions>
              </div>
            </AccordionDetails>
          </Accordion>
        ) : null}

        <Divider sx={{ m: '0 !important' }} />


        {approvalHandler == 'Hr' && apiData?.status == 0 && apiDatas?.stage == 2.00 && (
          <Accordion>
          <AccordionSummary sx={{ backgroundColor: '#f50606', color: 'white' }}>
            <Typography style={{ color: '#fff' }}>View HR Approval Form</Typography>
          </AccordionSummary>
          <AccordionDetails >
        <fieldset sx={{ marginBottom: '1200px' }}>
          <legend>HR Approval View
                {/* <StyledButton sx={{ mb: 2, mt: 2 }} variant='contained' onClick={handleDialogToggle}>
                 Eligibility Check
                </StyledButton>    */}
          </legend>




          <form onSubmit={handleSubmitHr}>
            <CardContent>
              <TabPanel sx={{ p: 0 }} value='personal-info'>
                <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Have Outstanding Loan?'
                      placeholder='Have Outstanding Loan?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: outstanding_loan,
                        onChange: e => setOustandingloan(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Have Ongoing Loan?'
                      placeholder='Have Ongoing Loan?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: ongoing_loan,
                        onChange: e => setOngoingloan(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Have overdue in past Loan?'
                      placeholder='Have overdue in past Loan?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: overdue_in_past_loan,
                        onChange: e => setOverdue(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Probation?'
                      placeholder='Probation?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: probation,
                        onChange: e => setProbation(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Disciplinary Actions?'
                      placeholder='Disciplinary Actions?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: discipline,
                        onChange: e => setDiscipline(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    label='Current Gross'
                    placeholder='Current Gross'

                    //type="number"
                    value={gross}

                   // onChange={(e) => setGross(e.target.value)}
                    type='text' // Input type as number
                     inputProps={{ pattern: '[0-9]*' }}
                     onChange={(e) => handleInputChange(e, setGross)}
                  />
                </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Avg. Net Bonus'
                      placeholder='Avg. Net Bonus'
                      value={bonus}

                      //onChange={e => setBonus(e.target.value)}
                      type='text' // Input type as number
                     inputProps={{ pattern: '[0-9]*' }}
                     onChange={(e) => handleInputChange(e, setBonus)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Total Deductions'
                      placeholder='Total Deductions'
                      value={totalded}

                     // onChange={e => setTotalDeductions(e.target.value)}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange(e, setTotalDeductions)}

                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Total Net Income'
                      placeholder='Total Net Income'
                      value={totalnet}

                     // onChange={e => setTotalNet(e.target.value)}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange(e, setTotalNet)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Avg. Net Bonus'
                      placeholder='Avg. Net Bonus'
                      value={avgnet}

                      //onChange={e => setAverageNet(e.target.value)}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange(e, setAverageNet)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Max. Installment Value'
                      placeholder='Max. Installment Value'
                      value={installval}

                     // onChange={e => setInstallmentVal(e.target.value)}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange(e, setInstallmentVal)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Employment Tenor'
                      placeholder='Employment Tenor'
                      value={emptenor}

                     // onChange={e => setEmpTenor(e.target.value)}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange(e, setEmpTenor)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Approved Amount'
                      placeholder='Approved Amount'
                      value={appamt}

                     // onChange={e => setApprovedAmt(e.target.value)}
                     type='text' // Input type as number
                     inputProps={{ pattern: '[0-9]*' }}
                     onChange={(e) => handleInputChange(e, setApprovedAmt)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Approved Maturity'
                      placeholder='Approved Maturity'
                      value={appmaturity}

                     // onChange={e => setApprovedMaturity(e.target.value)}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange(e, setApprovedMaturity)}

                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Approved Interest Rate'
                      placeholder='Approved Interest Rate'
                      value={appintrate}

                      //onChange={e => setApprovedIntRate(e.target.value)}
                      type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange2(e, setApprovedIntRate)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      fullWidth
                      label='Approved Installment'
                      placeholder='Approved Installment'
                      value={appinstall}

                     // onChange={e => setApprovedInstallment(e.target.value)}
                     type='text' // Input type as number
                      inputProps={{ pattern: '[0-9]*' }}
                      onChange={(e) => handleInputChange(e, setApprovedInstallment)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ mb: 5 }}>
                      <DatePickerWrapper sx={{ '& .MuiFormControl-root': { width: '100%' } }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label='Date of First Installment (e.g 2000-01-31)'
                          customInput={<CustomInput />}
                          selected={date}
                          onChange={date => handleDate(date)}
                          placeholder='Date of First Installment'
                          helperText={!isValidDate ? 'Invalid date format (yyyy-mm-dd)' : ''}
                          value={firstinst}
                          minDate={dayjs()}

                          // filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} // weekends cancel
                         // maxDate={dayjs()}
                          // showYearDropdown // year show and scrolldown alos
                          // scrollableYearDropdown
                        />
                         </LocalizationProvider>
                      </DatePickerWrapper>


                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Credit Committe Approval?'
                      placeholder='Credit Committe Approval?'
                      id='form-layouts-tabs-multiple-select'
                      SelectProps={{
                        multiple: false,
                        value: credapproved,
                        onChange: e => setCreditCommApproved(e.target.value)
                      }}
                    >
                      <MenuItem value='1'>YES</MenuItem>
                      <MenuItem value='0'>NO</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      fullWidth
                      label='observation'
                      placeholder='Enter your observation here'
                      value={observation}
                      onChange={e => setObservation(e.target.value)}
                    />
                  </Grid>


                </Grid>
              </TabPanel>
            </CardContent>

          </form>
        </fieldset>
        </AccordionDetails>
          </Accordion>
        )}



        <Divider sx={{ m: '0 !important' }} />
        {apiData?.status == 0 ? (
          <Accordion>
            <AccordionSummary sx={{ backgroundColor: '#f50606', color: 'white' }}>
              <Typography style={{ color: '#fff' }}>Approval History/Justification</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            {approvalHandler == 'Credit Department' && (
              <CardActions>
              <fieldset style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <legend>CRC File Upload</legend>
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CardContent>
              <Paper elevation={3} className={classes.root}>
                <CloudUploadIcon className={classes.icon} color="primary" />
                <Typography variant="h6" color="primary">
                  Upload Files
                </Typography>
                <div>
                <DropzoneArea

                    // acceptedFiles={['image/*', '.pdf', '.xls', '.xlsx']}
                    acceptedFiles={[ '.pdf', '.docx']}
                    onChange={handleFileChange}
                    showAlerts={false}
                    dropzoneText="Drag and drop  PDFs, docx files here or Click to Upload, File Shouldn't be more than 1MB"
                    showPreviewsInDropzone={false}
                    showPreviews={false}
                    filesLimit={10} // Set your preferred limit
                  />
                </div>

                <Dialog fullWidth maxWidth="md" onClose={handleDialogToggle} open={open}>
              <DialogTitle>File Preview: {filePreview}</DialogTitle>
              <Divider />
              <DialogContent>
                      {filePreview && (
                        <div>
                        <Typography>Preview:</Typography>
                         {/* Render the file preview based on its type */}
                         {selectedFiles[0]?.type === 'application/pdf' ? (
                          <iframe
                           title='PDF Preview'
                            src={URL?.createObjectURL(selectedFiles[number])}
                            width='100%'
                            height='500px'
                            style={{ border: 'none' }}
                           />
                         ) : (
                            <img
                            src={filePreview}
                            alt='File Preview'
                            style={{ maxWidth: '100%', maxHeight: '400px' }}
                             />
                               )}
                            </div>
                            )}
                        </DialogContent>
                   </Dialog>
               </Paper>

              </CardContent>
               {/* Display the selected file names in CardContext */}
               <CardContent className={classes.cardContent}>
                <Typography variant='body1' color='textSecondary'>
                    Selected Files:
                     </Typography>
                      {selectedFiles.map((file, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="textSecondary" className={classes.fileName}>
                       {file.name}
                        </Typography>
                        {/* Delete icon */}
                      <IconButton onClick={() => handleDeleteFile(index)} color="error">
                      <Icon icon='tabler:trash' />
                    </IconButton>
                  </div>
                 ))}
              </CardContent>
              </Box>

              </fieldset>
              </CardActions>
              )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CardActions>
              <fieldset style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <legend>Uploaded File(s) Preview</legend>
                  {apiDoc?.length > 0 ? (
                    <StyledTableContainer component={Paper} className={classes.root}>
                      <Table>
                      <TableHead>
                    <TableRow>
                      {headerKeyss.map((header, index) => (
                        <TableCell key={index}>
                        {index === 0 ? 'File Attached' : header}
                      </TableCell>
                    ))}
                    </TableRow>
                  </TableHead>
                    <TableBody>
                        {apiDoc?.slice(0)?.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                              <TableCell key={cellIndex}>
                              {cellIndex === 0 ? (

                                 // If it's the first cell, render a clickable button with a PDF icon
                                <Button
                                style={{ padding: 0, minWidth: 0 }} // Customize the inline styles as needed
                                onClick={() => handleButtonClick(cell)}
                              >
                                <PictureAsPdfIcon />
                              </Button>
                              ) : cellIndex === 2 ? (

                                // If it's the third cell (index 2), format the date
                                <>{formatDateAndTime(cell)}</>
                              ) : (

                                // If it's not the first cell, render the cell content
                                typeof cell === 'number'
                                  ? cell.toLocaleString('en-US', {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })
                                  : cell
                              )}
                            </TableCell>

                            ))}
                          </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </StyledTableContainer>
                  ) : (
                    <Typography>No File Uploaded Yet</Typography>
                  )}
                 </fieldset>
                   {/* Your modal code... */}
                     <Modal
                            title="File Attached"
                            visible={isModalVisible} open={openModal}
                            onCancel={handleModalClose}
                            style={{ width: '300%', }}
                      >
                      <div  >
                        {/* Render iframe with modalUrl */}
                        {modalUrl && (
                          <iframe
                            title="Modal Preview"
                            src={modalUrl}
                            width="100%"
                            height="500px"
                            style={{ border: 'none' }}
                          />
                        )}
                      </div>

                    </Modal>
              </CardActions>
              </div>
              <CardActions>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', justifyContent: 'left' }}>
                    <TextareaAutosize
                      minRows={8}
                      placeholder='Enter your comments here...'
                      style={{
                        flex: 1, // This makes the TextareaAutosize component take available space
                        maxWidth: '100%', // Ensure it doesn't exceed the screen width
                        minWidth: '300px', // Set a minimum width for larger screens
                        marginBottom: '1rem',
                        padding: '1px',
                        border: '1px solid #ccc',
                        alignItems: 'left',
                        marginRight: 'auto' // Align to the left
                      }}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', width: '60%' }}>
                  {approvalHandler == 'Hr' && apiData?.status == 0 && (
                  <Button
                      type='submit'
                      sx={{ backgroundColor: '#f50606', color: '#fff', marginRight: '10px' }}
                      disabled={isButtonDisabled}
                      variant='contained'
                      onClick={e => {
                        if (comment.trim() === '') {
                          // Display an alert if the comment is empty
                          window.alert('Kindly Input Comment.')

                          return
                        }
                        e.preventDefault() // Add this line
                        if (window.confirm('Are you sure you want to process this request for HR Approval?')) {
                          handleSubmitHr(e) // Pass the event object
                        } else {
                          // Handle the 'Cancel' case if needed
                        }
                      }}
                    >
                      {isButtonDisabled ? 'Processing...' : 'Approve'}
                    </Button>
                  )}
                  {approvalHandler !== 'Hr' && apiData?.status == 0 && (
                    <Button
                      type='submit'
                      sx={{ backgroundColor: '#f50606', color: '#fff', marginRight: '10px' }}
                      disabled={isButtonDisabled}
                      variant='contained'
                      onClick={e => {
                        if (comment.trim() === '') {
                          // Display an alert if the comment is empty
                          window.alert('Kindly Input Comment.')

                          return
                        }
                        e.preventDefault() // Add this line
                        if (window.confirm('Are you sure you want to submit for Approval?')) {
                          handleSubmit(e) // Pass the event object
                        } else {
                          // Handle the 'Cancel' case if needed
                        }
                      }}
                    >
                      {isButtonDisabled ? 'Processing...' : 'Approve'}
                    </Button>
                     )}
                    <Button
                      type='submit'
                      sx={{ backgroundColor: '#BB2525', color: '#fff' }}
                      variant='contained'
                      disabled={isButtonDisabled}
                      onClick={e => {
                        if (comment.trim() === '') {
                          // Display an alert if the comment is empty
                          window.alert('Kindly Input Comment.')

                          return
                        }
                        e.preventDefault() // Add this line
                        if (window.confirm('Are you sure you want to decline this request?')) {
                          handleDecline(e) // Pass the event object
                        } else {
                          // Handle the 'Cancel' case if needed
                        }
                      }}
                    >
                      {isButtonDisabled ? 'Processing...' : 'Decline'}
                    </Button>
                  </div>
                </div>
              </CardActions>
            </AccordionDetails>
          </Accordion>
        ) : null}
      </TabContext>
    </Card>
  )
}

// FormLayoutsGuarantor.acl = {
//   action: 'create-post',
//   subject: 'create-post',
// }

export default FormLayoutsGuarantor
