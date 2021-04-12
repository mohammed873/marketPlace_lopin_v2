import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import axios from 'axios'
import '../../styles/adminLogin.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Admin() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [value, setValue] = useState('admin')
  console.log(email, password, value)
  if (localStorage.getItem('token')) {
    history.push('/Admin/Dashboard')
  }
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const onClick = async () => {
    if (value === 'superadmin') {
      await axios
        .post('http://localhost:5000/superAdmin/login', {
          email: email,
          password: password
        })
        .then(function (response) {
          localStorage.setItem('token', response.data)
          history.push('/Admin/Dashboard')
        })
        .catch(function (error) {
          toast.configure()
          toast.error(error.response.data)
        })
    } else if (value === 'admin') {
      await axios
        .post('http://localhost:5000/admin/login', {
          email: email,
          password: password
        })
        .then(function (response) {
          localStorage.setItem('token', response.data)
          history.push('/Admin/Dashboard')
        })
        .catch(function (error) {
          toast.configure()
          toast.error(error.response.data)
          console.log(error.response.data)
        })
    }
  }

  return (
    <div className='big_container'>
      <div className='login'>
        <div className='login-triangle'></div>
        <h2 className='login-header'> Admins Log in</h2>
        <div className='login-container'>
          <p>
            <input
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              id='email'
            />
          </p>
          <p>
            <input
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              id='password'
            />
          </p>
          <FormControl component='fieldset' style={{ marginLeft: '12px' }}>
            <RadioGroup
              aria-label='gender'
              name='gender1'
              value={value}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value='admin'
                control={<Radio color='primary' />}
                label='Admin'
              />
              <FormControlLabel
                value='superadmin'
                control={<Radio color='primary' />}
                label='Super Admin'
              />
            </RadioGroup>
          </FormControl>
          <p>
            <input type='submit' value='Log in' onClick={onClick} />
          </p>
        </div>
      </div>
    </div>
  )
}
