// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { toggle } = props

  return (
    <Button
          component={Link}
          variant='contained'
          href='/service/all-unapproved'
          startIcon={<Icon icon='tabler:eye' />}
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
