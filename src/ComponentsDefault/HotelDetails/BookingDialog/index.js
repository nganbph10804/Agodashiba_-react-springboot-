import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List,
    ListItem, ListItemText, IconButton,Grid
} from '@material-ui/core';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import SingleBedIcon from '@material-ui/icons/SingleBed';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import BillService from '../../../Service/BillService';
import RoomService from '../../../Service/RoomService';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    listItem: {
        padding: theme.spacing(1, 0),
        fontSize: '20px'
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

const BookingDialog = ({ open, setOpen, room, setRoom,user }) => {


    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());


    const history= useHistory();
    const daysBetween = checkOut.getDate() - checkIn.getDate()

   
    const handleClose = () => {
        setOpen(false);
        setRoom({});
    }

    const onBookingOrder = ()=>{
        if(user&& Object.keys(user).length === 0 && user.constructor === Object){
            window.alert(`Bạn phải đăng nhập để đặt phòng!`);
            history.push(`/signin`);
            return;

        }
        if(daysBetween===0){
            window.alert(`Mời chọn lại ngày trả phòng!`);
            return;
        }
        let bill ={
            phone_user:user.phone,
            room_id: room.id_room,
            time_in:checkIn,
            time_out:checkOut,
            total_money:room.price * daysBetween
        }
        console.log(bill);
        BillService.createBill(bill)
        .then((resp)=>{

            window.alert(`Bạn đã đặt phòng thành công!`);
            setOpen(false);
            history.push(`/search`);
        })
        .then(
            RoomService.updateRoomRented(room.id_room)
            .then()
            .catch(err=>{
                console.log(err.message)
            })
        )
        .catch(err=>{
            console.log(err.message);
        })

    }
    const classes = useStyles();
    return (
        <div>
            <Dialog className={classes.root} fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Đặt phòng </DialogTitle>
                <DialogContent>
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Tên phòng:   {room.room_name}
                        </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Ngày nhận phòng"
                                    value={checkIn}
                                    onChange={(date)=>{setCheckIn(date)}}
                                    disablePast
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    variant="inline"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Ngày trả phòng"
                                    format="MM/dd/yyyy"
                                    value={checkOut}
                                    minDate={checkIn}
                                    onChange={(date)=>{setCheckOut(date)}}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                            </Grid>
                        </MuiPickersUtilsProvider>
                        <List disablePadding>

                            <ListItem className={classes.listItem} >
                                <ListItemText secondary='Loại Phòng' />
                                <Typography variant="body2">{room.type_name}</Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText secondary='Số giường' />
                                <Typography variant="body2">{room.bed}
                                    <IconButton disabled="true">
                                        <SingleBedIcon color="secondary" />
                                    </IconButton >
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                <ListItemText secondary='Diện tích' />
                                <Typography variant="body2">{room.area} <span>&#13217;</span></Typography>
                            </ListItem>
                            <ListItem className={classes.listItem} >
                                <ListItemText secondary={`Giá x ${daysBetween} đêm`} />
                                <Typography variant="body2">{room.price * daysBetween} $ </Typography>
                            </ListItem>

                            <ListItem className={classes.listItem}>
                                <ListItemText primary="TỔNG" />
                                <Typography variant="subtitle1" className={classes.total}>
                                    $ {room.price * daysBetween}
                                </Typography>
                            </ListItem>
                        </List>

                    </React.Fragment>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={onBookingOrder}>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BookingDialog
