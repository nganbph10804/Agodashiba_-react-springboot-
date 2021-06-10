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
import UserSservice from '../../Service/UserSservice';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

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
  
  
});

// Table Head
const columns = [
  { id: 'username', label: 'Username' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  {
    id: 'admin',
    label: 'Is Admin',
  },
  {
    id:'img'
    ,label: 'Image'
  }
  ,
  {
    id: 'action', label: 'Action', minWidth: ' 190px'
  }


];


const UserManage = () => {


  const [lstUser, setLstUser] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [user, setUser] = useState({});
  const onClickUpdate = (user) => {
    setOpenUpdate(true);
    setUser(user);
   
  }

  const onDeleteUser = (id)=>{
    let conf = window.confirm('are you sure?');
    if(conf===true){
      UserSservice.deleteUser(id)
      .then((resp)=>{
        window.alert('success');
        setLstUser(oldUser=>{
            let newUser= oldUser.filter((user)=>{
              return user.phone === id ? false : true;
            });
            return newUser;
        });
      })

      .catch(err=>{
        window.alert(err);
      })
    }
  }

  useEffect(() => {

    UserSservice.getUsers().then((res) => {
      setLstUser(res.data);
    })
      .catch(err => {
        console.log(err);
      })
  
      return ()=>{
        setLstUser([]);
      }

  }, [])

  const addUserConfig = {
    open,
    setOpen,
    setLstUser,
    lstUser
  }
  const configUpdateUser = {
    openUpdate,
    setOpenUpdate,
    lstUser,
    setLstUser,
    user
  }



  const classes = useStyles2();

  return (



    <TableContainer className={classes.root} component={Paper}>
     
      <AddUser className={classes.button} {...addUserConfig} />
      <UpdateUser {...configUpdateUser} />
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

          {lstUser.map((row) => (
            <TableRow key={row.phone}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell>
                {row.phone}
              </TableCell>
              <TableCell >
                {row.email}
              </TableCell>
              <TableCell >
                {row.isAdmin ? 'Yes' : 'No'}
              </TableCell>
              <TableCell  >
                {row.img?<img alt='userImage' style={{height:'80px',width:'200px'}} src={`http://localhost:8080//${row.img}`}/>:'null'}
              </TableCell>
              <TableCell>
                <IconButton onClick={()=>onClickUpdate(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={()=>onDeleteUser(row.phone)}>
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

export default UserManage
