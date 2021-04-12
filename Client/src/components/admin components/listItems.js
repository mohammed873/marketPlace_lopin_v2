import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import CategoryIcon from '@material-ui/icons/Category'
import CallToActionIcon from '@material-ui/icons/CallToAction'
import ReceiptIcon from '@material-ui/icons/Receipt'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import PersonIcon from '@material-ui/icons/Person'
import GroupIcon from '@material-ui/icons/Group'
import { Link } from 'react-router-dom'

const navStyle = {
  color: 'black',
  textDecoration: 'none'
}

export const mainListItems = (
  <div>
    <Link to='/Admin/Dashboard' style={navStyle}>
      <ListItem button>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary='Categories' />
      </ListItem>
    </Link>
    <Link to='/Admin/Sellers' style={navStyle}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Sellers' />
      </ListItem>
    </Link>
    <Link to='/Admin/Buyers' style={navStyle}>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary='Buyers' />
      </ListItem>
    </Link>
    <Link to='/Admin/Ads' style={navStyle}>
      <ListItem button>
        <ListItemIcon>
          <CallToActionIcon />
        </ListItemIcon>
        <ListItemText primary='Ads' />
      </ListItem>
    </Link>
    <Link to='/Admin/Orders' style={navStyle}>
      <ListItem button>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary='Orders' />
      </ListItem>
    </Link>
    <Link to='/Admin/Delivery' style={navStyle}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Delivery Men' />
      </ListItem>
    </Link>
    <Link to='/Admin/Admins' style={navStyle}>
      <ListItem button>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary='Admins' />
      </ListItem>
    </Link>
  </div>
)
