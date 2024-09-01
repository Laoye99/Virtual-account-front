import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const KeyValueTableRow = ({ label, value }) => {
  return (
    <TableRow>
      <TableCell>{label}:</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};

export default KeyValueTableRow;
