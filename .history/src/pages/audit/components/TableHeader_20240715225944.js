// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


const TableHeader = props => {
  // ** Props
  const { guarantor } = props

  return (
    <Button
    guarantor = {guarantor}
          component={Link}
          variant='contained'
          href='/audit/OldValue'
          startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
   More Details

  </Button>
  <SidebarOldValue open={addUserOpen} toggle={toggleAddUserDrawer} guarantor={guarantor} apiData={apiData} />

  )
}

export default TableHeader
