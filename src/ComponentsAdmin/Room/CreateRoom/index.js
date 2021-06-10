
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, TableHead } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { React, useEffect, useState } from 'react';
import RoomService from '../../../Service/RoomService';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import { useParams } from 'react-router';
import AddRoomType from './../CreateRoomType'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const CreateRoom = ({openAdd,setOpenAdd,setLstRoom,lstRoom,lstRoomType,filterType,setLstRoomType,openType,setOpenType}) => {


    

    const [name, setName] = useState('');
   




  const handleClose = () => {
    setOpenAdd(false);

   
  };
  const configCreateRoomtype ={
    lstRoomType,
    setLstRoomType,
    openType,
    setOpenType

 }
 const onCreateRoomType = ()=>{
  setOpenType(true);
}

  const onAddRoom = (row)=>{
   
    if(name===""){
      window.alert('please fill name of room!');
      return;
    }

    let roomAdd ={
        room_name:name,
        room_type: row.id,
        id_hotels: filterType,
        status:false
    }

    RoomService.createRoom(roomAdd)
    .then((resp)=>{
        window.alert('success');
        let dataCreate={
          id_room: resp.data.id_room,
          room_name:resp.data.room_name,
          type_name:row.type_name,
          price:row.price,
          bed:row.bed,
          area:row.area
      }

            setLstRoom([
                ...lstRoom,
                dataCreate
            ]);
            setOpenAdd(false);

    })
    .then(
      RoomService.updateRoomTotal(filterType)
      .then()
      .catch(err=>{
        console.log(err.message);
      })
    )
    .catch(err=>{
        console.log(err);
    })

    

    
    
 
    
  }
    return (
        <div> 
             <AddRoomType {...configCreateRoomtype}/>  
        <Dialog open={openAdd} maxWidth='md' onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose RoomType </DialogTitle>
          <DialogContent>

          <TextField label="Type Room Name" id="room_name" onChange={(e)=>setName(e.target.value)}/>
          <IconButton onClick={()=>{onCreateRoomType()}}>
            <label>add Room type</label>
              <AddCircleOutlineIcon/>
            </IconButton>
          <TableContainer  component={Paper}>
     

        
    
     
       <Table  aria-label="custom pagination table">
         <TableHead>
           <TableRow>
             <TableCell>Type Name</TableCell>
             <TableCell>Price</TableCell>
             <TableCell>Bed</TableCell>
             <TableCell>Area</TableCell>
             <TableCell>Image</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
 
           {lstRoomType.map((row) => (
             <TableRow key={row.id}>
               <TableCell>
                 {row.type_name}
               </TableCell>
               <TableCell >
                 {row.price} $
               </TableCell>
               <TableCell  >
                 {row.bed} <IconButton  disabled="true">
                 <SingleBedIcon color="secondary"/>
                 </IconButton >
               </TableCell>
               <TableCell  >
                 {row.area} <span>&#13217;</span>
               </TableCell>
               <TableCell  >
                 {row.img}
               </TableCell>
               <TableCell>
                 <IconButton onClick={()=>{onAddRoom(row)}}>
                  Choose
                 </IconButton>
                 
               </TableCell>
             </TableRow>
           ))}
 
 
         </TableBody>
 
       </Table>
     </TableContainer>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default CreateRoom
