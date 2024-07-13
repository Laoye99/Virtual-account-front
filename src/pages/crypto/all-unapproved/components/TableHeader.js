// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Link from 'next/link'

const TableHeader = props => {
  // ** Props
  const { toggle } = props

  return (
    <Button
          component={Link}
          variant='contained'
          href='/crypto'
          startIcon={<Icon icon='tabler:arrow-left' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          Back
        </Button>

  )
}

export default TableHeader
