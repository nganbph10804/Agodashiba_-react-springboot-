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
import HotelService from '../../Service/HotelService';
import AddHotel from './AddHotel';
import UpdateHotel from './UpdateHotel';


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
    
    
  });
  
  // Table Head
  const columns = [
    { id: 'hotel_name', label: 'Hotel Name' },
    { id: 'address', label: 'Address' },
    { id: 'star_rate', label: 'Star Rate' },
    { id: 'room_total', label: 'Room Total' },
 
    {
      id:'img'
      ,label: 'Image'
    }
    ,
    {
      id: 'action', label: 'Action', minWidth: ' 190px'
    }
  
  
  ];
const HotelManage = () => {
    const [lstHotel, setLstHotel] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [hotel, setHotel] = useState({});
    
    const onClickUpdate = (hotel) => {
      setOpenUpdate(true);
      setHotel(hotel);
     
    }
  
    const onDeleteUser = (id)=>{
      let conf = window.confirm('are you sure?');
      if(conf===true){
        HotelService.deleteHotel(id)
        .then((resp)=>{
          window.alert('success');
          setLstHotel(oldHotel=>{
              let newHotel= oldHotel.filter((hotel)=>{
                return hotel.id_hotels === id ? false : true;
              });
              return newHotel;
          });
        })
  
        .catch(err=>{
          if(err.message==="Request failed with status code 500"){
            window.alert('Can not Delete this Hotel');
          }
        })
      }
    }
    useEffect(() => {

        HotelService.getAllHotels().then((res) => {
          setLstHotel(res.data);
        })
          .catch(err => {
            console.log(err);
          })
          
    
      }, [])
      const addHotelConfig = {
        open,
        setOpen,
        setLstHotel,
        lstHotel
      }
      const configUpdateHotel = {
        openUpdate,
        setOpenUpdate,
        lstHotel,
        setLstHotel,
        hotel
      }

      

      
  const classes = useStyles2();
    return (
        <TableContainer className={classes.root} component={Paper}>
     
     <AddHotel className={classes.button} {...addHotelConfig} />
      <UpdateHotel {...configUpdateHotel} />
    
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

          {lstHotel.map((row) => (
            <TableRow key={row.id_hotels}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>
                {row.address}
              </TableCell>
              <TableCell >
                {row.star_rate}
              </TableCell>
              <TableCell >
                {row.room_total}
              </TableCell>
              <TableCell  >
                {row.phone}
              </TableCell>
              <TableCell  >
                {row.img}
              </TableCell>
              <TableCell>
                <IconButton onClick={()=>onClickUpdate(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={()=>onDeleteUser(row.id_hotels)}>
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

export default HotelManage
