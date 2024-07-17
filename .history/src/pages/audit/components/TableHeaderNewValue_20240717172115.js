// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeaderNewValue = props => {
  // ** Props
  const { toggle } = props

  return (
    <Button
    onClick={toggle} variant='contained'
    startIcon={<Icon icon='tabler:eye' />}
    sx={{ l: 100,  backgroundColor: '#f50606',  '&:hover': {
      backgroundColor: '#f50606'
    } }}
  >
   Latest Values

  </Button>

  )
}

export default TableHeaderNewValue
