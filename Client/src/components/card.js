import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/prcard.css'
import BuyProduct from './BuyOrder'
import jwt from 'jwt-decode'

function Card({ match }) {
  const product_id = match.params.id
  const [product, setProduct] = useState({})
  const token = localStorage.getItem('token')
  let id_buyer
  let buyer_address
  let role

  if (token) {
    id_buyer = jwt(localStorage.getItem('token'))._id
    buyer_address = jwt(localStorage.getItem('token')).address
    role = jwt(token).role
  }

  console.log(id_buyer, buyer_address, role)
  const getProduct = async (product_id) => {
    await axios
      .get('http://localhost:5000/product/getProductById/' + product_id)
      .then((response) => {
        setProduct(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addOrder = async () => {
    await axios
      .post(
        'http://localhost:5000/order/add',
        {
          id_product: product._id,
          id_seller: product.id_seller,
          id_buyer: id_buyer,
          totalPrice: product.price,
          address: buyer_address
        },
        {
          headers: {
            'auth-token': token
          }
        }
      )
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err.response.data)
      })

    await axios
      .patch(
        'http://localhost:5000/seller/updateTurnOver/' + product.id_seller,
        {
          turnOver: product.price
        }
      )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
    await axios
      .delete('http://localhost:5000/product/deleteProduct/' + product_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response))
  }

  useEffect(() => {
    getProduct(product_id)
  }, [product_id])

  return (
    <div>
      <div className='body_container'>
        <section className='product'>
          <div className='product__photo'>
            <div className='photo-container'>
              <div className='photo-main'>
                <img src={`/uploads/${product.picture}`} />
              </div>
            </div>
          </div>
          <div className='product__info'>
            <div className='title'>
              <h2>Product Name</h2>
              <h1 style={{ color: 'yellow' }}>{product.name}</h1>
            </div>
            <div className='price'>
              <h2 style={{ color: 'white' }}>Product Price</h2>
              <span style={{ color: 'yellow' }}>{product.price}</span>
            </div>
            <div className='description'>
              <h2>Description</h2>
              <div style={{ width: '100%' }}>
                <p style={{ color: 'yellow' }}>{product.description}</p>
              </div>
            </div>
            {token ? (
              <BuyProduct totalPrice={product.price} addOrder={addOrder} />
            ) : (
              <div
                style={{
                  fontSize: '20px',
                  width: '68%',
                  padding: '11%',
                  color: 'red',
                  margin: 'auto',
                  textAlign: 'center'
                }}
              >
                Sorry you cannot finsh the order, to procced Sign in
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Card
