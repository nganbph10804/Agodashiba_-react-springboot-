
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { React, useState } from 'react';
import UserSservice from '../../../Service/UserSservice';
const UpdateUser = ({setLstUser,lstUser,openUpdate,setOpenUpdate,user}) => {


    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.passwords);
    const [confirmPassword, setConfirmPassword] = useState('');
 const resetForm =()=>{
    setEmail('');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
 }
  const handleClose = () => {
    setOpenUpdate(false);
    resetForm();
   
  };
  

  const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const onUpdateUser = ()=>{
      if(email==="" || username==="" || password===""){
        window.alert('Empty field!');
        return;
      }else if( !email.match(mailRegex)){
        window.alert('emai does not validate!');
        return;
    }else if( password !== confirmPassword){
        window.alert('Password not match!');
        return;
    }
    else{
      let users= {
         username:username, 
         email:email,
          passwords: password
    
      }
      let {phone} =user;
      
      UserSservice.updateUser(users,phone)
     
      
       .then((resp)=>{
           window.alert('success');
              setLstUser(oldUser=>{
                let newUser;
                newUser=oldUser.map((user)=>{
                    return user.phone === resp.data.phone ? resp.data : user;
                });
                return newUser;
              });
              setOpenUpdate(false);

       })
       .catch(err=>{
           window.alert(err.message);
          
       })
    }
    
 
    
  }
    return (
        <div> 
        <Dialog open={openUpdate} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update User </DialogTitle>
          <DialogContent>
          
             <TextField 
            style={{padding:'20px 5px'}}
              id="email"
              onChange={e=>setEmail(e.target.value)}
              defaultValue={user.email}
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              id="name"
              label="Username"
              defaultValue={user.username}
              onChange={e=>setUsername(e.target.value)}
              
              type="username"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              id="password"
              defaultValue={user.passwords}
              onChange={e=>setPassword(e.target.value)}
             
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              id="confirmPassword"
              onChange={e=>setConfirmPassword(e.target.value)}
              label="Confirm Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onUpdateUser} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default UpdateUser
