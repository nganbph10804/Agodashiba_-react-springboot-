import { IconButton, TableHead } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import RoomService from '../../../Service/RoomService';
import RoomType from '../RoomType';
import HotelService from './../../../Service/HotelService';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateRoom from '../CreateRoom';

const useStyles2 = makeStyles({
    root :{
        marginTop: '70px'
    },
  
    table: {
      minWidth: 500,
     
    },
    button :{
      margin: 0,
      padding: 0
    },
    formRow:{
      display: 'inline-block',
      width: '100%',
    
    
     '& label' :{
       color:'blue',
       fontWeight:'700',
        display:" block",
        width: '100%',
        textAlign: 'left',
      },
      '& select' : {
        display: 'block',
        width: 'auto',
        float: 'left',
        fontSize: '1.5rem',
        lineHeight: '1',
        fontWeight: '400',
        textAlign: 'left',
        padding: '10px 0px',
        margin: '10px auto',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
      }

    },
    addnew:{
      margin:'-10px 0',
      padding:0
    }
    
    
    
  });
  
  // Table Head
  const columns = [
    { id: 'room_name', label: 'Room Name' },
    { id: 'room_type', label: 'Room Type' },
    { id: 'price', label: 'Price' },
    { id: 'bed', label: 'Bed Total' },
    {
      id: 'area',
      label: 'Area',
    },
    {
      id:'status'
      ,label: 'Status'
    }
    ,
    {
      id: 'action', label: 'Action', minWidth: ' 190px'
    }
  
  
  ];
const RoomHotel = () => {

    const {filterType}=useParams();
    const history = useHistory();
    const [lstRoom, setLstRoom] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [lstHotel, setLstHotel] = useState([]);
    const [room, setRoom] = useState({});
    const [onAdd, setOnAdd] = useState(false);
    const [lstRoomType, setLstRoomType] = useState([]);
    const [openType, setOpenType] = useState(false);
    const onClickUpdate = (id_room) => {
      setOpenUpdate(true);
      setRoom(id_room);
     
    }
  
    const onDeleteUser = (id)=>{
     const conf = window.confirm("are you sure?");
     if(conf===true){
       RoomService.deleteRoom(id)
       .then((resp)=>{
         window.alert("deleted");
         setLstRoom(oldRoom=>{
           let newRoom =oldRoom.filter((room)=>{
             return room.id_room==id ?false:true;
           });
           return newRoom;
         });
       })
       .then(
        setTimeout(()=>{
          RoomService.updateRoomTotal(filterType)
        .then()
        .catch(err=>{
          console.log(err.message);
        })
      },3000)
      )
      .catch(err=>{console.log(err)})
     }
    }

    const onAddNewRoom = ()=>{
    setOpenAdd(true);
   
    }
    useEffect(()=>{
      RoomService.getRoomByHotel(filterType)
      .then((resp)=>{
        setLstRoom(resp.data);
      })
      .catch(err=>{
        console.log(err);
      })
    },[filterType])


    useEffect(()=>{
      RoomService.getAllRoomType()
      .then((resp)=>{
          setLstRoomType(resp.data)
      })
      .catch(err=>{
          console.log(err);
      })

  },[])
   
   
    useEffect(() => {

        HotelService.getAllHotels().then((res) => {
          setLstHotel(res.data);
        })
          .catch(err => {
            console.log(err);
          })
         
          
    
      }, [])
  
      const configUpdateRoom = {
        openUpdate,
        setOpenUpdate,
        room,
        setLstRoom,
        onAdd,
        lstRoomType,
        setLstRoomType,
        openType,
        setOpenType
        
      }
      const configAddRoom = {
        openAdd,
        setOpenAdd,
        setLstRoom,
        lstRoom,
        lstRoomType,
        filterType,
        openType,
        setOpenType
        
      }
      
      const handleFiler = e =>{
        const nextFilter = e.target.value;
        history.push(`/roomManagement/${nextFilter}`)
    }

    const formSelect =()=>(
      <div className={classes.formRow}>
      
        <label>
          CHOOSE HOTEL
        </label>
      

      <select className={classes.fomSelect} value={filterType} onChange={handleFiler} defaultValue='' >
        {lstHotel?lstHotel.map((option, index) => {
          const { id_hotels, name } = option;

          return (
            <option key={index} value={id_hotels}>{name}</option>
          );
        }):''}
      </select>
    </div>
  
    )
      

      
  const classes = useStyles2();
    return (
     
      <TableContainer className={classes.root} component={Paper}>
     
    
     {formSelect()} <RoomType {...configUpdateRoom} /> <CreateRoom {...configAddRoom}/>
     <IconButton onClick={()=>{onAddNewRoom()}} className={classes.addnew}>
        <AddCircleOutlineIcon/>
     </IconButton>
    
     
       <Table className={classes.table} aria-label="custom pagination table">
         <TableHead>
           <TableRow>
             {columns.map((column) => (
               <TableCell
                 key={column.id}
                 align={column.align}
                 style={{ minWidth: `{column.minWidth}`, fontWeight: '600', fontSize: '17px' }}
               >
                 {column.label}
               </TableCell>
             ))}
           </TableRow>
         </TableHead>
         <TableBody>
 
           {lstRoom.map((row) => (
             <TableRow key={row.id_room}>
               <TableCell component="th" scope="row">
                 {row.room_name}
               </TableCell>
               <TableCell>
                 {row.type_name}
               </TableCell>
               <TableCell >
                 {row.price} $
               </TableCell>
               <TableCell >
                 {row.bed} <IconButton  disabled="true">
                 <SingleBedIcon color="secondary"/>
                 </IconButton >
               </TableCell>
               <TableCell  >
                 {row.area} <span>&#13217;</span>
               </TableCell>
               <TableCell  >
                 {!row.status?'Available':'Rented'}
               </TableCell>
               <TableCell>
                 <IconButton onClick={()=>onClickUpdate(row)}>
                   <EditIcon />
                 </IconButton>
                 <IconButton onClick={()=>onDeleteUser(row.id_room)}>
                   <DeleteIcon />
                 </IconButton>
               </TableCell>
             </TableRow>
           ))}
 
 
         </TableBody>
 
       </Table>
     </TableContainer>
    )
}

export default RoomHotel
