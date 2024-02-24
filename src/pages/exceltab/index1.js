import React, { useState } from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';

import { ExcelRenderer } from 'react-excel-renderer'; // Used for Excel rendering

// Define a custom styled component for the table container
const StyledTableContainer = styled(TableContainer)`
  margin-top: 16px;
  border: 1px solid #e0e0e0;
`;

const StyledFileInput = styled('input')({
 // display: 'none',
});

const ImportExcelPage = () => {
  const [open, setOpen] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleDialogToggle = () => setOpen(!open);

  const handleFileChange = (e) => {
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
    }
  };

  return (
    <>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Import Excel File and Display
        </Typography>
        
      <StyledFileInput
        type="file"
        accept=".xls, .xlsx"
        onChange={handleFileChange}
        id="excel-file-input"
      />
        <Button variant="contained" onClick={handleDialogToggle}>
          Browse Excel
        </Button>
      </Box>

      <Dialog fullWidth maxWidth="md"  //"sm", "md", "lg", "xl",
      onClose={handleDialogToggle} open={open}>
        <DialogTitle>Excel Data: {fileName}</DialogTitle>
        <Divider />
        <DialogContent>
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
    </DialogContent>
      </Dialog>

    </>
  );
}
ImportExcelPage.acl = {
    action: 'user',
    subject: 'user'
  }
  

export default ImportExcelPage;
