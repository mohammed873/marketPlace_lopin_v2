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
import jwt from 'jwt-decode'
import access from '../../../src/img/access.jpg'
import { store } from 'react-notifications-component'
import Table from 'react-bootstrap/Table'
import DeleteIcon from '@material-ui/icons/Delete'

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

export default function Admins() {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const token = localStorage.getItem('token')
  const isSuperAdmin = jwt(token).superAdmin
  const [deliveryMan, setDeliveryMan] = useState([])

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
    await axios
      .post('http://localhost:5000/deliveryMan/add', {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        address: data.address
      })
      .then(function (response) {
        fetchDeliveyMan()
        handleClose()
        toast.configure()
        toast.success('Delivery man added successfully')
      })
      .catch(function (error) {
        toast.configure()
        toast.success(error.response.data)
        console.log(error.response.data)
      })
  }

  useEffect(() => {
    fetchDeliveyMan()
  }, [])

  async function fetchDeliveyMan() {
    await axios
      .get('http://localhost:5000/deliveryMan/getAll')
      .then((response) => {
        const allAdmins = response.data
        setDeliveryMan(allAdmins)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  async function deleteDeliveryMan(id) {
    await axios
      .delete('http://localhost:5000/deliveryMan/delete/' + id)
      .then(function (response) {
        fetchDeliveyMan()
        toast.configure()
        toast.success('Delivery man deleted successfully')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className='admins-container'>
      <Button
        style={{ width: '70%' }}
        variant='outlined'
        color='primary'
        onClick={handleClickOpen}
      >
        Add new delevery man
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
          {'Add new delivery man'}
        </DialogTitle>
        <DialogContent>
          <form
            className={classes.root}
            noValidate
            autoComplete='on'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              name='full_name'
              label='Full Name'
              variant='outlined'
              inputRef={register}
            />
            <TextField
              name='email'
              label='Email'
              variant='outlined'
              inputRef={register}
            />
            <TextField
              name='phone'
              label='Phone'
              variant='outlined'
              inputRef={register}
            />
            <TextField
              name='address'
              label='Address'
              variant='outlined'
              inputRef={register}
            />
            <Button variant='contained' color='primary' type='submit'>
              Add Delivery Man
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <br />
      <div style={{ width: '70%', margin: 'auto' }}>
        <MaterialTable
          title='Delivery man Table'
          columns={[
            { title: 'Full name', field: 'full_name' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Address', field: 'address' }
          ]}
          data={deliveryMan}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete Buyer',
              onClick: (event, rowData) => {
                deleteDeliveryMan(rowData._id)
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
