import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Route, Link } from 'react-router-dom'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import jwt from 'jwt-decode'
import Login from './Login'
import Signup from './Signup'
import ResetPassword from './ResetPassword'
import ProductList from './product_page'
import card from './card'
import Auction from './Auction'
import AuctionPayment from './AuctionPayment'
import ProductSold from './ProductSold'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 20
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function Home({ history }) {
  const classes = useStyles()
  const token = localStorage.getItem('token')

  let role
  let decodedToken

  if (token) {
    role = jwt(token).role
    decodedToken = jwt(token)
  }

  const logOut = () => {
    localStorage.removeItem('token')
    history.push('/Home')
  }

  const handleChange = (event) => {
    localStorage.setItem('devise', event.target.value)
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        style={{
          background: '#1a1a1a',
          height: '100px',
          justifyContent: 'center'
        }}
      >
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            <Link to='/home'>
              <i
                style={{ marginTop: '-2px', marginLeft: '-42%' }}
                class='fa fa-plus-square'
              >
                {' '}
                LUPIN STORE
              </i>
            </Link>
          </Typography>
          <div id='google_translate_element'></div>
          <FormControl
            variant='outlined'
            className={classes.formControl}
            style={{ marginRight: '20px' }}
          >
            <InputLabel
              htmlFor='outlined-age-native-simple'
              style={{ color: 'white' }}
            >
              Devise
            </InputLabel>
            <Select
              native
              onChange={handleChange}
              label='Devise'
              inputProps={{
                name: 'devise',
                id: 'outlined-age-native-simple'
              }}
              style={{ border: '1px solid white', color: 'white' }}
            >
              <option aria-label='' value='' />
              <option value={'MAD'} style={{ color: 'black' }}>
                MAD
              </option>
              <option value={'EUR'} style={{ color: 'black' }}>
                EUR
              </option>
              <option value={'USD'} style={{ color: 'black' }}>
                USD
              </option>
            </Select>
          </FormControl>
          {token ? (
            <>
              {role === 'seller' ? (
                <Link to='/Seller/Dashboard'>
                  <Button color='inherit'>DASHBOARD</Button>
                </Link>
              ) : (
                <></>
              )}
              <Button color='inherit' onClick={logOut}>
                LOG OUT
              </Button>
            </>
          ) : (
            <Link to='/Login'>
              <Button variant='outlined' color='inherit'>
                SIGN IN
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Route path='/Home' exact component={ProductList} />
      <Route path='/Login' exact component={Login} />
      <Route path='/Signup' exact component={Signup} />
      <Route path='/ResetPassword' exact component={ResetPassword} />
      <Route path='/Product/:id' component={card} />
      <Route path='/Auction' component={Auction} />
      <Route path='/AuctionPayment' component={AuctionPayment} />
      <Route path='/ProductSold' component={ProductSold} />
    </div>
  )
}
