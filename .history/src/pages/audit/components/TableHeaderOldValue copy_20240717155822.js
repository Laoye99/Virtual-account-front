// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeaderNewValue = props => {
  // ** Props
  const { guarantor } = props

  return (
    <Button
    onClick={toggle} variant='contained'
    startIcon={<Icon icon='tabler:eye' />}
    sx={{ ml: 100,  backgroundColor: '#f50606',  '&:hover': {
      backgroundColor: '#f50606'
    } }}
  >
   Old Value

  </Button>

  )
}

export default TableHeader
