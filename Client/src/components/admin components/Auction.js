import React, { useState, useEffect } from 'react'
import jwt from 'jwt-decode'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
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

export default function Auction() {
  const token = localStorage.getItem('token')
  const decodedToken = jwt(token)
  const id = decodedToken._id
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const handleChange = (event) => {
    setCategory(event.target.value)
  }

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
    const formProduct = new FormData()
    formProduct.append('picture', data.picture[0])
    formProduct.append('description', data.description)
    formProduct.append('price', data.price)
    formProduct.append('name', data.name)

    await axios
      .post('http://localhost:5000/auction/add', formProduct)
      .then(function (response) {
        getAuctionProducts()
        handleClose()
        toast.configure()
        toast.success(' Auction Product Added !')
      })
      .catch(function (error) {
        toast.configure()
        toast.error(error.response.data)
      })
  }

  useEffect(() => {
    getAuctionProducts()
  }, [])

  async function getAuctionProducts() {
    await axios
      .get('http://localhost:5000/auction/getAll/')
      .then((response) => {
        const allProducts = response.data
        setProducts(allProducts)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function deleteActionProduct(id) {
    await axios
      .delete('http://localhost:5000/auction/delete/'+id)
      .then(function (response) {
        getAuctionProducts()
        toast.configure()
        toast.success(' Auction Product deleted successfully !')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const TitleImg = (rowData) => {
    return (
      <div>
        <input type='file' />
      </div>
    )
  }
  return (
    <div className='ads-container'>
      <Button
        style={{ width: '70%' }}
        variant='outlined'
        color='primary'
        onClick={handleClickOpen}
      >
        Add new Auction Product
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
          {'Add new Auction Product'}
        </DialogTitle>
        <DialogContent>
          <form
            className={classes.root}
            noValidate
            autoComplete='on'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              name='name'
              label='Name'
              variant='outlined'
              inputRef={register}
            />
            <TextField
              name='picture'
              label='Product Picture'
              type='file'
              InputLabelProps={{ shrink: true }}
              variant='outlined'
              inputRef={register}
            />
            <TextField
              name='description'
              label='Description'
              variant='outlined'
              inputRef={register}
            />
            <TextField
              name='price'
              label='Price'
              type='number'
              variant='outlined'
              inputRef={register}
            />
            <Button
              variant='contained'
              type='submit'
              style={{ backgroundColor: '#1a1a1a', color: 'white' }}
            >
              Add Auction Product
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <br />
      <div style={{ width: '70%', margin: 'auto' }}>
        <MaterialTable
          title='Products Table'
          columns={[
            {
              title: 'Picture',
              field: 'picture',
              editable: 'never',
              render: (rowData) => <img src={`/uploads/${rowData.picture}`} />
            },
            { title: 'Name', field: 'name' },
            { title: 'Price', field: 'price', type: 'numeric' },
            { title: 'description', field: 'description' }
          ]}
          data={products}
          editable={{
            onRowDelete: (products) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  deleteActionProduct(products._id)
                  resolve()
                }, 1000)
              })
          }}
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
