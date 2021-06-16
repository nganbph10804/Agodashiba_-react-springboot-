import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CachedIcon from '@material-ui/icons/Cached';
import{ React ,useState}from 'react';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPwd() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const handleSubmit = (e)=>{

    e.preventDefault();

    if(email===""){
      window.alert('emty field!');
      return;
    }
    UserSservice.getUserForRecover(email)
    .then((res)=>{
      if(res.data===""){
          window.alert(`Không tìm thấy Email của bạn trong hệ thống \n Xin vui lòng thử lại!`)
          return;
      }
      UserSservice.sendMailForRecovery(email,res.data.passwords)
      .then(
        window.alert(`Mật khẩu của bạn đã được gửi đến:  ${email} \n Hãy kiểm tra email của bạn!`)
      )
      .catch(err=>{
        console.log(err); 
      }
       
      )
     

    })
    .catch(err=>{
      console.log(err);
      window.alert(err.message);
    })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
         <CachedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
         Quên Mật Khẩu
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e)=>{setEmail(e.target.value)}}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          
          <Button
            type="submit"
            fullWidth
            onClick={(e)=>{handleSubmit(e)}}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Xác nhận
          </Button>
         
        </form>
      </div>
     
    </Container>
  );
}