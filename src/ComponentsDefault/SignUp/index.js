import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {React ,useState}from 'react';
import { useHistory,Link } from 'react-router-dom';
import UserSservice from '../../Service/UserSservice';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({user,setUser}) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history =useHistory();

  const handleSubmit = (e) =>{

    const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      e.preventDefault();
      if(!phone.match(phoneRegex)){
        window.alert('incorrect phone format!')
        return;
      }
      if(!email.match(mailRegex)){
        window.alert('incorrect email format!')
        return;
      }

      if(password !== confirmPassword){
        window.alert('password not match!');
        return;
      }
      let users= {
        phone:phone, username:username, email:email,isAdmin:false, passwords: password
    
      }
      
       UserSservice.createUser(users)
       .then((resp)=>{
         setUser(resp.data);
           window.alert('success');
            history.push('/');
              

       })
       .catch(err=>{
         if(err.message==="Request failed with status code 500"){
           window.alert('Email or Phone already exist');
         }
         
         if(err.message==="Request failed with status code 400"){
           window.alert('Password at least 6 character');}
       })
      
  }

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e)=>{handleSubmit(e)}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="userName"
                variant="outlined"
                required
                onChange={(e)=>{setUsername(e.target.value)}}
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e)=>{setPhone(e.target.value)}}
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e)=>{setEmail(e.target.value)}}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>    
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                name="confirmPassword"
                label="Confirm Password"
                type="password"  
              />
            </Grid>         
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}