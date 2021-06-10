
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { React, useState } from 'react';
import UserSservice from '../../../Service/UserSservice';
const AddUser = ({open,setOpen,setLstUser,lstUser}) => {


    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // console.log('user =>' + JSON.stringify(users) );
  const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const onCreateUser = ()=>{

    if(!phone.match(phoneRegex)|| !email.match(mailRegex)){
        window.alert('emai or phone does not validate!');
        return;
    }else{
      let users= {
        phone:phone, username:username, email:email,isAdmin:false, passwords: password
    
      }
      
       UserSservice.createUser(users)
       .then((resp)=>{
           window.alert('success');
              setLstUser([
                  ...lstUser,
                  resp.data
              ]);
              setOpen(false);

       })
       .catch(err=>{
        if(err.message==="Request failed with status code 500"){
          window.alert('Email or Phone already exist');
        }
        
        if(err.message==="Request failed with status code 400"){
          window.alert('Password at least 6 character');}
       })
    }
    
 
    
  }
    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         Add User
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new User </DialogTitle>
          <DialogContent>
            
            <TextField 
              style={{padding:'20px 5px'}}
              autoFocus
              id="phone"
              onChange={e=>setPhone(e.target.value)}
              label="Phone Numbers"
              type="phone"
              fullWidth
            />
             <TextField 
            style={{padding:'20px 5px'}}
              id="email"
              onChange={e=>setEmail(e.target.value)}
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              id="name"
              label="Username"
              onChange={e=>setUsername(e.target.value)}
              type="username"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              id="password"
              onChange={e=>setPassword(e.target.value)}
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onCreateUser} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default AddUser
