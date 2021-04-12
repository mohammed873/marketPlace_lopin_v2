import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '94%'
    }
  }
}))

export default function Ads() {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [ads, setAds] = useState([])

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // clearing data after adding an ads
  const clearInputs = () => {
    document.querySelector('#name').value = ''
    document.querySelector('#price').value = ''
    document.querySelector('#endDate').value = ''
    document.querySelector('#startDate').value = ''
    document.querySelector('#picture').value = ''
  }
  const onSubmit = async (data) => {
    const formAds = new FormData()
    formAds.append('picture', data.picture[0])
    formAds.append('pricing', data.pricing)
    formAds.append('startDate', data.startDate)
    formAds.append('endDate', data.endDate)
    await axios
      .post('http://localhost:5000/ads/add', formAds)
      .then(function (response) {
        toast.configure()
        toast.success('Ads added successfully')
        fetchAds()
        handleClose()
        clearInputs()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchAds()
  }, [])

  async function fetchAds() {
    await axios
      .get('http://localhost:5000/ads/getAll')
      .then((response) => {
        const allAds = response.data
        setAds(allAds)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function deleteAd(id) {
    await axios
      .delete('http://localhost:5000/ads/delete/' + id)
      .then(function (response) {
        fetchAds()
        toast.configure()
        toast.success('Ads deleted successfully')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className='ads-container'>
      <Button
        style={{ width: '70%' }}
        variant='outlined'
        color='primary'
        onClick={handleClickOpen}
      >
        Add new Advertation
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle
          style={{ textAlign: 'center' }}
          id='alert-dialog-slide-title'
        >
          {'Add new ads'}
        </DialogTitle>
        <DialogContent>
          <form
            className={classes.root}
            noValidate
            autoComplete='on'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id='price'
              name='pricing'
              label='Price'
              variant='outlined'
              type='number'
              inputRef={register}
            />
            <TextField
              id='picture'
              name='picture'
              label='Ads Picture'
              type='file'
              InputLabelProps={{ shrink: true }}
              variant='outlined'
              inputRef={register}
            />
            <TextField
              id='startDtae'
              name='startDate'
              label='Date Start'
              type='date'
              InputLabelProps={{ shrink: true }}
              variant='outlined'
              inputRef={register}
            />
            <TextField
              id='endDate'
              name='endDate'
              label='Date End'
              type='date'
              InputLabelProps={{ shrink: true }}
              variant='outlined'
              inputRef={register}
            />
            <Button variant='contained' color='primary' type='submit'>
              Add Ads
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <br />
      <div style={{ width: '70%', margin: 'auto' }}>
        <MaterialTable
          title='Ads Table'
          columns={[
            {
              title: 'Picture',
              field: 'picture',
              render: (rowData) => <img src={`/uploads/${rowData.picture}`} />
            },
            { title: 'Price', field: 'pricing' },
            { title: 'Date Start', field: 'startDate' },
            { title: 'Date Start', field: 'endDate' }
          ]}
          data={ads}
          options={{
            exportButton: true
          }}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete Buyer',
              onClick: (event, rowData) => {
                deleteAd(rowData._id)
              }
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF'
            }
          }}
        />
      </div>
    </div>
  )
}
