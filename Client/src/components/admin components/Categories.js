import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import MaterialTable from 'material-table'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch'
    }
  }
}))

export default function Categories() {
  const token = localStorage.getItem('token')
  const classes = useStyles()
  const { register, handleSubmit } = useForm('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    axios
      .get('http://localhost:5000/category/getAll')
      .then((response) => {
        const allCategories = response.data
        setCategories(allCategories)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [columns, setColumns] = useState([{ title: 'Name', field: 'name' }])

  const onSubmit = (data) => {
    if (data.name) {
      axios
        .post('http://localhost:5000/category/addCategory', {
          name: data.name
        })
        .then(function (response) {
          toast.configure()
          toast.success('Category Added successfully')
          fetchData()
        })
        .catch(function (error) {
          toast.configure()
          toast.error(error.response.data)
          console.log(error.response.data)
        })
    } else {
      toast.configure()
      toast.error('Name is empty !')
    }
  }

  const updateCategory = async (newCat) => {
    await axios
      .put(
        'http://localhost:5000/category/updateCategory/' + newCat._id,
        {
          name: newCat.name
        },
        {
          headers: {
            'auth-token': token
          }
        }
      )
      .then(function (response) {
        fetchData()
        toast.configure()
        toast.success('Category Updated successfully')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  async function deleteCategory(id) {
    await axios
      .delete('http://localhost:5000/category/deleteCategory/' + id)
      .then(function (response) {
        fetchData()
        toast.configure()
        toast.success('Category deleted successfully')
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <MaterialTable
        title='Category Table'
        columns={columns}
        data={categories}
        editable={{
          onRowAdd: (newCategories) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                onSubmit(newCategories)
                resolve()
              }, 1000)
            }),

          onRowUpdate: (newCategories) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                updateCategory(newCategories)
                resolve()
              }, 1000)
            }),

          onRowDelete: (categories) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteCategory(categories._id)
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
  )
}
