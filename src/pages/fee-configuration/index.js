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
import JSZip from 'jszip';

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import FileUploaderRestrictions from 'src/views/forms/form-elements/file-uploader/FileUploaderRestrictions'

// import feeConfig from "./fee_config2.csv"
import feeConfig from "./fee_config2.zip"

// ** Source code imports
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'
import Icon from 'src/@core/components/icon'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))


const FileUploader = () => {

  const downloadCsv = () => {
    // Create a new zip file
    const zip = new JSZip();

    // Add the CSV file to the zip file
    zip.file('feeConfig.csv', feeConfig);

    // Generate the zip file asynchronously
    zip.generateAsync({ type: 'blob' })
      .then(function(content) {
        // Create a link element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(content);
        link.download = 'feeConfig.zip';

        // Trigger the download
        link.click();
      });
  };

  const module_name = "fee_config";

  return (
    <DropzoneWrapper>
      <Grid container spacing={6} className='match-height'>
      <PageHeader
          title={
            <Typography variant='h4'>
              <LinkStyled href='#'>
               Fee Configuration
              </LinkStyled>
            </Typography>
          }
          subtitle={<Typography sx={{ color: 'text.secondary' }}>Fee Configuration Upload</Typography>}
        />
      <CardContent
        sx={{ gap: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
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
        <Button
          component={Link}
          variant='contained'
          href='/fee-configuration/approved-upload'
          startIcon={<Icon icon='tabler:eye' />}
          sx={{
            backgroundColor: '#f50606',
            '&:hover': {
              backgroundColor: '#f50606' // Change the background color on hover
            }
          }}
        >
          View Approved Document
        </Button>
        <Button
          component={Link}
          variant='contained'
          href="https://drive.google.com/file/d/1i8WGyVfhN9KHTO5B6kTpHO8S_nlM_JWO/view?usp=sharing" // Replace this with the URL of your external document
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
          Get Document
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
            <FileUploaderRestrictions module_name={module_name} />
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
