import { useEffect, useState } from 'react'
import '../styles/auction.css'
import jwt from 'jwt-decode'
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
  const [timer, setTimer] = useState(40)
  const [price, setPrice] = useState(0)
  const token = localStorage.getItem('token')
  const name = jwt(token).full_name

  //  var test = setTimeout(() => {
  //  setTimer(timer- 1)
  // }, 1000);

  // if(timer === -1){
  //   alert('ok')
  // }

  const addMessage = async (e) => {
    e.preventDefault()
    if (db) {
      db.collection('messages').add({
        text: messageToSend,
        amount: amount,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: name
      })
      setMessageToSend('')
      setAmount('')
    }
  }

  useEffect(() => {
    //   let maxVal = []
    //   messages.map((i) => {
    //   const numArray = i.amount
    //   maxVal.push(numArray)
    //   maxVal.sort(function (a, b) {
    //     return a - b
    //   })
    //   maxVal.reverse()

    //   setPrice(maxVal[0])
    //   console.log(maxVal[0]);
    // })

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
        })
      return allMessages
    }
  }, [db])

  return (
    <div className='big_wrapper'>
      <h1>{timer}</h1>
      {/* <h1>{price}</h1> */}
      <div className='buyer_wrapper'>
        <div className='buter_info'></div>
        <div className='chat_container'>
          <div className='flex flex-col h-full'>
            <div className='grid grid-cols-12 gap-y-2'>
              {messages.map((msg, i) => (
                <div key={i} className='col-start-1 col-end-8 p-3 rounded-lg'>
                  <div className='flex flex-row items-center'>
                    <div>{msg.user}</div>
                    <div className='relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl'>
                      <div>{msg.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='form_container'>
            <form onSubmit={addMessage} style={{ display: 'flex' }}>
              <input
                type='text'
                className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
              />
              <input
                type='number'
                className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                type='submit'
                className='flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10'
                value='Send'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
