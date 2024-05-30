// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { toggle } = props

  return (
    <Button
    onClick={toggle} variant='contained'
    startIcon={<Icon icon='tabler:plus' />}
    sx={{
      backgroundColor: '#f50606',
      '&:hover': {
        backgroundColor: '#f50606'
      }
    }}
  >
   New Service Provider

  </Button>

  )
}

export default TableHeader
