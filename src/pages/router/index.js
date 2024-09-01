// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import FileUploaderRestrictions from 'src/views/forms/form-elements/file-uploader/FileUploaderRestrictions'
import transRouter from './inst_route.csv'

// ** Source code imports
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'
import Icon from 'src/@core/components/icon'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FileUploader = () => {

  const downloadCsv = () => {
    // Create a blob from the CSV file content
    const blob = new Blob([transRouter], { type: 'text/csv' });

    // Create a link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'transRouter.csv';

    // Trigger the download
    link.click();
  };

  const module_name = "inst_route";

  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={
            <Typography variant='h4'>
              <LinkStyled href='#'>
               Transaction Router
              </LinkStyled>
            </Typography>
          }
          subtitle={<Typography sx={{ color: 'text.secondary' }}>Transaction Router Profile Upload</Typography>}
        />
        <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Button
          component={Link}
          variant='contained'
          href='/router/uploaded-document'
          startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          View Unapproved Transaction Router
        </Button>
        <Button
        component={Link}
        variant='contained'
        href='/router/approved-upload'
        startIcon={<Icon icon='tabler:eye' />}
        sx={{
          backgroundColor: '#f50606',
          '&:hover': {
            backgroundColor: '#f50606' // Change the background color on hover
          }
        }}
      >
        View Approved Transaction Router
      </Button>

	   <Button
          component={Link}
          variant='contained'
          href="https://drive.google.com/file/d/1_cTmhfVibRGqBl2238GugJ9gM2kBu9y0/view?usp=sharing" // Replace this with the URL of your external document
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          Get Template
        </Button>


        </CardContent>
        <Grid item xs={12}>
          <CardSnippet
            title='Upload File in CSV format only'
            code={{
              tsx: null,
              jsx: source.FileUploaderRestrictionsJSXCode
            }}
          >
            <FileUploaderRestrictions module_name={module_name}/>
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
