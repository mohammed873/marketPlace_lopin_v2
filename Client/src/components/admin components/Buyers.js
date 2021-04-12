import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

function Buyers() {
  const [buyers, setBuyers] = useState([])

  const columns = [
    { title: 'Full name', field: 'full_name' },
    { title: 'Phone', field: 'phone' },
    { title: 'Email', field: 'email' },
    { title: 'Address', field: 'address' },
    { title: 'Devise', field: 'devise' },
    { title: 'IsValid', field: 'isValid' }
  ]
  useEffect(() => {
    setInterval(() => {
      fetchData()
    }, 1000)
  }, [])

  function fetchData() {
    axios
      .get('http://localhost:5000/buyer/getAll')
      .then((response) => {
        const allBuyers = response.data
        setBuyers(allBuyers)
        console.table(allBuyers)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function deleteBuyer(id) {
    await axios
      .delete('http://localhost:5000/buyer/delete/' + id)
      .then(function (response) {
        fetchData()
        toast.configure()
        toast.success('Buyer deleted successfully')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div style={{ width: '70%', margin: 'auto' }}>
      <MaterialTable
        title='Buyers Table'
        columns={columns}
        data={buyers}
        options={{
          pageSize: 5,
          pageSizeOptions: [5, 10]
        }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete Buyer',
            onClick: (event, rowData) => {
              deleteBuyer(rowData._id)
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
  )
}

export default Buyers
