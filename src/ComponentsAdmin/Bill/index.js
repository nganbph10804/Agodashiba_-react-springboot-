import { IconButton, TableHead } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import BillService from '../../Service/BillService';
import RoomService from '../../Service/RoomService';

// UseStyle
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
  action:{
    width: 200,
    fontSize:'10px'
  }
  
  
});

// Table Head
const columns = [
  { id: 'id', label: 'Bill ID' },
  { id: 'room_id', label: 'Room ID' },
  { id: 'phone', label: 'Customer Phone' },
  {
    id: 'checkin',
    label: 'CheckIn',
  },
  {
    id:'checkout'
    ,label: 'CheckOut'
  },
  {
    id:'total'
    ,label: 'Total Money'
  }
  ,
  {
    id: 'action', label: 'Action', minWidth: ' 190px'
  }


];


const BillManage = () => {


  const [lstBill, setLstBill] = useState([]);
 
  const onClickConfirm = (bill) => {
    let exist = lstBill.find((x) => x.id === bill.id);
    const conf= window.confirm(` Are you sure this bill was paid?`);
    if(conf===false){
        return;
    }
    BillService.confimBill(bill.bill_id)
    .then((resp)=>{
       
       setLstBill(oldLst=>{
           let newLst;
           newLst=oldLst.map((value)=>{
               return value.bill_id===bill.bill_id? {...exist,confirm:true} :value;
           })
           return newLst;
       })
    })
    .catch(err=>{console.log(err.message)})
   
  }
  const onClickRestore = (bill) => {

    const conf= window.confirm(` Are you want to restore this room?`);
    if(conf===false){
        return;
    }
    RoomService.updateRoomRestore(bill.room_id)
    .then((resp)=>{
        window.alert(`success!`)
    })
    .catch(err=>{console.log(err.message)})
   
  }



  useEffect(() => {

    BillService.getAllBill().then((res) => {
      setLstBill(res.data);
    })
      .catch(err => {
        console.log(err);
      })
  
      return ()=>{
        setLstBill([]);
      }

  }, [])

 


  const classes = useStyles2();

  return (



    <TableContainer className={classes.root} component={Paper}>
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

          {lstBill.map((row) => (
            <TableRow key={row.phone}>
              <TableCell component="th" scope="row">
                {row.bill_id}
              </TableCell>
              <TableCell>
                {row.room_id}
              </TableCell>
              <TableCell >
                {row.phone_user} 
              </TableCell>
              <TableCell >
                {row.time_in}
              </TableCell>
              <TableCell >
                {row.time_out}
              </TableCell>
              <TableCell  >
                {row.total_money} $
              </TableCell>
              <TableCell className={classes.action}>
                <IconButton disabled={row.confirm?true:false}  onClick={()=>onClickConfirm(row)}>
                {row.confirm?<span style={{fontSize:'15px'}}>confirmed</span>:<span style={{fontSize:'15px'}}>confirm</span>}
                </IconButton>
                <IconButton onClick={()=>onClickRestore(row)}> 
                <span style={{fontSize:'15px'}}>restore</span>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}


        </TableBody>

      </Table>
    </TableContainer>

  )
}

export default BillManage
