import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { Link } from 'react-router-dom'

const navStyle = {
    color : 'black',
    textDecoration: 'none'
}

export const mainListItems = (

  <div>
    <Link to='/Seller/Dashboard' style={navStyle}>
        <ListItem button>
        <ListItemIcon>
            <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
        </ListItem>
    </Link>
    <Link to='/Seller/Info' style={navStyle}>
        <ListItem button>
        <ListItemIcon>
            <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Personal informations" />
        </ListItem>
    </Link>
    <Link to='/Seller/Products' style={navStyle}>
        <ListItem button>
        <ListItemIcon>
            <LocalParkingIcon />
        </ListItemIcon>
        <ListItemText primary="My products" />
        </ListItem>
    </Link>
    <Link to='/Seller/Packs' style={navStyle}>
        <ListItem button>
        <ListItemIcon>
            <LocalAtmIcon />
        </ListItemIcon>
        <ListItemText primary="Upgrade Pack" />
        </ListItem>
    </Link>
    
  </div>
);
