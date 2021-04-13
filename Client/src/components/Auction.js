import { useEffect, useState, useRef } from 'react'
import '../styles/auction.css'
import jwt from 'jwt-decode'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

// Firebase deps
import firebase from 'firebase/app'

import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyC2_SH5H4xR407YGO4FgnmMQu9Z87lpJTw',
  authDomain: 'chatapp-795fe.firebaseapp.com',
  projectId: 'chatapp-795fe',
  storageBucket: 'chatapp-795fe.appspot.com',
  messagingSenderId: '858583789290',
  appId: '1:858583789290:web:aadfa0dcbe880d1dcb3193',
  measurementId: 'G-45H4T1CKWR'
})

const db = firebase.firestore()

export default function Auction() {
  const [messages, setMessages] = useState([])
  const [messageToSend, setMessageToSend] = useState()
  const [amount, setAmount] = useState()
  const [timer, setTimer] = useState(50)
  const [products, setProducts] = useState(40)
  const token = localStorage.getItem('token')
  const id = jwt(token)._id
  const name = jwt(token).full_name

  let history = useHistory()
  const scroll = useRef()

  async function getProducts() {
    await axios
      .get('http://localhost:5000/auction/getAll')
      .then((response) => {
        const allProducts = response.data
        setProducts(allProducts[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const addMessage = async (e) => {
    e.preventDefault()
    if (db) {
      db.collection('messages').add({
        text: messageToSend,
        amount: amount,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: name,
        buyerId: id
      })
      setMessageToSend('')
      setAmount('')
      updatePrice()

      scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  let maxPrice = []
  let info = []
  messages.map((i) => {
    //console.log(i.amount)
    maxPrice.push(parseInt(i.amount))
    info.push(i)
  })
  const price = Math.max(...maxPrice)

  let infoDiv
  let buyerId = []
  let buyerName
  info.map((i) => {
    if (i.amount == price) {
      infoDiv = i.amount
      buyerId.push(i.buyerId)
      buyerName = <p>{i.user}</p>
    }
  })

  async function updatePrice() {
    const token = localStorage.getItem('token')
    console.log(token)
    axios
      .patch('http://localhost:5000/auction/updatePrice', {
        AuctionProduct_id: products._id,
        price: infoDiv
      })
      .then(function (response) {
        console.log('done')
      })
      .catch(function (error) {
        console.log(error.response.data)
      })
  }

  console.log(infoDiv);
  var test = setTimeout(() => {
    setTimer(timer - 1)
  }, 1000)

  if (timer === -1) {
    if (buyerId[0] == id) {
      history.push('/AuctionPayment')
    } else {
      async function validateSold() {
        const token = localStorage.getItem('token')
        console.log(token)
        axios
          .patch('http://localhost:5000/auction/validate', {
            AuctionProduct_id: products._id
          })
          .then(function (response) {
            console.log('done')
          })
          .catch(function (error) {
            console.log(error.response.data)
          })
      }
      validateSold()
      history.push('/ProductSold')
    }
  }

  //maxPrice.reverse()

  //console.log(maxPrice);
  // const bigger = maxPrice.indexOf(Math.max.apply(Math, maxPrice))
  // setHigherPrice(messages[bigger])
  // console.log(messages[bigger]);

  // let maxPrice = []
  // messages.map((i) => {
  //   const price = i.amount
  //   maxPrice.push(parseInt(price))
  // })

  // const bigger = maxPrice.indexOf(Math.max.apply(Math, maxPrice))
  // setHigherPrice(messages[bigger])
  // console.log(messages[bigger]);

  useEffect(() => {
    setInterval(() => {
      getProducts()
    }, 1000)
  
    //
    if (db) {
      const allMessages = db
        .collection('messages')
        .orderBy('createdAt')
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
          setMessages(data)
          // scroll.current.scrollIntoView({ behavior: 'smooth' })
        })
      return allMessages
    }
  }, [db])

  return (
    <>
      {products.sold === false ? (
        <div>
          <div style={{ marginTop: '33px' }}>
            <h1 style={{ textAlign: 'center' }}>
              {' '}
              THE AUCTION WILL END IN {timer} seconds the person with higher
              price will win
            </h1>
            <h1 style={{ textAlign: 'center' }}>
              The higher price is : {}
              <span style={{ color: 'blue' }}>{infoDiv} </span> presented by{' '}
              <span style={{ color: 'blue' }}>{buyerName}</span>
            </h1>
          </div>
          <div className='big_wrapper'>
            <div className='buyer_wrapper'>
              <div className='buter_info'>
                <img
                  style={{
                    width: '64%',
                    margin: 'auto',
                    marginTop: '22px',
                    height: '27vh'
                  }}
                  className='img'
                  src={`/uploads/${products.picture}`}
                  alt='pic'
                />
                <br />
                <h1 style={{ textAlign: 'center', color: 'yellow' }}>
                  {products.name}
                </h1>
                <br />
                <p style={{ textAlign: 'center' }}>{products.description}</p>
                <br />
                <h1 style={{ textAlign: 'center', color: 'yellow' }}>
                  {products.price}$
                </h1>
              </div>
              <div className='chat_container'>
                <div className='flex flex-col h-full'>
                  <div className='grid grid-cols-12 gap-y-2'>
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className='col-start-1 col-end-8 p-3 rounded-lg'
                      >
                        <div className='flex flex-row items-center'>
                          <div>{msg.user}</div>
                          <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                            <div>{msg.text}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div ref={scroll}></div>
                </div>
                <div className='form_container'>
                  <form onSubmit={addMessage} style={{ display: 'flex' }}>
                    <input
                      type='text'
                      className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
                      value={messageToSend}
                      onChange={(e) => setMessageToSend(e.target.value)}
                      placeholder='Enter message'
                      required
                    />
                    <input
                      type='number'
                      className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder='Enter price'
                      required
                    />
                    <input
                      style={{ textAlign: 'center' }}
                      type='submit'
                      className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
                      value='Send message'
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className='sold'>Product sold</h1>
      )}
    </>
  )
}
