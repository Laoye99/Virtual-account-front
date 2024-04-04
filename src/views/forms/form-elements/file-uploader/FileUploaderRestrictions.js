// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import authConfig from 'src/configs/auth'
import { BASE_URL } from 'src/configs/constanst'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

const FileUploaderRestrictions = (module_name) => {
  // ** State
  const [files, setFiles] = useState([])
  console.log(files[0])
  console.log(module_name)

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 2000000,
    accept: '.csv',
    onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file)))
    },
    onDropRejected: () => {
        toast.error('You can only upload 2 files & maximum size of 2 MB, and they must be CSV files.', {
            duration: 2000
        })
    }
})

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const handleSubmit = async () => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    try {
      const response = await axios.post(`${BASE_URL}/switch/uploadfile`,{
        module_name : module_name.module_name,
        file : files[0]
      }, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'content-Type': 'multipart/form-data',
          "ngrok-skip-browser-warning": "http://localhost:3000/"
        }
      })
      console.log(response)
      toast.success(response.data.message)

      // setApiData(response.data.data[0])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              mb: 8.75,
              width: 48,
              height: 48,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
            }}
          >
            <Icon icon='tabler:upload' fontSize='1.75rem' />
          </Box>
          <Typography variant='h4' sx={{ mb: 2.5 }}>
            Drop files here or click to upload.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Allowed *.csv</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Max 2 files and max size of 2 MB</Typography>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove
            </Button>
            <Button variant='contained' onClick={handleSubmit}>Upload File</Button>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderRestrictions
