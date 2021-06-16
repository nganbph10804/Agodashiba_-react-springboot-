
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { React, useState } from 'react';
import RoomService from '../../../Service/RoomService';



const AddRoomType = ({openType,setOpenType,setLstRoomType,lstRoomType}) => {


    const [price, setPrice] = useState('');
    const [typeName, setTypeName] = useState('');
    const [area, setArea] = useState('');
    const [bed, setBed] = useState('');
 
  const handleClose = () => {
    setOpenType(false);
  }
  
  const doubleRegex =/(\d{1,2}\.(?=\d{1,2}))/;
  
  const onCreateRoomType = ()=>{

    if(typeName===""||price===""||bed===""||area===""){
        window.alert('emty field!');
        return;
    }
    if(isNaN(bed)||isNaN(price)||isNaN(area)){
        window.alert("bed total is invalid!");
        return;
    }
    // if(!price.match(doubleRegex)||!area.match(doubleRegex)){
    //     window.alert('price or area total is invalid!');
    //     return;
    // }
      let roomTypeCreate= {
        type_name:typeName, 
       price:price,
         area:area,
         bed:bed
    
      }
      
       RoomService.createRoomType(roomTypeCreate)
       .then((resp)=>{
           window.alert('success');
              setLstRoomType([
                  ...lstRoomType,
                  resp.data
              ]);
              setOpenType(false);

       })
       .catch(err=>{
       console.log(err);
       })
    }
    
 
    
  
    return (
        <div>
       
        <Dialog open={openType} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add new RoomType </DialogTitle>
          <DialogContent>
            
            <TextField 
              style={{padding:'20px 5px'}}
              autoFocus
              id="name"
              onChange={e=>setTypeName(e.target.value)}
              label="Type Name"
              type="text"
              fullWidth
            />
             <TextField 
            style={{padding:'20px 5px'}}
              id="price"
              onChange={e=>setPrice(e.target.value)}
              label="Price"
              type="text"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              id="area"
              label="Area"
              onChange={e=>setArea(e.target.value)}
              type="text"
              fullWidth
            />
            <TextField
              style={{padding:'20px 5px'}}
              id="bed"
              onChange={e=>setBed(e.target.value)}
              label="Bed"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>{onCreateRoomType()}} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default AddRoomType
