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
        window.alert(`Số điện thoại không đúng!\n Xin vui lòng thử lại!`)
        return;
      }
      if(!email.match(mailRegex)){
        window.alert(`Email không đúng!\n Xin vui lòng thử lại!`)
        return;
      }

      if(password !== confirmPassword){
        window.alert(`Mật khẩu không khớp!\n Vui lòng nhập lại mật khẩu`);
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
           window.alert(`Email hoặc số điện thoại đã tồn tại!\n Xin vui lòng thử lại`);
         }
         
         if(err.message==="Request failed with status code 400"){
           window.alert(`Mật khẩu phải lớn hơn 6 kí tự!`);}
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
          Đăng Kí
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
                label="Tên đăng nhập"
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
                label="Số điện thoại"
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
                label="Email"
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
                label="Mật khẩu"
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
                label="Nhập lại mật khẩu"
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
           Đăng kí
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Bạn đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  );
}