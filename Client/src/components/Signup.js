import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { store } from 'react-notifications-component';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { useHistory} from "react-router-dom";
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#1a1a1a',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1a1a1a'
  },
}));

export default function Signup() {
  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState('seller');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () =>{

    if (value === 'seller') {
        await axios.post('http://localhost:5000/seller/register',{
            full_name: name,
            email: email,
            phone: phone,
            address: address,
            identity: identity
            })
            .then(function (response) {
                store.addNotification({
                    title: "Success !",
                    message: "Your account has been created ! Check your Email !",
                    type: "success",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                    });
                    history.push('/Home')

                })
                .catch(function (error) {
                    store.addNotification({
                        title: "Error !",
                        message: error.response.data,
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                        });
        })
    } else if(value === 'buyer'){
        await axios.post('http://localhost:5000/buyer/register',{
            full_name: name,
            email: email,
            phone: phone,
            address: address,
            password: password
            })
            .then(function (response) {
                store.addNotification({
                    title: "Success !",
                    message: "Your account has been created ! Check your Email !",
                    type: "success",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                    });
                    history.push('/Home')

                })
                .catch(function (error) {
                    store.addNotification({
                        title: "Error !",
                        message: error.response.data,
                        type: "danger",
                        insert: "top",
                        container: "bottom-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true
                        }
                        });
        })
    }
   }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Full Name"
            name="full_name"
            autoFocus
            onChange={(event)=>{setName(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoFocus
            onChange={(event)=>{setPhone(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoFocus
            onChange={(event)=>{setAddress(event.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event)=>{setEmail(event.target.value)}}
          />
         {
             value==='buyer' ? (
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=>{setPassword(event.target.value)}}
              />
             ) : (
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fiscal identity"
                label="Fiscal Identity"
                name="fiscal identity"
                autoFocus
                onChange={(event)=>{setIdentity(event.target.value)}}
              />
             )
         }
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
              <FormControlLabel value="buyer" control={<Radio style={{ color: '#1a1a1a'}}/>} label="Buyer" />
              <FormControlLabel value="seller" control={<Radio style={{ color: '#1a1a1a'}}/>} label="Seller" />
            </RadioGroup>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign up
          </Button>
        </form>
      </div>
    </Container>
  );
}