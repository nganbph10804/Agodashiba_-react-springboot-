
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { React, useState } from 'react';
import HotelService from '../../../Service/HotelService';
const UpdateHotel = ({setLstHotel,openUpdate,setOpenUpdate,hotel}) => {


    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [star, setStar] = useState("");
    const [roomCount, setRoomCount] = useState("");
 const resetForm =()=>{
    setName('');
    setAddress('');
    setRoomCount('');
    setStar('');
 }
  const handleClose = () => {
    setOpenUpdate(false);
    resetForm();
   
  };
  

  const onUpdateUser = ()=>{
    if(name===""||address===""||star===""||roomCount===""){
        window.alert("empty field !")
        return;
    }
    if(star<=0||roomCount<=0||star>5){
        window.alert("RoomCount must be valid and Star Rate is less than 5");
        return;
    }
    
       if(isNaN(roomCount) || isNaN(star)){
        window.alert('RoomCount and Star Rate must be numbers');
        return;
    }
   
      let hotell= {
         name:name, 
        address:address,
          star_rate:star,
          room_total:roomCount
    
      }
     
      HotelService.updateHotel(hotell,hotel.id_hotels)
     
      
       .then((resp)=>{
           window.alert('success');
              setLstHotel(oldHotel=>{
                let newHotel;
                newHotel=oldHotel.map((hotel)=>{
                    return hotel.id_hotels === resp.data.id_hotels ? resp.data : hotel;
                });
                return newHotel;
              });
              setOpenUpdate(false);

       })
       .catch(err=>{
           window.alert(err.message);
          
       })
    
    
 
    
  }
    return (
        <div> 
        <Dialog open={openUpdate} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update User </DialogTitle>
          <DialogContent>
          
             <TextField 
            style={{padding:'20px 5px'}}
              onChange={e=>setName(e.target.value)}
              defaultValue={hotel.name}
              label="Hotel Name"
              type="text"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              label="Address"
              defaultValue={hotel.address}
              onChange={e=>setAddress(e.target.value)}    
              type="text"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              defaultValue={hotel.star_rate}
              onChange={e=>setStar(e.target.value)}     
              label="Star Rate"
              type="text"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              defaultValue={hotel.room_total}
              onChange={e=>setRoomCount(e.target.value)}
              label="Room Count"
              type="text"
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

export default UpdateHotel
