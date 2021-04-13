import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminLogin from './components/admin components/AdminLogin'
import AdminDashboard from './components/admin components/AdminDashboard'
import SellerDashboard from './components/seller components/SellerDashboard'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from='/' to='/Home' />
        <Route path='/Admin' exact component={AdminLogin} />
        <Route path='/Admin/Dashboard' exact component={AdminDashboard} />
        <Route path='/Admin/Buyers' exact component={AdminDashboard} />
        <Route path='/Admin/Sellers' exact component={AdminDashboard} />
        <Route path='/Admin/Ads' exact component={AdminDashboard} />
        <Route path='/Admin/Delivery' exact component={AdminDashboard} />
        <Route path='/Admin/Orders' exact component={AdminDashboard} />
        <Route path='/Admin/Admins' exact component={AdminDashboard} />
        <Route path='/Admin/Auction' exact component={AdminDashboard} />
        <Route path='/Seller/Dashboard' exact component={SellerDashboard} />
        <Route path='/Seller/Info' exact component={SellerDashboard} />
        <Route path='/Seller/Products' exact component={SellerDashboard} />
        <Route path='/Seller/Packs' exact component={SellerDashboard} />
        <Route path='/Home' exact component={Home} />
        <Route path='/Login' exact component={Home} />
        <Route path='/Signup' exact component={Home} />
        <Route path='/ResetPassword' exact component={Home} />
        <Route path='/Product/:id' exact component={Home} />
        <Route path='/Auction' component={Home} />
        <Route path='/AuctionPayment' component={Home} />
        <Route path='/ProductSold' component={Home} />
      </Switch>
    </Router>
  )
}

export default App
