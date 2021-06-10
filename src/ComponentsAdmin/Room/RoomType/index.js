
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon, IconButton, TableHead } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { React, useEffect, useState } from 'react';
import HotelService from '../../../Service/HotelService';
import RoomService from '../../../Service/RoomService';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddRoomType from '../CreateRoomType';
const RoomType = ({openUpdate,setOpenUpdate,room,setLstRoom,lstRoomType,setLstRoomType,openType,setOpenType}) => {



     

   

  const onCreateRoomType = ()=>{
    setOpenType(true);
  }
 const configCreateRoomtype ={
    lstRoomType,
    setLstRoomType,
    openType,
    setOpenType

 }
  const handleClose = () => {
    setOpenUpdate(false);
    // resetForm();
   
  };
  

  const onUpdateRoom = (row)=>{
   
   
   
       
           
 
    let roomUpdate ={
        room_name: room.room_name,
        room_type: row.id
    }

    console.log(roomUpdate);
    RoomService.updateRoom(room.id_room,roomUpdate)
    .then((resp)=>{
        window.alert('success');
        let dataUpdate={
            id_room: room.id_room,
            room_name:resp.data.room_name,
            type_name:row.type_name,
            price:row.price,
            bed:row.bed,
            area:row.area
        }
            setLstRoom(oldRoom=>{
                let newRoom;
                newRoom= oldRoom.map((room)=>{
                    return room.id_room === resp.data.id_room ? dataUpdate:room;
                });
                return newRoom;
            });
            setOpenUpdate(false);
    })
    .catch(err=>{
        console.log(err);
    })
    
 
    
  }
    return (
        <div> 
          <AddRoomType {...configCreateRoomtype}/>
        <Dialog open={openUpdate} maxWidth='md' onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose RoomType </DialogTitle>
          <DialogContent>
            <IconButton onClick={()=>{onCreateRoomType()}}>
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
                 <IconButton onClick={()=>{onUpdateRoom(row)}}>
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

export default RoomType
