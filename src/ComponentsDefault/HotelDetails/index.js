import { Grid, Paper,TableHead,IconButton,Button} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import HotelService from '../../Service/HotelService';
import { Typography } from '@material-ui/core';
import StarRatings from 'react-star-ratings'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RoomService from '../../Service/RoomService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HotelIcon from '@material-ui/icons/Hotel';
import BookingDialog from './BookingDialog';

const useStyles = makeStyles((theme) => ({
  parent: {
      paddingTop: "63px"
  },
  root: {
    height: '90vh',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    height: "300px",
    width: '100%',
    margin: 0, padding: 0,
    
  },
  location: {
    color: 'blue',
    fontSize: '15px'
  },
  imgRoom :{
    alignItems:'center',
    height: "150px",
    width: '100%',
    margin: 0, padding: 0
  },
  back:{
    width:'100%',
    backgroundColor:'blue',
    fontSize:'15px',
    fontWeight:'600',
    color:'white',
    '& : hover':{
      backgroundColor:'orange'
    }

  },
  tableScroll:{
    height: '85vh',
    overflowY:'scroll',
    '&::-webkit-scrollbar': {
      display:'none'
    },
  },
  roomItem:{
      magrin:'20px 0'
  },
  dotStatus:{
    height:' 10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight:'5px'
  }

}))
const HotelDetails = ({user}) => {
  const classes = useStyles();
  const [hotel, setHotel] = useState({});
  const [lstRoom, setLstRoom] = useState([]);
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState({});
  const [checkIn, setCheckIn] = useState(new Date());
  const { id } = useParams();
  useEffect(() => {
    HotelService.getHotelById(id)
      .then((resp) => {
        setHotel(resp.data);
      })

    return () => {
      setHotel({});
    }

  }, [])

  useEffect(()=>{
    RoomService.getRoomByHotel(id)
    .then((resp)=>{
      setLstRoom(resp.data);
    })
    .catch(err=>{
      console.log(err);
    })
  },[id])
  const configBookingRoom={
        open,
        setOpen,
        room,
        setRoom,
        user
  }

  const onClickBooking= (row)=>{
        setRoom(row);
        setOpen(true);
  }

  return (
    <div className={classes.parent}>
      <BookingDialog {...configBookingRoom}/>
      <Button className={classes.back} component={Link} to='/search' >Trở về</Button>
      <Grid className={classes.root} container>
        <Grid item xs={5} md={5} component={Paper}  >
          <div className={classes.Paper}>
            <img  className={classes.img} src={`http://localhost:8080//${hotel.img}`} />
            <StarRatings
              starDimension="50px"
              starSpacing="2px"
              starRatedColor="yellow"
              rating={hotel.star_rate}
            /> <span style={{ fontSize: '18px', color: 'red', marginLeft: '10px' }} >{`Rating: ${hotel.star_rate}/5`}</span>
            <Typography style={{ fontWeight: '700' }} color="secondary" variant="h3" >
              {hotel.name}
            </Typography>
            <Typography className={classes.location}><LocationOnIcon color="primary" />{hotel.address}</Typography>
          </div>
        </Grid>
        <Grid item xs={7} md={7} component={Paper}  >
          <div className={classes.Paper}>
          <Typography variant="h5">Danh sách các phòng của khách sạn <HotelIcon color="primary"/></Typography>
          < TableContainer className={classes.tableScroll} component={Paper}>
            
            {lstRoom.map((row) => (
              <Table key={row.id_room} className={classes.table} aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <img className={classes.imgRoom} alt="roomtype_image" src={`http://localhost:8080//${row.img}`}/>
                  </TableRow>
                </TableHead >
                <TableBody>
                    <Table className={classes.roomItem}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Tên phòng</TableCell>
                          <TableCell>Loại phòng</TableCell>
                          <TableCell>Số giường</TableCell>
                          <TableCell>Diện tích</TableCell>
                          <TableCell>Giá (1 đêm)</TableCell>
                          <TableCell>Trạng thái</TableCell>
                          <TableCell style={{width:'80px'}}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      <TableRow >
                      <TableCell component="th" scope="row">
                        {row.room_name}
                      </TableCell>
                      <TableCell>
                        {row.type_name}
                      </TableCell>
                      <TableCell >
                        {row.bed} <IconButton disabled="true">
                          <SingleBedIcon color="secondary" />
                        </IconButton >
                      </TableCell>
                      <TableCell  >
                        {row.area} <span>&#13217;</span>
                      </TableCell>
                      <TableCell >
                        {row.price} $
                      </TableCell>
                      <TableCell  >
                        <span style={{backgroundColor:`${row.status?"red":"green"}`}} className={classes.dotStatus}/> {!row.status ? 'Available' : 'Rented'}
                      </TableCell>
                      <TableCell>
                        <IconButton className={classes.bookNow} disabled={row.status ? true : false} onClick={() => onClickBooking(row)}>
                          Đặt Phòng Ngay <EventAvailableIcon />
                        </IconButton> 
                      </TableCell>
                      
                    </TableRow>
                    
                      </TableBody>
                    
                    </Table>
                </TableBody>

              </Table>
                 ))}
            </TableContainer>
          </div>
        </Grid>
        
      </Grid>
    </div>
  )
}

export default HotelDetails
