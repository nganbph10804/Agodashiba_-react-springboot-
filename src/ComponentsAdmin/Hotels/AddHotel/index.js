
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { React, useState } from 'react';
import HotelService from '../../../Service/HotelService';
import UserSservice from '../../../Service/UserSservice';
const AddHotel = ({open,setOpen,setLstHotel,lstHotel}) => {


    const [address, setAdress] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [star, setStar] = useState('');
    const [roomCount, setRoomCount] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  const onCreateUser = ()=>{
      if(name===""||address===""||star===""||roomCount===""){
          window.alert("empty field !")
          return;
      }

    if(isNaN(roomCount) || isNaN(star)){
        window.alert('RoomCount and Star Rate must be numbers');
        return;
    }
    if(star<=0||roomCount<=0||star>5){
        window.alert("RoomCount must be valid and Star Rate is less than 5");
        return;
    }
    
    if(!phone.match(phoneRegex)){
        window.alert('phone does not validate!');
        return;
    }
    
    
    
 
      let hotel= {
        name:name, address:address, star_rate:star,room_total:roomCount, phone: phone
    
      }
      
       HotelService.createHotel(hotel)
       .then((resp)=>{
           window.alert('success');
              setLstHotel([
                  ...lstHotel,
                  resp.data
              ]);
              setOpen(false);

       })
       .catch(err=>{
        if(err.message==="Request failed with status code 500"){
            window.alert('Phone not found for any User');
          }
       })
    
    
 
    
  }
    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         Add Hotel
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new Hotel </DialogTitle>
          <DialogContent>
            
          <TextField 
              style={{padding:'20px 5px'}}
              onChange={e=>setName(e.target.value)}
              label="Hotel Name"
              type="text"
              fullWidth
            />
            <TextField 
              style={{padding:'20px 5px'}}
              onChange={e=>setAdress(e.target.value)}
              label="address"
              type="text"
              fullWidth
            />
             <TextField 
            style={{padding:'20px 5px'}}
              onChange={e=>setStar(e.target.value)}
              label="Star Rate"
              type="text"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              label="Room Count"
              onChange={e=>setRoomCount(e.target.value)}
              type="text"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              onChange={e=>setPhone(e.target.value)}
              label="Phone"
              type="text"
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

export default AddHotel
