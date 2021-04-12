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

export default function Products() {
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
    formProduct.append('id_category', category)

    if (decodedToken.isValid) {
      await axios
        .post('http://localhost:5000/product/addProduct', formProduct, {
          headers: {
            'auth-token': token
          }
        })
        .then(function (response) {
          getProducts()
          handleClose()
          toast.configure()
          toast.success(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      toast.configure()
      toast.error('Your acount is not validated yet')
    }
  }

  useEffect(() => {
    getProducts()
    getCategories()
  }, [])

  async function getProducts() {
    await axios
      .get('http://localhost:5000/product/getProductsByUserId/' + id)
      .then((response) => {
        const allProducts = response.data
        setProducts(allProducts)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getCategories() {
    await axios
      .get('http://localhost:5000/category/getAll')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function deleteProduct(id) {
    await axios
      .delete('http://localhost:5000/product/deleteProduct/' + id, {
        headers: {
          'auth-token': token
        }
      })
      .then(function (response) {
        getProducts()
        toast.configure()
        toast.success('Product deleted successfully !')
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
        Add new Product
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
          {'Add new Product'}
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
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>
                Category
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Category'
                name='id_category'
                value={category}
                onChange={handleChange}
              >
                {categories.map((category) => {
                  return (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <Button
              variant='contained'
              type='submit'
              style={{ backgroundColor: '#1a1a1a', color: 'white' }}
            >
              Add Product
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
                  deleteProduct(products._id)
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
