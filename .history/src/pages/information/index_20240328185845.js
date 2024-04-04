// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import FileUploaderRestrictions from 'src/views/forms/form-elements/file-uploader/FileUploaderRestrictions'

// ** Source code imports
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FileUploader = () => {
  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
      <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <PageHeader
          title={
            <Typography variant='h4'>
              <LinkStyled href='https://github.com/react-dropzone/react-dropzone/' target='_blank'>
               Account Information
              </LinkStyled>
            </Typography>
          }
          subtitle={<Typography sx={{ color: 'text.secondary' }}>Account Information Upload</Typography>}
        />
        <Button
          component={Link}
          variant='contained'
          href='/fee-configuration/uploaded-document'
          startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          View Unapproved Documents
        </Button>
        <Grid item xs={12}>
          <CardSnippet
            title='Upload File in CSV format only'
            code={{
              tsx: null,
              jsx: source.FileUploaderRestrictionsJSXCode
            }}
          >
            <FileUploaderRestrictions />
          </CardSnippet>
        </Grid>
      </Grid>
    </DropzoneWrapper>
  )
}

FileUploader.acl = {
  action: 'user',
  subject: 'user'
}

export default FileUploader
